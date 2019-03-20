---
title: "Chụp hình web với Node.js và Puppeteer"
description: A short description for the post.
date: 2019-03-20T13:17:02+07:00
tags:
- javascript
- nodejs
- puppeteer
- web screenshot
images:
  - /img/articles/default-thumb-1200-630.png
author:
    name: Thien Nguyen
    github: tatthien
draft: false
---

12bit đã có một bài [giới thiệu về Puppeteer](/articles/lay-du-lieu-web-voi-nodejs-va-puppeteer/). Với ứng dụng vào việc scraping dữ liệu. Bài viết hôm nay, chúng ta cùng tìm hiểu một tính năng nữa của Puppeteer đó là screenshot. Theo mình đây là một tính răng rất thú vị và hữu ích.

## API
Trước khi đi vào ứng dụng, chúng ta cùng xem qua API của `screenshot` có những options nào. Các bạn có thể truy cập [vào đây](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions) để xem danh sách các API mà Puppeteer cung cấp, mà cụ thể ở đây là `screenshot`

Cùng xem qua danh sách các options:

- `path`: Đường dẫn để lưu hình được tạo ra khi sreenshot.
- `type`: Định dạng hình ảnh `jpeg` hoặc `png`
- `quality`: Chất lượng ảnh từ `0-100`. Không áp dụng option này nếu `type` là `png`.
- `fullPage`: Nếu bạn set bằng `true` thì Puppeteer sẽ chụp toàn bộ trang web.
- `clip`: Không phải lúc nào bạn cũng cần chụp toàn bộ trang web. `clip` sẽ giúp bạn chụp một vùng trên trang web mà thôi.
- `omitBackground`: Trang web nào có background màu trắng sẽ bị loại bỏ thay vào đó là một transparency background.
- `encoding`: Định dạng mã hóa của hình, `base64` hoặc `binary`.

Giá trị trả về khi bạn gọi tới method `sreenshot` đó là một `Promise`. Giá trị trả về khi resolve là string hoặc Buffer tùy vào việc bạn gán  `encoding` là gì.

## 📷 Screenshot

Sau khi đọc qua API, chúng ta sẽ thử chụp hình một trang web. Giả sử mình muốn chụp toàn bộ trang web https://thien.dev và lưu thành `screenshot.png`

*Việc cài đặt puppeteer vào khởi tạo browser bạn có thể xem qua ở bài trước nhé.*

```js
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://thien.dev')
  await page.screenshot({
    path: './screenshot.png',
    type: 'png',
    fullPage: true
  })
  await browser.close()
})()
```

Kết quả là:

{{< zoom-img src="images/puppeteer-screenshot-1.gif" >}}

Tiếp theo, thay vì chụp toàn bộ trang web, chúng ta sẽ thử chụp một phần trang web với kích thước 800x400px.

```js
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://thien.dev')
  await page.screenshot({
    path: './sreenshot.png',
    type: 'png',
    clip: {
      x: 0, y: 0,
      width: 800, height: 400
    }
  })
  await browser.close()
})()
```

Kết quả sẽ là một bức hình với kích thước 800x400px

{{< zoom-img src="images/puppeteer-screenshot-2.png" >}}

## Những vấn đề gặp phải

Phần này chúng ta sẽ nâng cao hơn một chút và giải quyết một vài vấn đề gặp phải khi screenshot một trang web.

## Kết luận

Bạn có thể ứng dụng tính năng sreenshot vào nhiều ngữ cảnh cách khau. Đối với 12bit, tụi mình đã dùng tính năng này để auto generate social image mỗi khi publish post (vì tụi mình quá lười để thiết kế một tấm hình đại diện cho bài viết :D). Cá bạn có thể tham khảo tạo repo trên GitHub của 12bit.vn

{{<gh-repos "12bitvn/social-image-gen">}}
