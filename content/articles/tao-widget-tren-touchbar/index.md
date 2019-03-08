---
title: Widget hiển thị số order trên Touchbar với BetterTouchTool
description: Hướng dẫn tạo widget hiển thị số lượng order từ shopfiy lên touchbar
date: 2019-03-08T14:13:39+07:00
tags:
  - touchbar
  - golang
  - shopify
images:
  - /img/articles/default-thumb-1200-630.png
author:
    name: vominh
    github: vominh
draft: false
---

Năm 2016 Apple giới thiệu Touchbar trên các dòng MacBook Pro giúp các bên thứ ba dễ dàn tích hợp các phím tắt hoặc chức năng nâng cao. Thực ra lúc mới sử dụng nó thì mình cảm thấy nó chả có ý nghĩa gì, vì ít có phần mềm nào tích hợp. Sau đó thì mình tìm ra phần mềm BetterTouchTool và khám phá ra nhiều việc có thể làm với touchbar, nhưng một thời gian thì nhân ra dù chức năng đã có nhưng vị trí của touchbar cũng không dễ sử dụng, phải với tay lên để bấm, nên dần dần vẫn không có thói quen sử dụng touchbar.

Tình cờ xem được repo [tomato](https://github.com/ng-vu/tomato) của bạn [Vũ](https://github.com/ng-vu) nên tìm hiểu thử cách mà bạn sử dụng. Mình không biết cách code cho touchbar một cách native. Cách mà bạn sử dụng ở đây là dựa vào các chức năng do BetterTouchTool hỗ trợ thôi.

BetterTouchTool hỗ trợ tạo ra các widget và hiển thị trên touchbar và cho phép điều khiển widget đó thông qua HTTP API. Bạn có thể đọc tại đây: [Integrated Webserver](https://docs.bettertouchtool.net/docs/webserver.html).

