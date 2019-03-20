---
authors:
  - tatthien
date: "2018-03-09T14:09:42+07:00"
description: polygon định nghĩa một hình đóng (closed shape) bao gồm những đoạn thẳng.
  Điểm cuối sẽ kết nối với điểm đầu.
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*3WMyVChdsdfgp9YmfE104A.jpeg
tags:
- polygon
- svg
- html
title: Tìm hiểu <polygon> trong SVG
---

Bài viết này chúng ta cùng tìm hiểu thẻ `<polygon>` trong SVG. Thật ra bài này cũng rất ngẫu nhiên. Mình chợt nghĩ tới polygon, nên viết một vài điều ra đây. 😂

{{% alert info %}}
**polygon** định nghĩa một hình đóng (closed shape) bao gồm những đoạn thẳng. Điểm cuối sẽ kết nối với điểm đầu. — MDN
{{% /alert %}}

## Thuộc tính
### Thuộc tính toàn cục

- [Conditional processing attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute#Conditional_processing_attributes)
- [Core attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute#Core_attributes)
- [Graphical event attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute#Graphical_event_attributes)
- [Presentation attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute#Presentation_attributes)
- class
- style
- externalResourcesRequired
- transform

### Thuộc tính riêng

- points

## Ví dụ

Chúng ta cùng xem `<polygon>` hoạt động như thế nào. Bên dưới là đoạn snippet để tạo ra một hình lục giác.

```html
<svg width="400" height="400" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">
  <polygon points="60,20 100,40 100,80 60,100 20,80 20,40"/>
</svg>
```

{{< codepen tatthien xWxjyK >}}

Cách vẽ hình này cũng rất đơn giản, bạn cần phải khai báo tọa độ của 6 điểm gồm có `x,y` trong thuộc tính `points`.

Mỗi điểm sẽ có `x,y` và phân cách với nhau bằng một khoảng trắng:

```html
<polygon points="p1(x1, y1) p2 p3 p4 p5...">
```

Mời các bạn xem qua hình giải thích:

{{< codepen tatthien wmvjoJ >}}

Rất đơn giản phải không nào!

Vẽ hình với `<polygon>` không nhất thiết phải là 6 điểm, chỉ cần lớn hơn 2 điểm là được. Bây giờ hãy thử tạo một hình tam giác, cấu tạo hình tam giác gồm 3 điểm được kết nối với nhau.

Vì vậy trong thuộc tính `points` bạn cần khai báo tạo độ của 3 điểm là có thể tạo thành một hình tam giác.

```html
<svg width="400" height="400" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">
  <polygon points="60,20 100,100 20,100"/>
</svg>
```

Hình tam giác mình mới khai báo có 3 điểm `{x:60, y:20} {x:100, y:100} {x:20,y:100}`

{{< codepen tatthien LdYmXV >}}

Như vậy việc sử dụng `<polygon>` rất đơn giản đúng không nào. Bạn có thể thêm border, màu nên .v.v.. dựa vào các thuộc tính global được đề cập ở trên. Để kết thúc bài viết mình có một ví dụ nhỏ áp dụng `<polygon>`.

{{< codepen tatthien aYbGMo >}}
