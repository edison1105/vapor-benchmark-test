import * as R from "ramda";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright"

// borrow from js-framework-benchmark
export async function computeResultsCPU(fileName) {
    const perfLogEvents = await fetchEventsFromPerformanceLog(fileName);
    let events = R.sortBy((e) => e.end)(perfLogEvents);

    // Find mousedown event. This is the start of the benchmark
    let mousedowns = R.filter(type_eq("mousedown"))(events);
    // Invariant: There must be exactly one click event
    if (mousedowns.length === 0) {
        console.log("no mousedown event", fileName);
    } else if (mousedowns.length == 1) {
        console.log("one mousedown event", fileName);
    } else if (mousedowns.length > 1) {
        console.log("more than one mousedown event", fileName, events);
        throw "at most one mousedown event is expected";
    }

    // Find click event. This is the start of the benchmark
    let clicks = R.filter(type_eq("click"))(events);
    // Invariant: There must be exactly one click event
    if (clicks.length !== 1) {
        console.log("exactly one click event is expected", fileName, events);
        throw "exactly one click event is expected";
    }
    let click = clicks[0];

    // check is delay from mousedown to click it unusually long
    if (mousedowns.length > 0) {
        let mousedownToClick = click.ts - mousedowns[0].ts;
        if (mousedownToClick > 0) {
            console.log("mousedownToClick", mousedownToClick, fileName);
        }
        if (mousedownToClick > 10000) {
            console.log("difference between mousedown and click is unusually long", mousedownToClick, fileName);
            // throw "difference between mousedown and click is unusually long";
        }
    }

    // The PID for the click event. We"re dropping all events from other processes.
    let pid = click.pid;
    let eventsDuringBenchmark = R.filter((e) => e.ts > click.end || e.type === "click")(events);

    let droppedNonMainProcessCommitEvents = false;
    let droppedNonMainProcessOtherEvents = false;

    let eventsOnMainThreadDuringBenchmark = R.filter((e) => e.pid === pid)(eventsDuringBenchmark);
    if (eventsOnMainThreadDuringBenchmark.length !== eventsDuringBenchmark.length) {
        let droppedEvents = R.filter((e) => e.pid !== pid)(events);
        if (R.any((e) => e.type === "commit")(droppedEvents)) {
            console.log("INFO: Dropping commit events from other processes", fileName);
            logEvents(droppedEvents, click);
            droppedNonMainProcessCommitEvents = true;
        }
        if (R.any((e) => e.type !== "commit")(droppedEvents)) {
            logEvents(droppedEvents, click);
            droppedNonMainProcessOtherEvents = true;
        }
    }

    let startFrom = R.filter(type_eq("click", "fireAnimationFrame", "timerFire", "layout", "functioncall"))(eventsOnMainThreadDuringBenchmark);
    // we're looking for the commit after this event
    let startFromEvent = startFrom.at(-1);
    let commit = R.find((e) => e.ts > startFromEvent.end)(R.filter(type_eq("commit"))(eventsOnMainThreadDuringBenchmark));
    let allCommitsAfterClick = R.filter(type_eq("commit"))(eventsOnMainThreadDuringBenchmark);

    let numberCommits = allCommitsAfterClick.length;
    if (!commit) {
        console.log("INFO: No commit event found according to filter", fileName);
        if (allCommitsAfterClick.length === 0) {
            console.log("ERROR: No commit event found for", fileName);
            throw "No commit event found for " + fileName;
        } else {
            commit = allCommitsAfterClick.at(-1);
        }
    }
    let maxDeltaBetweenCommits = (allCommitsAfterClick.at(-1).ts - allCommitsAfterClick[0].ts) / 1000.0;

    let duration = (commit.end - clicks[0].ts) / 1000.0;

    let layouts = R.filter(type_eq("layout"))(eventsOnMainThreadDuringBenchmark);

    // Adjust bogus delay for requestAnimationFrame
    let rafs_withinClick = R.filter((e) => e.ts >= click.ts && e.ts <= click.end)(
        R.filter(type_eq("requestAnimationFrame"))(events)
    );
    let fafs = R.filter((e) => e.ts >= click.ts && e.ts < commit.ts)(
        R.filter(type_eq("fireAnimationFrame"))(events)
    );

    let raf_long_delay = 0;
    if (rafs_withinClick.length > 0 && fafs.length > 0) {
        let waitDelay = (fafs[0].ts - click.end) / 1000.0;
        if (rafs_withinClick.length == 1 && fafs.length == 1) {
            if (waitDelay > 16) {
                let ignored = false;
                for (let e of layouts) {
                    if (e.ts < fafs[0].ts) {
                        console.log("IGNORING 1 raf, 1 faf, but layout before raf", waitDelay, fileName);
                        ignored = true;
                        break;
                    }
                }
                if (!ignored) {
                    raf_long_delay = waitDelay - 16;
                    duration = duration - raf_long_delay;
                    console.log("FOUND delay for 1 raf, 1 faf, but layout before raf", waitDelay, fileName);
                }
            } else {
                console.log("IGNORING delay < 16 msecs 1 raf, 1 faf", waitDelay, fileName);
            }
        } else if (fafs.length == 1) {
            throw (
                "Unexpected situation. Did not happen in the past. One fire animation frame, but non consistent request animation frames in " +
                fileName
            );
        } else {
            console.log(
                `IGNORING Bad case ${rafs_withinClick.length} raf, ${fafs.length} faf ${fileName}`
            );
        }
    }

    return {
        tsStart: click.ts,
        tsEnd: commit.end,
        duration,
        layouts: layouts.length,
        raf_long_delay,
        droppedNonMainProcessCommitEvents,
        droppedNonMainProcessOtherEvents,
        maxDeltaBetweenCommits,
        numberCommits,
    };
}

