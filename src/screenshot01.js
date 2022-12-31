import puppeteer, { Puppeteer } from "puppeteer";
console.log(process.argv);
console.log(import.meta.url);
const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: {
    width: 1920,
    height: 1080,
  },
});
const page = await browser.newPage();
// await page.setViewport({ width: 1920, height: 1080 });
// Full HD: 1920 × 1080
// HD: 1280 x 720

await page.goto("https://www.sinyi.com.tw/");

await page.screenshot({ path: "downloads/screenshot.png", fullPage: false });

browser.close();
