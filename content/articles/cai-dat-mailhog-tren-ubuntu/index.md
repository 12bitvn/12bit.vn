---
title: Cài đặt MailHog trên Ubuntu
description: Cài đặt MailHog trên Ubuntu
authors:
  - tatthien
date: "2021-10-01T11:35:13+07:00"
draft: false
tags:
- mail
- smtp
- mail-catcher
- testing
---

Mình đang dùng [Mailtrap](https://mailtrap.io) để test mail. Nhưng ngặt một nỗi sài free nên chỉ tạo được 1 inbox và bị giới hạn 500 email/tháng. Bình thường ít traffic thì không sao, nhưng tới khi cần test mail nhiều thì bị giới hạn, phải đợi tháng sau hoặc tạo tài khoản mới.

Hôm nay gặp phải vấn đề này, mình chợt nhớ tới [MailHog](https://github.com/mailhog/MailHog). Một open source project cho email testing. Tính năng cũng tương tự Mailtrap.

{{<gh-repos "mailhog/MailHog">}}

Có nhiều cách để cài MailHog. Bạn có thể cài local để test mail cho dự án của mình thông qua `brew`, `docker` hoặc build `MailHog` cli từ go. Vì mình muốn share cho team cùng sài vì vậy đã quyết định cài trên một con server Ubuntu  version 20.04.

## Cài đặt go

Mình quyết định sẽ cài đặt MailHog bằng `go` nên mình sẽ cài `go` trên server.

```shell
$ sudo apt-get -y install golang-go
```
Kiểm tra `go` đã cài thành công chưa?

```shell
$ go version
go version go1.17.1 linux/amd64
```

## Cài đặt MailHog cli

Sau khi cài `go`, chúng ta sẽ cài `MailHog` như sau:

```shell
$ go get github.com/mailhog/MailHog
```

Sau khi chạy xong, bạn sẽ thấy có một file binary là `MailHog` trong `$HOME/go/bin`

```shell
$ ls $HOME/go/bin
MailHog
```

Để chạy được `MailHog` bạn cần chắc chắn rằng `$HOME/go/bin` đã được thêm vào `PATH`. Nếu chưa có bạn có thể thêm như sau:

```shell
$ export PATH=$PATH:$HOME/go/bin
$ MailHog -h
Usage of MailHog:
  -api-bind-addr string
...
```

## Cấu hình MailHog

Bây giờ chúng ta sẽ start `MailHog`, các bạn có thể xem qua danh sách `options` hoặc `environtment variables` mà MailHog sử dụng [tại đây](https://github.com/mailhog/MailHog/blob/master/docs/CONFIG.md).

Bài viết này mình sẽ đề cập tới 2 config đó là nơi [lưu trữ mail](#lưu-trữ) và [HTTP auth](#http-auth) để hạn chế người ngoài truy cập vào web UI.

Dưới đây là command mình đã dùng. Mình sẽ giải thích chi tiết từng flag ở phần bên dưới.

```shell
$ MailHog \
    -storage=maildir \
    -maildir-path=/home/thien/.config/mailhog/storage/ \
    -auth-file=/home/thien/.config/mailhog/auth
```

> Nếu muốn chạy deamon, bạn có thể sử dụng `nohup` đặt ở đầu command.

Sau khi chạy command line trên xong, ta có:

- SMTP server chạy trên port `1025`
- HTTP server chạy trên port `8025`

Tất cả đều là port default của MailHog, bạn có thể thay đổi thông qua cli option.

{{% alert info %}}
Nếu không thể connect được tới 2 port này, bạn nhớ check Firewall trên server. Thông thường 2 port này chưa được thêm vào. Vì vậy bạn cần thêm vào danh sách port cho phép.
{{% /alert %}}

HTTP server cho phép bạn chạy web UI để xem email. Cách truy cập như sau:

```shell
your_server_ip:8025
```

Hoặc config [NGINX reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) để không phải gõ IP dài dòng nữa.

{{% alert info %}}
Xem thêm [Cài đặt Nginx trên Ubuntu](/references/cai-dat-nginx)
{{% /alert %}}

{{<zoom-img src="img/figure-1.png">}}

Ngoài ra chúng ta còn có một SMTP server để các ứng dụng khác có thể gởi mail tới MailHog thông qua SMTP. Chúng ta sẽ tìm hiểu ở phần [Testing](#testing).

### Lưu trữ

`MailHog` cho phép bạn chọn 1 trong 3 loại storage (được cấu hình thông qua `-storage`) đó là:
- `memory` -> default
- `mongodb`
- `maildir` -> mình chọn option này.

`maildir` có nghĩa chúng ta sẽ lưu trữ email trên disk. Vì vậy, cần phải cung cấp đường dẫn tới nơi lưu trữ email thông qua `-maildir-path`. Như bạn có thể thấy, mình đã lưu trữ email trên

```shell
$HOME/.config/mailhog/storage
```
Xem thử sau khi gởi email thì nó sẽ được lưu trữ thế nào

```shell
$ ls -la ~/.config/mailhog/storage/
'1X02KI7tIk3RHKrI4iM9BB52d9uLp6xXqzAiQORj0ZU=@mailhog.example'
'26vlyTBhSdZch2oIRBt4wsXQmXZ8d-wOgMfzPrwvGS4=@mailhog.example'
```
_Mỗi dòng tương ứng với 1 email_

### HTTP auth

Việc chặn những người ngoài truy cập vào HTTP server để xem email cũng khá cần thiết. Trong trường hợp bạn sợ bị lộ thông tin development trong email test. Hoặc đơn giản là không muốn ai xem email của mình trừ bạn và những người được chia sẻ HTTP auth credential.

Để cài đặt HTTP auth, chúng ta có thể [cấu hình trong NGINX](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/).

Tuy nhiên, MailHog đã support rất chu đáo khi hỗ trợ luôn việc cấu hình HTTP auth. Bạn có thể xem hướng dẫn chi tiết [tại đây](https://github.com/mailhog/MailHog/blob/master/docs/Auth.md).

Mình xin tóm tắt lại các bước như sau:

Sử dụng `bcrypt` để tạo mật khẩu.

```
$ MailHog bcrypt <password>
$2a$04$xATkqGWpEto1opDnBUC5peiwwmm37LIu2p5KHmdMusg5RascsXLTa
```

Sau đó tạo một file để lưu trữ thông tin gồm username và password với format như sau:

```
username:password
```

Bạn có thể tạo nhiều tài khoản, mỗi tài khoản là 1 dòng. Ví dụ:

```shell
$ cat ~/.config/mailhog/auth
thien:$2a$04$1nbNyIOegat1PU3m5s2NDev7dI3I1Qz5hN8rf8LG3M3Fge8JCJyA.
another:$2a$04$1nbNyIOegat1PU3m5s2NDev7dI3I1Qz5hN8rf8LG3M3Fge8JCJyA.
```

Để sử dụng được HTTP auth, bạn cần truyền đường dẫn tới file chứa thông tin tài khoản thông qua `-auth-file`. Trong trường hợp của mình là

```shell
$ MailHog -auth-file=/home/thien/.config/mailhog/auth
```

{{<zoom-img src="img/figure-2.png">}}

## Testing

Vì mình đang làm một project Laravel, nên mình sẽ config MailHog cho Laravel. Chúng ta chỉ cần thay đổi 2 biến môi trường sau là được:

```shell
$ cat .env
MAIL_HOST=<your_server_id>
MAIL_PORT=1025
```

Bên trên là ví dụ cho Laravel. Những project khác cũng chỉ cần cung cấp đúng host và port là có thể gởi email test được rồi.

Ngoài ra bạn có thể tham khảo một tool MailHog phát triển đó là [mhsendmail](https://github.com/mailhog/mhsendmail)

```shell
$ go get github.com/mailhog/mhsendmail

$ mhsendmail test@mailhog.local <<EOF
From: App <app@mailhog.local>
To: Test <test@mailhog.local>
Subject: Test message

Some content!
EOF
```

## Kết

Việc cài Mailhog cũng tốn tiền server. Nhưng sử dụng Mailhog bạn sẽ thoải mái không sợ giới hạn gì nữa. Và việc cài đặt cũng thú vị, học được nhiều thứ cũng đáng để thứ đấy chứ.
