import { startBrowser, wait, getScriptingEntries, removeFile } from "./utils.js";

async function runBenchmark(url) {
  const browser = await startBrowser();
  const page = await browser.newPage();

  try {
    // const tracingFile = `./temp/tracing_${Date.now()}.json`;
    // await browser.startTracing(page, {
    //   path: tracingFile,
    //   screenshots: false,
    // });

    await page.goto(url, { waitUntil: "networkidle" });
    await wait(2000);

    // await browser.stopTracing();
    // const entries = await getScriptingEntries(tracingFile);
    // const scriptingTime = entries[1].tdur / 1000; // convert to ms
    // console.log("Scripting time:", scriptingTime);
    // removeFile(tracingFile)

    const measure = await page.evaluate(() => {
      return {
        scriptingTime:performance.getEntriesByName("vue-hydration-script-total")[0].duration,
        hydrationTime: performance.getEntriesByName("vue-hydration-total")[0].duration,
      };
    });

    console.log( measure);
    return measure

  } catch (error) {
    throw error;
  } finally {
    await page.close();
    await browser.close();
  }
}

async function runTests() {
  const pages = [
    "http://localhost:3000/pages/vdom-hydration",
    "http://localhost:3000/pages/vapor-hydration",
  ];

  const numTests = 10;
  const results = [];
  for (const url of pages) {
    let total = 0;
    let totalScripting = 0;
    let count = numTests;

    for (let i = 0; i < numTests; i++) {
      try {
        const { scriptingTime, hydrationTime } = await runBenchmark(url);
        total += hydrationTime;
        totalScripting += scriptingTime;
      } catch (error) {
        console.log(error);
        count--;
      }
    }
    const avgHydrationTime = total / count;
    const avgScriptingTime = totalScripting / count;

    results.push({
      url,
      avgHydrationTime,
      avgScriptingTime,
    });
  }

  console.log("Result:");
  console.table(
    results.map((result) => ({
      URL: result.url,
      "total (ms)": result.avgHydrationTime.toFixed(2),
      "scripting (ms)": result.avgScriptingTime.toFixed(2),
    }))
  );
}

runTests().catch(console.error);
