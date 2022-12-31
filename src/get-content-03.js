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
await page.waitForSelector(
  ".container.kycCardGridWeb .SmallInfoCardBody"
);

let data = [];
const elHandles = await page.$$(".container.kycCardGridWeb .SmallInfoCardBody");

for(let h of elHandles){
  const item = await h.evaluate(el=>{
    const imgUrl = el.querySelector('.largeImg img').src;
    const price =  el.querySelector('.SmallInfoCard_Type .SmallInfoCard_Type_Price').innerText;
    const name =  el.querySelector('.SmallInfoCard_Type .SmallInfoCard_Type_Name').innerText;
    const address =  el.querySelector('.SmallInfoCard_Type .SmallInfoCard_Type_Address').innerText;
    const info =  [...el.querySelectorAll('.SmallInfoCard_Type .SmallInfoCard_Type_HouseInfo span')].map(v=>v.innerText);
    return {imgUrl, price, name, address, info };
  })
  data.push(item);
}

for(let item of data){
  const response = await page.goto(item.imgUrl);
  const ext = item.imgUrl.toLowerCase().split('.').pop();
  const filename = uuidv4() + '.' + ext;
  item.img = filename;
  await fs.writeFile(`downloads/${filename}`, await response.buffer());
}

await fs.writeFile(`downloads/data.json`, JSON.stringify(data, null, 4));
console.log(data);

browser.close();
