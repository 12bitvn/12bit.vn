---
authors:
  - tatthien
date: "2018-10-26T17:42:49+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*GDjDLQf4hWQ2q5ZQpycLIQ.jpeg
tags:
- css
title: Ứng dụng CSS variables để xây dựng tính năng dark theme
---

Mấy ngày trước mình có xây dựng tính năng dark theme cho trang [TIL của 12bit](https://til.12bit.vn/). Ban đầu hướng tiếp cận của mình khá là truyền thống đó là thay đổi class cho body để override lại CSS theo từng theme kiểu như:

```css
body.dark {
  background-color: #222831;
}
```

Tuy nhiên, mình đã phát hiện ra cách dùng CSS variables thay cho việv override đó rất hay. Bạn có thể dịnh nghĩa các variable trong body và các phần tử bên trong body có thể kế thừa các variable đó.

Mình có cấu trúc HTML đơn giản như sau:

```html
<body class="dark">
  <h1>Hello World</h1>
</body>
```

Trong file CSS bạn có thể định nghĩa:

```css
:root {
  --bg: #fff;
  --color: #222831;
  ...
}
.dark {
  --bg: #222831;
  --color: #fff;
  ...
}
body {
  background-color: var(--bg);
}
h1 {
  color: var(--color);
}
```

Việc còn lại cần làm là bạn dùng JavaScript để thay đổi class cho body mỗi khi người dùng chọn theme.

Demo

{{<codepen tatthien LgMKpm>}}

{{% caniuse features="css-variables" %}}
