import { chromium } from "@playwright/test";

const targetUrl = process.env.PERF_URL || "http://127.0.0.1:3000";
const sections = [
  "values",
  "process",
  "projects-preview",
  "background",
  "references",
  "faq",
  "expertise",
  "contact",
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const run = async () => {
  const results = {};

  for (const viewport of viewports) {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport });

    await page.addInitScript(() => {
      window.__perf = { cls: 0, lcp: 0, lcpElement: null };

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__perf.lcp = entry.startTime;
            if (entry.element) {
              window.__perf.lcpElement = entry.element.tagName?.toLowerCase() || null;
            }
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch {}

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__perf.cls += entry.value;
            }
          }
        }).observe({ type: "layout-shift", buffered: true });
      } catch {}
    });

    await page.goto(targetUrl, { waitUntil: "networkidle" });
    try {
      await page.waitForSelector(".section.values", { timeout: 10000 });
    } catch {
      // If sections are missing, we'll report nulls below.
    }
    await page.waitForTimeout(2000);

    const metrics = await page.evaluate(() => window.__perf || {});
    const heights = await page.evaluate((sectionNames) => {
      const output = {};
      const missing = [];
      for (const name of sectionNames) {
        const el = document.querySelector(`.section.${name}`);
        if (!el) {
          output[name] = null;
          missing.push(name);
          continue;
        }
        const prevContentVisibility = el.style.contentVisibility;
        const prevIntrinsic = el.style.containIntrinsicSize;
        el.style.contentVisibility = "visible";
        el.style.containIntrinsicSize = "auto";

        const rect = el.getBoundingClientRect();
        output[name] = Math.round(rect.height);

        el.style.contentVisibility = prevContentVisibility;
        el.style.containIntrinsicSize = prevIntrinsic;
      }
      return { output, missing };
    }, sections);

    results[viewport.name] = {
      viewport,
      metrics,
      heights: heights.output,
      missing: heights.missing,
    };
    await browser.close();
  }

  console.log(JSON.stringify(results, null, 2));
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
