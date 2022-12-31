/*
https://pptr.dev/api/puppeteer.browser
*/
import puppeteer from "puppeteer";
/* puppeteer 為 PuppeteerNode 類型 */

const targetSite = 'https://www.sinyi.com.tw/';

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
const elHandle = await page.waitForSelector('.container.kycCardGridWeb .SmallInfoCardBody');

// const htmlStr = await page.$eval('.container.kycCardGridWeb .SmallInfoCardBody', (el)=>el.innerHTML);


// 從 ElementHandle 取得 Element 或 HTML
const html = await elHandle.evaluate(el=>el.outerHTML);

let data = await elHandle.evaluate(el=>{
  // 瀏覽器內的 scripts
  const imgUrl = el.querySelector('.largeImg img').src;
  const price =  el.querySelector('.SmallInfoCard_Type .SmallInfoCard_Type_Price').innerText;
  const name =  el.querySelector('.SmallInfoCard_Type .SmallInfoCard_Type_Name').innerText;
  const address =  el.querySelector('.SmallInfoCard_Type .SmallInfoCard_Type_Address').innerText;
  const info =  [...el.querySelectorAll('.SmallInfoCard_Type .SmallInfoCard_Type_HouseInfo span')].map(v=>v.innerText);
  return {imgUrl, price, name, address, info };
});

console.log(data)

browser.close();
/*
小圖
.container.kycCardGridWeb .SmallInfoCardBody .SmallInfoCard_Images .largeImg img

價格
.container.kycCardGridWeb .SmallInfoCardBody .SmallInfoCard_Type .SmallInfoCard_Type_Price

建物名稱
.container.kycCardGridWeb .SmallInfoCardBody .SmallInfoCard_Type .SmallInfoCard_Type_Name

地址
.container.kycCardGridWeb .SmallInfoCardBody .SmallInfoCard_Type .SmallInfoCard_Type_Address

*/