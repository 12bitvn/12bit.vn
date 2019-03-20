---
authors:
  - vominh
date: "2018-11-12T00:34:12+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*10yZFqVvZ_l7GBlo8CD0mw.png
tags:
- javascript
- dark mode
title: Tự động switch dark mode dựa trên thiết lập hệ thống
---

![dark mode](https://cdn-images-1.medium.com/max/2000/1*10yZFqVvZ_l7GBlo8CD0mw.png)

Trong phiên bản Mojave, macOS đã hỗ trợ dark mode, khi chuyển sang dark mode, các app có hỗ trợ dark mode đều tự động thay đổi color trong app của mình để chuyển thành dark theme. Liệu chúng ta có thể làm như vậy với web hay không?

Trong mô tả của Media Queries Level 5 có mô tả về media future [‘prefers-color-scheme’](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme) như sau:

> The prefers-color-scheme media feature is used to detect if the user has requested the system use a light or dark color theme.

Mô tả này ở trạng thái drafts và hiện tại cũng chỉ được hỗ trợ bởi Safari Technology Preview 68 trở lên, cũng hợp lý thôi vì macOS và Safari đều là của Apple mà. Và bạn cũng cần phải cài đặt macOS Mojave để test.

Theo như mô tả thì media future này có 3 value là:

1. no-preference: áp dụng khi không biết hệ thống đang chọn mode nào, hoặc một giá trị nào đó khác light/dark
1. light: áp dụng khi hệ thống đang chạy light mode
1. dark: áp dụng khi hệ thống chạy dark mode

## Ví dụ

Bạn phải mở ví dụ này bằng Safari Technology Preview 68 trên macOS Mojave:

{{< codepen nguyenvanduocit gQLOoW  >}}

Bạn có thể xem video mình quay lại ví dụ này:

{{< youtube  >}}

Ta cũng có thể sửa lại ví dụ trong hai bài Thay đổi giá trị CSS Variable bằng JavaScript và Ứng dụng CSS variables để xây dựng tính năng dark theme thành như sau:

{{< codepen nguyenvanduocit mQOJda >}}

## Lời kết

Hiện tại bạn chưa thể sử dụng prefers-color-scheme được trên các site production, vì chưa phiên bản stable của trình duyệt nào hỗ trợ, nhưng đây có lẽ là một future hay.

## Tham khảo

1. [Dark Mode and CSS](https://blog.iconfactory.com/2018/10/dark-mode-and-css/)
1. [Using dark mode in CSS with MacOS Mojave](https://paulmillr.com/articles/using-dark-mode-in-css/)
