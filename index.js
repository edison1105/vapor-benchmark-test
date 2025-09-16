import { startBrowser, wait } from "./utils.js";

async function runBenchmark(url) {
  const browser = await startBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle" });
    await wait(2000);

    const hydrationMeasures = await page.evaluate(() => {
      return performance
        .getEntriesByName("vue-hydration-total")
        .map((entry) => ({
          name: entry.name,
          duration: entry.duration,
        }));
    });

    // console.log(hydrationMeasures);

    return hydrationMeasures[0].duration;
  } catch (error) {
    throw error;
  } finally {
    await page.close();
    await browser.close();
  }
}

async function runTests() {
  const pages = [
    "http://localhost:3000/pages/vapor-hydration",
    "http://localhost:3000/pages/vdom-hydration",
  ];

  const numTests = 10;
  const results = [];
  for (const url of pages) {
    let totalRenderTime = 0;
    let count = numTests;

    for (let i = 0; i < numTests; i++) {
      try {
        const duration = await runBenchmark(url);
        totalRenderTime += duration;
      } catch (error) {
        console.log(error);
        count--;
      }
    }
    const averageRenderTime = totalRenderTime / count;

    results.push({
      url,
      averageRenderTime,
    });
  }

  console.log("测试结果:");
  console.table(
    results.map((result) => ({
      "页面 URL": result.url,
      "耗时 (ms)": result.averageRenderTime.toFixed(2),
    }))
  );
}

runTests().catch(console.error);
