---
title: "Chụp hình web với Node.js và Puppeteer"
description: Cùng tìm hiểu về cách screenshort một trang web sử dụng Puppeteer
date: 2019-03-20T13:17:02+07:00
tags:
- screenshot
- puppeteer
- javascript
- nodejs
images:
  - /articles/chup-hinh-trang-web-voi-nodejs-va-puppeteer/thumbnail.png
authors:
  - tatthien
draft: false
---

12bit đã có một bài [giới thiệu về Puppeteer](/articles/lay-du-lieu-web-voi-nodejs-va-puppeteer/) ứng dụng vào việc scraping dữ liệu. Bài viết hôm nay, chúng ta cùng tìm hiểu một tính năng nữa của Puppeteer đó là **screenshot**. Đây là một tính răng rất thú vị và hữu ích, bạn có thể thỏa sức sáng tạo để mà dùng tính năng này.

## API
Trước khi đi vào ứng dụng, chúng ta cùng xem qua method `screenshot` có những options nào. Các bạn có thể truy cập [vào đây](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions) để xem danh sách các method mà Puppeteer cung cấp, mà cụ thể ở đây là `screenshot`

Cùng xem qua danh sách các options:

- `path`: Đường dẫn để lưu hình được tạo ra khi sreenshot.
- `type`: Định dạng hình ảnh `jpeg` hoặc `png`
- `quality`: Chất lượng ảnh từ `0-100`. Không áp dụng option này nếu `type` là `png`.
- `fullPage`: Nếu bạn set bằng `true` thì Puppeteer sẽ chụp toàn bộ trang web.
- `clip`: Không phải lúc nào bạn cũng cần chụp toàn bộ trang web. `clip` sẽ giúp bạn chụp một vùng trên trang web mà thôi.
- `omitBackground`: Trang web nào có background màu trắng sẽ bị loại bỏ thay vào đó là một transparency background.
- `encoding`: Định dạng mã hóa của hình, `base64` hoặc `binary`.

Giá trị trả về khi bạn gọi tới method `sreenshot` đó là một `Promise`. Khi **resolve** giá trị nhận được là string hoặc Buffer tùy vào việc bạn gán `encoding` là gì.

## 📷 Screenshot

### Chụp toàn bộ trang web
Sau khi đọc qua API, chúng ta sẽ thử chụp hình một trang web. Giả sử mình muốn chụp toàn bộ trang web https://thien.dev và lưu thành `screenshot.png`

*Việc cài đặt puppeteer vào khởi tạo browser bạn có thể xem qua ở [bài trước](/articles/lay-du-lieu-web-voi-nodejs-va-puppeteer/#lấy-dữ-liệu) nhé.*

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

{{< figure src="images/puppeteer-screenshot-1.gif" title="bấm vô hình để zoom nè.">}}

### Chụp một phần

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

### Encoding

Không phải lúc nào chúng ta cũng muốn lấy một file hình. Sẽ có lúc cần lấy kết quả trả về ở dạng base64. Việc này rất đơn giản, chỉ cần thay đổi option `encoding` thành `base64` như sau:

```js
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://thien.dev')
  const result = await page.screenshot({
    path: './sreenshot.png',
    type: 'png',
    clip: {
      x: 0, y: 0,
      width: 800, height: 400
    },
    encoding: 'base64'
  })

  console.log(result)

  await browser.close()
})()
```

Kêt quả:

```
iVBORw0KGgoAAAANSUhEUgAAAyAAAAGQCAYAAABWJQQ0AAAAAXNSR0IArs4c6QAAIABJREFUeJzs3Xd8VfX9x/H395x7k5CEEMIMYQcQEWUPV90o4AT3qnWPOlt3f21tra12WEe1FXdbxQkqirPgRkWWKCPsvUcSRpJ7zvf3xw03uSSBjJsTgq/n48GDc8/6fs64N...
```

Bạn có thể sử dụng data đó như một data URLs như sau:

```css
body {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAGQCAYAAABWJQQ0AAAAAXNSR0IAr...)
}
```

## Những vấn đề gặp phải

Trong quá trình làm việc với `screenshot` mình gặp phải một vài vấn đề có thể bạn cũng sẽ gặp.

### Error: Failed to launch chrome!

Việc khởi tạo một browser bằng puppeteer có thể sẽ phải thêm những options khác nhau trên những môi trường OS khác nhau. Nếu bạn gặp lỗi như trên hay thử thêm option vào `puppeteer.launch()`

```js
const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
```

### Screenshot với view port

Đôi khi bạn sẽ gặp phải những vấn đề về view port nếu screenshot với width lớn hơn 800px. Vì viewport mặt định puppeteer set là 800px x 600px. Lúc này bạn cần phải set lại view port bằng cách sử dụng [page.setViewport()](https://github.com/GoogleChrome/puppeteer/blob/v1.13.0/docs/api.md#pagesetviewportviewport)

```js
// ...
await page.goto('https://github.com')
await page.setViewport({ width: 1200, height: 630 })
const result = await page.screenshot({
  path: './sreenshot.png',
  type: 'png',
  clip: {
    x: 0, y: 0,
    width: 1200, height: 630
  }
})
// ...
```

Kết quả trước và sau khi set view port:

{{< zoom-img src="images/puppeteer-screenshot-4.png" >}}
{{< zoom-img src="images/puppeteer-screenshot-3.png" >}}

### Lỗi font

Có một trường hợp mình gặp phải đó là khi chụp hình thì bị lỗi font đối với những trang có sử dụng webfont. Nguyên nhân là do font chưa kịp load xong thì hình đã được chụp. Để xử lí vấn đề này `puppeteer` cung cấp option là `waitUntil `. Khi bạn gọi `page.goto('url', { waitUntil: 'some-value' })` có nghĩa việc "navigation" vào trang web sẽ đợi khi nào sự kiện ở `waitUntil` thực thi xong thì mới trả về kết quả thành công.

Bạn có thể xem qua phần docs của `page.goto()` [tại đây](https://pptr.dev/#?product=Puppeteer&version=v1.13.0&show=api-pagegotourl-options) để xem `waitUntil` có những sự kiện nào.

Trường hợp của mình sử dụng event là `networkidle0` tức là sẽ đợi tới khi không còn một connection (cụ thể là connection tới webfont) nào nữa trong khoảng thời gian là ít nhất `500` ms.

Mời bạn xem qua ví dụ trong library tụi mình mới viết [social-image-gen](https://github.com/12bitvn/social-image-gen)

{{< figure src="images/puppeteer-screenshot-5.gif" title="bấm vô hình để zoom nè.">}}

## Kết luận

Bạn có thể ứng dụng tính năng sreenshot vào nhiều ngữ cảnh cách khau. Đối với 12bit, tụi mình đã dùng tính năng này để tự động generate social image mỗi khi publish post (vì tụi mình quá lười để thiết kế một tấm hình đại diện cho bài viết :joy:). Các bạn có thể tham khảo tạo repo trên GitHub của 12bit.vn

{{<gh-repos "12bitvn/social-image-gen">}}