async function fetchEventsFromPerformanceLog(fileName) {
    let timingResults = [];
    let entries = [];
    do {
        let contents = await readFile(fileName, { encoding: "utf8" });
        let json = JSON.parse(contents);
        let entries = json["traceEvents"];
        const filteredEvents = extractRelevantEvents(entries);
        timingResults = timingResults.concat(filteredEvents);
    } while (entries.length > 0);
    return timingResults;
}


export function extractRelevantEvents(entries) {
    let filteredEvents = [];
    let click_start = 0;
    let click_end = 0;

    entries.forEach((x) => {
        let e = x;
        if (e.name === "EventDispatch") {
            if (e.args.data.type === "click") {
                click_start = +e.ts;
                click_end = +e.ts + e.dur;
                filteredEvents.push({ type: "click", ts: +e.ts, dur: +e.dur, end: +e.ts + e.dur, pid: e.pid, evt: JSON.stringify(e) });
            } else if (e.args.data.type === "mousedown") {
                filteredEvents.push({ type: "mousedown", ts: +e.ts, dur: +e.dur, end: +e.ts + e.dur, pid: e.pid, evt: JSON.stringify(e) });
            }
        } else if (e.name === "Layout" && e.ph === "X") {
            filteredEvents.push({ type: "layout", ts: +e.ts, dur: +e.dur, end: +e.ts + e.dur, pid: e.pid, evt: JSON.stringify(e) });
        } else if (e.name === "FunctionCall" && e.ph === "X") {
            filteredEvents.push({ type: "functioncall", ts: +e.ts, dur: +e.dur, end: +e.ts + e.dur, pid: e.pid, evt: JSON.stringify(e) });
        } else if (e.name === "HitTest" && e.ph === "X") {
            filteredEvents.push({ type: "hittest", ts: +e.ts, dur: +e.dur, end: +e.ts + e.dur, pid: e.pid, evt: JSON.stringify(e) });
        } else if (e.name === "Commit" && e.ph === "X") {
            filteredEvents.push({ type: "commit", ts: +e.ts, dur: +e.dur, end: +e.ts + e.dur, pid: e.pid, evt: JSON.stringify(e) });
        } else if (e.name === "Paint" && e.ph === "X") {
            filteredEvents.push({ type: "paint", ts: +e.ts, dur: +e.dur, end: +e.ts + e.dur, pid: e.pid, evt: JSON.stringify(e) });
        } else if (e.name === "FireAnimationFrame" && e.ph === "X") {
            filteredEvents.push({ type: "fireAnimationFrame", ts: +e.ts, dur: +e.dur, end: +e.ts + e.dur, pid: e.pid, evt: JSON.stringify(e) });
        } else if (e.name === "TimerFire" && e.ph === "X") {
            filteredEvents.push({ type: "timerFire", ts: +e.ts, dur: 0, end: +e.ts, pid: e.pid, evt: JSON.stringify(e) });
        } else if (e.name === "RequestAnimationFrame") {
            filteredEvents.push({ type: "requestAnimationFrame", ts: +e.ts, dur: 0, end: +e.ts, pid: e.pid, evt: JSON.stringify(e) });
        }
    });
    return filteredEvents;
}

function type_eq(...requiredTypes) {
    return (e) => requiredTypes.includes(e.type);
}


export async function checkElementContainsText(page, selector, expectedText) {
    let start = Date.now();
    let txt;
    for (let k = 0; k < 10; k++) {
        let elem = await page.$(selector);
        if (elem) {
            txt = await elem.innerText();
            if (txt === undefined) console.log("WARNING: checkElementContainsText was undefined");
            if (txt) {
                let result = txt.includes(expectedText);
                await elem.dispose();
                if (result) return;
            }
        }
        await page.waitForTimeout(k < 3 ? 10 : 1000);
    }
    console.log("checkElementExists waited " + (Date.now() - start) + " but no luck");
    throw `checkElementContainsText ${selector} failed. expected ${expectedText}, but was ${txt}`;
}

export async function forceGC(page) {
    await page.evaluate("window.gc({type:'major',execution:'sync',flavor:'last-resort'})");
}


export const wait = (delay = 1000) => {
    if (delay === 0) return Promise.resolve();
    else return new Promise((res) => setTimeout(res, delay));
};


export async function startBrowser(benchmarkOptions = {}) {
    let args = ["--window-size=1000,800", "--js-flags=--expose-gc", "--enable-benchmarking"];
    if (benchmarkOptions.headless) args.push("--headless=new");
    const browser = await chromium.launch({
        args,
        headless: false,
        // executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
    return browser;
}
