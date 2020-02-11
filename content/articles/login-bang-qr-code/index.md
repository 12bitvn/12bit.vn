---
authors:
  - tuean
date: "2020-02-10T17:28:55+07:00"
draft: false
tags:
- javascript
- golang
- authentication
title: Login bằng QR code
---

Trong trường hợp mà việc login trên điện thoại phức tạp, ví dụ như phải thông qua website của bên thứ ba hoặc trải qua nhiều bước nhưng lại có thể được xác thực bởi một phiên login trước đó ví dụ như phiên login trên website thì chúng ta có thể sử dụng giải pháp login bằng QR code giống như Viber và Zalo sử dụng. Cách mà chúng ta sẽ trình bày này chỉ là một cách đơn giản, có thể sẽ không giống với cách mà Viber và Zalo hiện thực.

## Sequence diagram

Dưới đây là mô tả bằng sequence diagram:

![](/articles/login-bang-qr-code/assets/sequence.webp)

Ở đây chúng ta bỏ qua bước xác thực các request từ web lên server vì chúng ta muốn tập trung vào chức năng login bằng QR Code thôi, còn việc xác thực các request từ web thì vốn đã có sẵn trong hệ thống, và là trách nhiệm của API gateway.

## Generate login code

![](/articles/login-bang-qr-code/assets/generateLoginCode.webp)

Việc generate này khá đơn giản thôi, mục đích là tạo ra code với tính chất:

* Unique
* Có thời gian khả dụng nhất định

Mình sẽ sử dụng hashids bởi vì:

* Mã ngắn
* Unique: match giữa userId + random number + salt

## Kiểm tra login code

![](/articles/login-bang-qr-code/assets/exchangeLoginCode.webp)

Để bảo mật thêm chút nữa thì chúng ta có thể yêu cầu người dùng trên web bấm xác nhận một lần nữa trên web, giống như Zalo.

![](/articles/login-bang-qr-code/assets/exchangeLoginCodeWithConfirmation.webp)

## Real-time notification

Để web có thể nhận được notification từ server chúng ta có thể sử dụng web socket. Khi người dùng lấy được loginCode thành công thì chúng ta sẽ tạo một kết nối bằng websocket giữa server và web. Khi người dùng sử dụng điện thoại để quét mã và điện thoại gửi loginCode này lên server, nếu loginCode hợp lệ thì ta sẽ tạo kết nối websocket giưa điện thoại và server đồng thời gửi notification tới web yêu cầu xác nhận. Rồi tuỳ theo trả lời của web mà trả lời lại cho điện thoại thông qua websocket.
