---
title: "Thay đổi username trong WordPress"
description: A short description for the post.
date: 2018-03-06T07:11:08+07:00
tags: 
  - WordPress
  - security
images:
  - /articles/thay-doi-username-trong-wordress/images/0_aiYn-XoZmj1Y3CJu.jpeg
authors:
  - vominh
draft: false
---

Trong bài Tăng cường bảo mật cho site WordPress chúng ta có đề cập tới việc thay đổi username trong WordPress, bài này nhằm hướng dẫn rõ hơn về cách thực hiện.

Nhắc lại lý do nên thay đổi username, việc này cần thiết khi chúng ta vô tình đặt username cho tài khoản admin bằng các từ thông dụng như:

-   admin
-   administrator
-   quantri

Việc sử dụng các tên thông dụng này giúp cho hacker dễ tấn công chúng ta hơn. Giúp họ tiết kiệm thời gian đoán username.

Mặc định WordPress không hỗ trợ đổi username, Field username không cho phép edit. Tuy nhiên chúng ta vẫn có cách khác để đổi, dưới đây là các cách thay đổi mà bạn có thể sử dụng:

1.  Đổi username trực tiếp trong database.
2.  Sử dụng plugin đổi username.
3.  Xóa account cũ, tạo account mới.

Dưới đây là hướng dẫn cụ thể

## Đổi username trực tiếp trong database

Bạn cần phải truy cập vào database, có nhiều cách: Commandline, phpMyAdmin hoặc một client bất kỳ nào đó.

Ở đây mình sẽ sử dụng phpMyAdmin cho đơn giản.

{{< youtube YFWMFHCIrgc >}}

## Sử dụng plugin đổi username

Có nhiều plugin để thay đổi username, bạn có thể sử dụng các plugin có lượng cài đặt lớn và feedback tốt. Sau khi sử dụng xong nhớ delete nó đi cho an toàn.

Vì ở đây mình sử dụng iThemes Security nên mình dùng nó luôn cho tiện:

{{< youtube lf0E3EWyhu4 >}}

## Xóa account cũ, tạo account mới

Khi xóa account cũ, bạn không nên assign những post của account đó cho account administrator mới, làm như vậy thì việc thay đổi này trở nên vô ích, bạn nên tạo một account editor mới rồi assign post qua cho nó:

{{< youtube E0ffQx02QN0 >}}

## Lời kết

Việc bảo vệ này sẽ khiến hacker phải mất thêm thời gian để dò ra user name, đây là việc mất nhiều thời gian.

Tinh thần ở đây là không làm lộ ra username cho visitor biết. Nên mới có lưu ý là đừng dùng account administrator để đăng bài, vì hacker sẽ cố thử các username này trước tiên.
