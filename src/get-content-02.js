import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import puppeteer from "puppeteer";

const targetSite = "https://www.sinyi.com.tw/";

// 建立瀏覽器物件
const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: {
    width: 1920,
    height: 1080,
  },
});

// 開啟頁面視窗
const page = await browser.newPage();

// 連到某個網站或網頁
await page.goto(targetSite);

// 等待頁面內的選擇器出現在往下執行
const elHandle = await page.waitForSelector(
  ".container.kycCardGridWeb .SmallInfoCardBody"
);

// 取得圖片 URL
const imgUrl = await elHandle.evaluate(
  (el) => el.querySelector(".largeImg img").src
);
console.log({ imgUrl });

// 頁面跳到圖片 URL
const response = await page.goto(imgUrl);

// 取得原本的副檔名
const ext = imgUrl.toLowerCase().split(".").pop();
// 隨機檔名
const filename = uuidv4() + "." + ext;

// 存成檔案
await fs.writeFile(`downloads/${filename}`, await response.buffer());

browser.close();
