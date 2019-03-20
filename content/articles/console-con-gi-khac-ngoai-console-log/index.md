---
title: "Console còn gì khác ngoài console.log()"
date: 2019-03-05T10:57:55+07:00
tags: [max, three, tags]
thumbnail: /articles/console-con-gi-khac-ngoai-console-log/thumbnail.png
authors:
  - vominh
draft: true
---

Lập trình javascript có lẽ không ai còn lạ gì console.log. Từ những bài helloWorld đầu tiên bạn đã được làm quen với nó như là những hàm print, log trong các ngôn ngữ khác.

Nhưng liệu console chỉ có mỗi phương thức log hay còn gì thú vị nữa không? Trong bài viết này chúng ta sẽ cùng tìm hiểu những phương thức khác của console và bạn sẽ thấy rằng nó cũng rất thú vị và manh mẽ, chứ không phải chỉ mỗi chức năng in text ra console.

## Console Object

Như bạn đã biết, console là object dùng để truy cập giao diện console của browser hoặc cli, được cung cấp bởi browser hoặc Nodejs.

Console có khá nhiều phương thức chứ không chỉ có mỗi phương thức log. Có thể liệt kê ra các phương thức sau đây:

1. Console.assert()
1. Console.clear()
1. Console.count()
1. Console.debug()
1. Console.dir()
1. Console.dirxml()
1. Console.error()
1. Console.exception()
1. Console.group()
1. Console.groupCollapsed()
1. Console.groupEnd()
1. Console.info()
1. Console.log()
1. Console.profile()
1. Console.profileEnd()
1. Console.table()
1. Console.time()
1. Console.timeEnd()
1. Console.timeStamp()
1. Console.trace()
1. Console.warn()

## Hiển thị biến ra console

Thao tác này quá quen thuộc rồi, đơn giản là hiển thị giá trị của một hoặc nhiều biến ra console, có thể là text, number, array, object, v.v..

Các phương thức được hỗ trợ là console.log, console.error, console.info, console.warning.

Cách sử dụng và chức năng của phương thức không khác nhau nhiều, chỉ là nội dung xuất ra console được style khác nhau, và được browser hỗ trợ filter.


