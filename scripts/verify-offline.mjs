import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import path from "node:path";

const html = process.argv[2] ?? "/opt/cursor/artifacts/index.html";
const outDir = process.argv[3] ?? "/opt/cursor/artifacts";
mkdirSync(outDir, { recursive: true });
const url = `file://${path.resolve(html)}`;

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

const external = [];
const page = await browser.newPage();
await page.setOfflineMode(true);
page.on("request", (request) => {
  const reqUrl = request.url();
  if (!reqUrl.startsWith("file:") && !reqUrl.startsWith("data:")) external.push(reqUrl);
});

await page.goto(url, { waitUntil: "load", timeout: 20000 });
await page.evaluate(() => document.fonts.ready);

async function audit(width, height) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await new Promise((resolve) => setTimeout(resolve, 150));
  return page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const img = document.querySelector(".hero-figure img");
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content");
    const font = h1 ? getComputedStyle(h1).fontFamily : "";
    const buzon = document.querySelector(".wordmark-buzon");
    const buzonFont = buzon ? getComputedStyle(buzon).fontFamily : "";
    const bodyFont = getComputedStyle(document.body).fontFamily;
    const brand = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim();
    const red = getComputedStyle(document.documentElement).getPropertyValue("--accent-red").trim();
    const surface = getComputedStyle(document.documentElement).getPropertyValue("--surface").trim();
    const text = document.body.innerText;
    return {
      robots,
      font,
      buzonFont,
      bodyFont,
      brand,
      red,
      surface,
      reviews: document.querySelectorAll(".postal").length,
      h1: h1?.innerText ?? "",
      heroNatural: img ? [img.naturalWidth, img.naturalHeight] : null,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      hasTel: !!document.querySelector('a[href^="tel:+541144333061"]'),
      hasMaps: !!document.querySelector('a[href*="google.com/maps"]'),
      hasWa: text.includes("wa.me") || !!document.querySelector('a[href*="wa.me"]'),
      hasNegative: /unrecognizable|Soy C/.test(text),
      hasScore: /3,3|3,4|4,0|1\.830|1830/.test(text),
      hasPostmark: text.includes("Caballito") && !!document.querySelector(".postmark"),
      hasConsultar: /consultar/i.test(text),
      hasStory: text.includes("banco de soldador"),
    };
  });
}

const report = {};
for (const [name, width, height] of [
  ["1440", 1440, 900],
  ["390", 390, 844],
]) {
  report[name] = await audit(width, height);
  await page.screenshot({ path: path.join(outDir, `fold-${name}.png`) });
  await page.screenshot({ path: path.join(outDir, `full-${name}.png`), fullPage: true });
}

console.log(JSON.stringify({ url, external, report }, null, 2));
await browser.close();
if (external.length) process.exitCode = 2;
