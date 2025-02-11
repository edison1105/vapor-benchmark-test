import {
    startBrowser,
    checkElementContainsText,
    forceGC,
    wait,
    computeResultsCPU,
    removeFile,
} from "./utils.js";

async function runCPUBenchmark(url, numWarmup, btnSelector, getExpectedFn, throttleCPU = 50) {
    const browser = await startBrowser();
    const page = await browser.newPage();

    let currentCount = 0;
    try {
        const client = await page.context().newCDPSession(page);
        await page.goto(url, { waitUntil: "networkidle" });
        await page.waitForSelector(btnSelector);

        for (let i = 0; i < numWarmup; i++) {
            currentCount++;
            const expectedContent = getExpectedFn(currentCount);
            await page.click(btnSelector);
            await checkElementContainsText(
                page,
                btnSelector,
                expectedContent.toString(),
            );
        }

        await forceGC(page);
        await client.send("Emulation.setCPUThrottlingRate", { rate: throttleCPU });
        const tracingFile = `./temp/tracing_${Date.now()}.json`;
        await browser.startTracing(page, {
            path: tracingFile,
            screenshots: false,
            categories: [
                "blink.user_timing",
                "devtools.timeline",
                "disabled-by-default-devtools.timeline",
            ],
        });

        await page.click(btnSelector);
        currentCount++;
        const expectedContent = getExpectedFn(currentCount);
        await checkElementContainsText(
            page,
            btnSelector,
            expectedContent.toString(),
        );

        await wait(40);
        await browser.stopTracing();
        const result = await computeResultsCPU(tracingFile);
        removeFile(tracingFile);
        return result.duration
    } catch (error) {
        throw error;
    } finally {
        await page.close();
        await browser.close();
    }
}

async function runMemBenchmark(url, numWarmup, btnSelector, getExpectedFn) {
    const browser = await startBrowser();
    const page = await browser.newPage();

    let currentCount = 0;
    try {
        await page.goto(url, { waitUntil: "networkidle" });
        await page.waitForSelector(btnSelector);

        const cdpSession = await page.context().newCDPSession(page);
        await cdpSession.send("Performance.enable");

        for (let i = 0; i < numWarmup; i++) {
            currentCount++;
            const expectedContent = getExpectedFn(currentCount);
            await page.click(btnSelector);
            await checkElementContainsText(
                page,
                btnSelector,
                expectedContent.toString(),
            );
        }

        await page.click(btnSelector);
        currentCount++;
        const expectedContent = getExpectedFn(currentCount);
        await checkElementContainsText(
            page,
            btnSelector,
            expectedContent.toString(),
        );
        await forceGC(page);
        await wait(40);

        // const performanceMetrics = await cdpSession.send('Performance.getMetrics');
        // const JSHeapSize = performanceMetrics.metrics.find(metric => metric.name === 'JSHeapUsedSize').value;
        const JSHeapSize = (
            await page.evaluate("performance.measureUserAgentSpecificMemory()")
        ).bytes;
        return JSHeapSize
    } catch (error) {
        throw error;
    } finally {
        await page.close();
        await browser.close();
    }
}

async function runTests(type) {
    const pages = [
        "http://localhost:3000/pages/apiCreateIf",
        "http://localhost:3000/pages/apiCreateIf-PR12629",
    ];

    const numWarmup = 7;
    const numTests = 20;
    const results = [];
    for (const url of pages) {
        let totalRenderTime = 0;
        let totalMemoryUsage = 0;

        const btnSelector = "button.state-button"
        const getExpectedFn = (i) => {
            return i
        }
        let count = numTests;
        if (type === 'cpu' || type === 'all') {
            // CPU benchmark
            for (let i = 0; i < numTests; i++) {
                try {
                    const renderDuration = await runCPUBenchmark(
                        url,
                        numWarmup,
                        btnSelector,
                        getExpectedFn
                    );
                    totalRenderTime += renderDuration;
                } catch (error) {
                    console.log(error)
                    count--;
                }
            }
        }
        const averageRenderTime = totalRenderTime / count;

        // memory benchmark
        if (type === 'mem' || type === 'all') {
            count = numTests;
            for (let i = 0; i < numTests; i++) {
                try {
                    const memoryUsage = await runMemBenchmark(
                        url,
                        numWarmup,
                        btnSelector,
                        getExpectedFn
                    );
                    totalMemoryUsage += memoryUsage;
                } catch (error) {
                    count--;
                }
            }
        }

        const averageMemoryUsage = totalMemoryUsage / count;
        results.push({
            url,
            averageRenderTime,
            averageMemoryUsage,
        });
    }

    console.log("测试结果:");
    console.table(
        results.map((result) => ({
            "页面 URL": result.url,
            "平均耗时 (ms)": result.averageRenderTime.toFixed(2),
            "平均内存占用 (MB)":
                result.averageMemoryUsage.toFixed(2) +
                " bytes, " +
                (result.averageMemoryUsage / 1024 / 1024).toFixed(2) +
                " MB",
        })),
    );
}

// runTests('cpu').catch(console.error);
//  runTests('mem').catch(console.error);
runTests('all').catch(console.error);
