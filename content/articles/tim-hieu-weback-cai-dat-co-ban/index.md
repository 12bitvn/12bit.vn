---
title: "Tìm hiểu Webpack: Cài đặt cơ bản"
description: Series tìm hiểu Webpack là gì và hoạt động như thế nào.
date: 2019-04-06T21:16:42+07:00
tags:
  - webpack
series:
  - Tìm hiểu Webpack
images:
  - /articles/tim-hieu-weback-cai-dat-co-ban/thumbnail.png
authors:
  - tatthien
draft: false
---

## Giới thiệu

Có lẽ viết về [task runner]({{<ref "/references/task-runner-la-gi.md">}}) hay bundlers trong front-end development là điều không còn mới mẻ nữa. Mình viết series về webpack lần này sẽ không đề cập quá nhiều đến những khái niệm, nhưng tập trung vào việc cấu hình, giải quyết những tình huống thực tế.

Đây sẽ là những bài viết ngắn và đương nhiên không có tag TL;DR =))

## Cài đặt căn bản


```bash
mkdir webpack-demo
cd webpack demo
npm init -y
yarn add webpack -D
yarn add webpack-cli -D
```

tiếp theo chúng ta tạo file `index.html` và `src/index.js` với nội dung như bên dưới.

<div class="filename">src/index.js</div>

```js
import Vue from "vue";
new Vue({
  data: {
    msg: "12bit.vn"
  },
  render: function(h) {
    return h("h1", this.msg);
  }
}).$mount("#app");

```


<div class="filename">index.html</div>

```html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./dist/index.js"></script>
  </body>
</html>
```

Nếu bạn sử dụng `src/index.js` trong html thì chắc chắn sẽ không thấy kết quả gì cả vì trình duyệt không tương thích với dạng module như chúng ta viết bên trên. Chính vì vậy mới cần tới bundler để có thể compile.

Bây giờ chúng ta sẽ build thử bằng cách chạy command line sau:

```bash
./node_modules/.bin/webpack
# hoặc
npx webpack # yêu cầu node 8.2+ và npm 5.2.0+
```

Sau khi gõ lệnh bạn sẽ thấy output như sau:

```bash
npx webpack

...
Built at: 04/06/2019 9:38:49 PM
  Asset      Size  Chunks             Chunk Names
main.js  68.8 KiB       0  [emitted]  main
...
```

Mặc định file `main.js` sau khi build sẽ nằm trong thư mục `dist`. Chính vì vậy mà trong file html chúng ta trỏ tới `./dist/main.js`

{{% alert info %}}
Chúng ta có thể thay đổi output thông qua webpack.config.js mình sẽ đề cập tiếp tục ở bài sau
{{% /alert %}}

{{< figure src="images/webpack-1.png" title=":tada:">}}

## Kết luận

Vậy là chúng ta đã đi qua phần căn bản nhất, như vậy là đủ cho bài này rồi :joy:. Bài tiếp theo chúng ta sẽ cùng tìm hiểu về `webpack.config.js`, thêm scripts để build trong `package.json`.
