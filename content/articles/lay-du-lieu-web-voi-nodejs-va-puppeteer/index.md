---
author:
  github: Thien Nguyen
  name: Thien Nguyen
date: "2019-03-04T10:33:00+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*NMSSehwvDCy6X9J-xXYH9g.png
tags:
- javascript
- nodejs
- puppeteer
- web scraping
title: Lấy dữ liệu web với Node.js và Puppeteer
---

Một trong những case study mà bạn có thể đối diện đó là lấy dữ liệu tin tức từ những website và lưu vào database của riêng mình dùng để làm những trang như tổng hợp link, tin tức.

Mọi thứ sẽ dễ dang nếu trang nguồn cung cấp API hoặc RSS. Còn với những trang không cung cấp thì sao? Lúc này chúng ta có thể sử dụng kỷ thuật gọi là web scraping.

Trong bài viết này, chúng ta sẽ sử dụng **Puppeteer** là một thư viện Node.js giúp chúng ta có thể chạy một [headless Chrome instance](https://en.wikipedia.org/wiki/Headless_browser).

Các bạn có thể tham khảo thư viện này trên Github.

{{<gh-repos "GoogleChrome/puppeteer">}}

Case study chúng ta là lấy những bài viết chất lượng :joy: từ 12bit.vn (trang này dã sử là không chịu cung cấp API / RSS).

Đầu tiên, chúng ta sẽ cài đặt Puppteer

```
npm install puppteer
```

Trong file `index.js` bạn require thư viện:

```js
const puppteer = require('puppteer');
```

{{< zoom-img src="images/inspect-element.png" >}}

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://12bit.vn')

  const results = await page.evaluate(() => {
    let items = document.querySelectorAll('.article__title a')
    let links = []
    items.forEach((item) => {
      links.push({
        title: item.innerText,
        url: item.getAttribute('href'),
      })
    })
    return links;
  });

  console.log(results)
  // Do what you want with the `results`

  await browser.close()
})()
```
