---
authors:
  - vominh
date: "2018-03-14T21:08:37+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*qJdSUlaNE43xxrTaXoYoMA.png
tags:
- nginx
- custom domain
- rewrite
title: Dùng goo.gl với custom domain
---

Goo.gl không cho phép sử dụng custom domain như bit.ly và gói free của bit.ly cũng chỉ cho tối đa 500 link mà thôi, nên nếu bạn muốn sử dụng custom domain để rút gọn url mà không muốn tự host thì hãy tiếp tục đọc nhé.

{{<zoom-img src="https://cdn-images-1.medium.com/max/1000/1*qJdSUlaNE43xxrTaXoYoMA.png">}}

Thực ra, chúng ta chỉ đơn giản là rewrite url mà thôi. Cái lợi so với self-host là dữ liệu ở trên các dịch vụ kia, bạn không bao giờ mất dữ liệu. Nhưng cái hại là ai cũng có thể thay thế goo.gl trong short domain của họ. Sẽ không có hại gì nếu bạn muốn phát triển mà bất chấp danh tiến, khi đó người khác cùng dùng nhiều thì bạn càn vui, nhưng vô cùng tai hại khi người khác dùng nó để trỏ về các trang phản động, khiêu dâm, và đôi khi domain của bạn sẽ bị dính cờ ‘spam’ hoặc bị block trên các mạng xã hội như facebook, …

## Thực hiện

Bạn chỉ cần một server đã cài đặt nginx hoặc apache. Bạn cũng có thể cài đặt https nếu muốn. Các bước như sau:

1. Trỏ domain về server
2. Tạo vhost
3. Cấu hình vhost

Bước 1) và 2) thì các bạn vui lòng tự tìm hiểu, nó còn tùy thuộc vào server của bạn. Đối với config thì như sau:

## Config Apache

Tạo file .htaccess tại thư mục của vhost:

```
RewriteEngine On
RewriteRule ^(.*)$ http://goo.gl/$1 [L,R=301]
```

## Config nginx

Sửa hoặc thêm file config của bạn như vầy:

```
server {
  server_name r.12bit.vn;
  rewrite ^ http://goo.gl$request_uri permanent;
}
```

Bạn có thể thay goo.gl thành bit.ly để sử dụng cho dịch vụ của bit.ly

##Lời kết

Như đã nói lúc đầu, việc này thú vị nhưng cũng có chút nguy hiểm. Thực ra thì cũng không khó để tự deploy một site rút gọn link, có nhiều opensource project cho bạn lựa chọn:

- [YOURLS](https://github.com/YOURLS/YOURLS)
- [Polr](https://github.com/cydrobolt/polr)
