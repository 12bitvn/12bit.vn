---
title: "Tìm hiểu Webpack: Cấu hình entry và output"
description: Series tìm hiểu Webpack là gì và hoạt động như thế nào.
date: 2019-04-10T08:49:16+07:00
tags:
  - webpack
  - front-end
  - javascript
series:
  - Tìm hiểu Webpack
images:
  - /articles/tim-hieu-webpack-cau-hinh-voi-webpack-config-js/thumbnail.png
authors:
  - tatthien
draft: false
---

Đây là phần thứ 2 trong series [tìm hiểu webpack](/series/tìm-hiểu-webpack/). Các bạn có thể xem lại bài thứ nhất [tại đây](/articles/tim-hieu-weback-cai-dat-co-ban/).

Nếu bạn để ý bài trước, chúng ta có thể chạy lệnh `npx webpack` mà không cần thêm bất kì config nào. Việc này được hỗ trợ trong webpack v4. Tuy nhiên, đối với những project cần những cấu hình phức tạp thì việc đưa nội dung cấu hình đó vào file config sẽ tiện lợn và tránh việc phải gõ quá nhiều câu lệnh.

Bài viết này chúng ta tìm hiểu về `entry` và `output`, hai thuộc tính này sẽ được khai báo trong file config, cụ thể là `webpack.config.js`

## Cài đặt

Bây giờ chúng ta sẽ tạo file `webpack.config.js` trong root directory của project như sau:

```bash
├── dist
│   └── main.js
├── index.html
├── package.json
├── src
│   └── index.js
├── webpack.config.js
```

<div class="filename">webpack.config.js</div>

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

{{% alert info %}}
Scope của bài này thì mình chỉ nói về entry và output. Những phần cấu hình khác sẽ đề cập tiếp tục ở các bài tiếp theo.
{{% /alert %}}

Sau khi đã có file config, các bạn gõ lệnh

```bash
npx webpack --config webpack.config.js
```

Việc truyền tham số `--config` đồng nghĩa bạn có thể đặt tên bất kì cho file config. Mặc định webpack sẽ tự nhận là `webpack.config.js`. Ví dụ:

```bash
npx webpack # file config: webpack.config.js
```

Bạn có thể đặt tên cho file config theo ý muốn. Chỉ cần cho webpack biết là bạn muốn dùng file config nào thông qua tham số `--config`

```bash
npx webpack --config webpack.dev.js
npx webpack --config webpack.prod.js
```

Để xem tính hiệu quả của file config, bạn hãy thay đổi `output.filename` như sau:

```js
output: {
  filename: 'main.[hash].js'
}
```

Lúc này, sau khi gõ lệnh `npx webpack` thì file output không phải là `main.js` nữa mà là `main.[chuỗi các ký tự].js`

```bash
├── dist
│   ├── main.281f1e1941357df0a46b.js # filename được định nghĩa trong webpack.config.js
│   └── main.js
```

{{% alert info %}}
Tips: việc dùng [hash] như trên được gọi là cache busting. Vì browser sẽ cache nội dung của static files như css, js dựa theo file path. Nếu mỗi lần build mà tên file không thay đổi, ví dụ luôn là style.css. Thì browser vẫn sẽ lấy nội dung có trong cache dựa theo tên cũ. Vì vậy, việc dùng hash hoặc versioning sẽ giúp browser update lại nội dung của static files.
{{% /alert %}}

{{% alert info %}}
Một điểm thú vị là nếu bạn không thay đổi nội dung trong file css hoặc js thì hash vẫn sẽ không thay đổi qua mỗi lần build.
{{% /alert %}}

## Thuộc tính

Có rất nhiều thuộc tính trong file config như `entry`, `output`, `loaders`, `plugins`,... Trong bài này mình sẽ nói về 2 thuộc tính căn bản là `entry` và `output`.

### entry

Entry points cho webpack biết cần file build từ đâu. Bạn chỉ cần cung cấp entry points và webpack sẽ xác định và build những dependency nào đang được sử dụng. Bạn có thể định nghĩa **một entry point (single entry syntax)** như ví dụ hoặc **nhiều entry point (object syntax)**. Ví dụ:


```js
// single entry syntax
module.exports = {
  entry: './path/to/entry/file.js'
}

// object syntax
module.exports = {
  entry: {
    main: './path/to/entry/main.js',
    page: './path/to/entry/page.js',
    admin: './path/to/entry/admin.js',
  }
}
```

_Các bạn có thể xem thêm cấu hình cho entry [tại đây](https://webpack.js.org/configuration/entry-context)_

### output

Output cũng rất dễ hiểu, nó sẽ chỉ cho webpack biết cần phải lưu file sau khi được compile ra đâu. Mặc dù có thể truyền nhiều entry points, nhưng output chỉ cho phép bạn truyền vào duy nhất một `filename`

```js
module.exports = {
  output: {
    filename: 'main.js',
  }
}
```

Mặc định file `main.js` sẽ nằm trong thư mục `dist`. Nếu bạn muốn output ra một thư mục khác hãy định nghĩa đường dẫn tới thư mục thông qua `path`

```js
module.exports = {
  output: {
    filename: 'main.js',
    path: __dirname + '/build'
  }
}
```

Tuy nhiên không phải lúc nào chúng ta cũng chỉ có một single entry, trường hợp bạn có nhiều single và muốn build ra nhiều output thì có thể áp dụng cách đặt tên dạng placeholder `[name]` như sau:

```js
module.exports = {
  entry: {
    main: './src/index.js',
    page: './src/page.js',
    admin: './src/admin.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

Kết quả là:

```bash
├── dist
│   ├── admin.js
    # mặc dù là index.js nhưng do trong entry nó là `main: index.js`
│   ├── main.js
│   └── page.js
├── index.html
├── package.json
├── src
│   ├── admin.js
│   ├── index.js
│   └── page.js
```

_Các bạn có thể xem thêm cấu hình cho output [tại đây](https://webpack.js.org/configuration/output)_
