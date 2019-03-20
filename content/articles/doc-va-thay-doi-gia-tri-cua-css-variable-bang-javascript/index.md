---
authors:
  - vominh
date: "2018-10-31T10:25:03+07:00"
description: Thay đổi giá trị CSS Variable bằng JavaScript
draft: false
images:
- https://cdn-images-1.medium.com/max/2000/1*Sgkp2XjaIpdrcWnU-WlWVw.png
tags:
- css variable
- javascript
title: Thay đổi giá trị CSS Variable bằng JavaScript
---

![](https://cdn-images-1.medium.com/max/2000/1*Sgkp2XjaIpdrcWnU-WlWVw.png)

CSS Variable có nhiều ứng dụng thú vị mà bạn có thể đã đọc qua như ứng dụng vào [xây dựng theme cho website]({{< ref "/articles/ung-dung-css-variables-de-xay-dung-dark-theme/index.md" >}}) mà Thiện đã chia sẽ trong bài viết.

Bài viết đó chỉ dừng lại ở việc cho phép người dùng thay đổi các theme đã có, làm thế nào nếu chúng ta muốn cho phép họ tự tạo theme của riêng họ bằng cách thay đổi giá trị của các màu sắc.

Trong JavaScript có nhiều API hỗ trợ thay đổi style của các element như sau:

```javascript
document.getElementById(id).style.property = new style
```

hoặc thông qua phương thức setProperty:

```javascript
document.getElementById(id).style.setProperty(name, value);
```

Ngày trước ta có thể generate file CSS từ server, nhưng trường hợp của til.12bit.vn thì không hữu ích, vì chúng ta dùng static site generator. Cách thay đổi style của từng element bằng hai hàm trên cũng không tiện lợi, phức tạp và chậm nữa. Vậy thì hãy ứng dụng CSS Variable xem có giúp ích được không nhé.

Hãy quay lại với ví dụ của Thiện:

{{< codepen tatthien LgMKpm >}}

Giờ thay vì thay đổi style của từng element, ta thay đổi giá trị của variable của root:

```javascript
var rootStyle = document.documentElement.style;
rootStyle.setProperty('--bg', "#fff");
rootStyle.setProperty('--color', "#222831");
```

Hãy xem demo nhé:

{{< codepen nguyenvanduocit WaqGJQ >}}

Để người dùng có thể tự chọn màu, chúng ta tạo một color picker, và thay đổi giá trị của— bg dựa trên color picker này:

```html
<input type="color" id="background-color-picker" name="color" value="#e66465" />
```

JavaScript:

```javascript
document.getElementById('background-color-picker').addEventListener("change",(event) => {
  rootStyle.setProperty('--bg', event.target.value);
  rootStyle.setProperty('--color', invertColor(event.target.value));
}, false);
```

Kết quả sẽ như sau:

{{< codepen nguyenvanduocit WaqGJQ >}}

Ở đây mình có dùng hàm invert để tạo mã màu đối xứng với màu mà người dùng chọn, mục đích chỉ là để demo thôi.
