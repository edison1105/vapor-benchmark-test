import { startBrowser, checkElementContainsText, forceGC, wait, computeResultsCPU } from './utils.js'

async function performanceTest(url, numWarmup) {
    const browser = await startBrowser()
    const page = await browser.newPage();

    try {
        await page.goto(url, {
            waitUntil: "networkidle",
        });
        await page.waitForSelector('button#btn');

        for (let i = 0; i < numWarmup; i++) {
            const currentContent = await page.$eval('button#btn', el => el.textContent);
            const expectedContent = Number(currentContent) + 1;
            await page.click('button#btn');
            await checkElementContainsText(page, 'button#btn', expectedContent.toString());
        }

        await forceGC(page);
        let renderDuration = 0;
        let memoryUsage = 0
        const cdpSession = await page.context().newCDPSession(page);
        await cdpSession.send('Performance.enable');

        const tracingFile = `./temp/tracing.json`
        await browser.startTracing(page, {
            path: tracingFile,
            screenshots: false,
            categories: ["blink.user_timing", "devtools.timeline", "disabled-by-default-devtools.timeline"]
        });

        const currentContent = await page.$eval('button#btn', el => el.textContent);
        const expectedContent = Number(currentContent) + 1;
        await page.click('button#btn');
        await checkElementContainsText(page, 'button#btn', expectedContent.toString());
        await wait(40);
        await browser.stopTracing();
        let result = await computeResultsCPU(tracingFile);
        renderDuration += result.duration

        await forceGC(page);
        // const performanceMetrics = await cdpSession.send('Performance.getMetrics');
        // const JSHeapSize = performanceMetrics.metrics.find(metric => metric.name === 'JSHeapUsedSize').value;
        const JSHeapSize = ((await page.evaluate("performance.measureUserAgentSpecificMemory()"))).bytes
        memoryUsage += JSHeapSize;
        return {
            url,
            renderDuration,
            memoryUsage,
        };
    } catch (error) {
        throw error
    } finally {
        await page.close();
        await browser.close();
    }
}

async function runTests() {
    const pages = [
        'http://localhost:3000/pages/apiCreateIf',
        'http://localhost:3000/pages/apiCreateIf-PR12629'
    ];

    const numWarmup = 5;
    const numTests = 10;

    const results = [];
    let count = numTests
    for (const url of pages) {
        let totalRenderTime = 0
        let totalMemoryUsage = 0

        for (let i = 0; i < numTests; i++) {
            try {
                const { renderDuration, memoryUsage } = await performanceTest(url, numWarmup);
                totalRenderTime += renderDuration
                totalMemoryUsage += memoryUsage
            } catch (error) {
                count--
            }
        }

        const averageRenderTime = totalRenderTime / count;
        const averageMemoryUsage = totalMemoryUsage / count / 1024 / 1024;
        results.push({
            url,
            averageRenderTime,
            averageMemoryUsage
        })
    }


    console.log('测试结果对比:');
    console.table(results.map(result => ({
        '页面 URL': result.url,
        '平均渲染耗时 (ms)': result.averageRenderTime.toFixed(2),
        '平均内存占用 (MB)': result.averageMemoryUsage.toFixed(2)
    })));
}

runTests().catch(console.error);