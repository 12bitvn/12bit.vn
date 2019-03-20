---
title: "Tạo HTTPS cho localhost sử dụng mkcert"
date: 2019-01-07T11:37:49+07:00
tags:
  - https
  - localhost
  - mkcert
images:
  - /articles/tao-https-cho-localhost-su-dung-mkcert/images/thumbnail.jpg
authors:
  - tatthien
draft: false
---

Ngày nay nhiều tính năng yêu cầu website của bạn phải có HTTPS để có thể hoạt động như Service Workers hoặc một vài payment gateway sẽ không hoạt động nếu website không có HTTPS. Và việc phát triển trên localhost với HTTP có thể gây ra lỗi khi deploy production sử dụng HTTPS.

**mkcert** là một CLI tool được build bằng Golang giúp bạn giải quyết các vấn đề trên theo cách đơn giản nhất. Nó có thể tạo HTTPS cho bất kì hostname, IP và kể cả localhost.

> mkcert is a simple tool for making locally-trusted development certificates. It requires no configuration.

## Cài đặt mkcert

Hiện tại mkcert hỗ trợ đa nền tảng như macOS, Linux, Windows. Các bạn có thể coi cách cài đặt cho từng hệ điều hành trên GitHub repo của mkcert

{{<gh-repos "FiloSottile/mkcert">}}

Nếu bạn dùng macOS thì có thể cài đặt qua [Homebrew](https://brew.sh/)

```sh
brew install mkcert
brew install nss # if you use Firefox
```

## Sử dụng mkcert

Đầu tiên chúng ta cần phải tạo một certificate authority (CA). CA này sẽ được lưu trên máy tính của chúng ta.

```markdown
$ mkcert -install
Using the local CA at "/Users/thien/Library/Application Support/mkcert" ✨
The local CA is now installed in the system trust store! ⚡️
The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
```

Tiếp theo, ta sẽ tạo certificate cho host thông qua command `mkcert hostname`.

{{%alert info%}}
Bạn có thể tạo certificate cho nhiều host, IP cùng lúc như sau:

```markdown
mkcert example.com "*.example.org" myapp.dev localhost 127.0.0.1 ::1
```
{{%/alert%}}

Trong bài viết này, mình sẽ áp dụng cho `localhost`. Vì vậy, lệnh tạo certificate sẽ như sau:

```markdown
$ mkcert localhost
Using the local CA at "/Users/thien/Library/Application Support/mkcert" ✨

Created a new certificate valid for the following names 📜
 - "localhost"

The certificate is at "./localhost.pem" and the key at "./localhost-key.pem" ✅
```

Sau khi câu lệnh chạy xong, bạn sẽ thấy 2 file là `localhost.pem` và `localhost-key.pem` được tạo ra, chúng sẽ nằm tại thư mục mà bạn đang thực hiện command. Trong trường hợp này là thư mục home `/Users/thien` trên máy mình.

🤔 Vậy có file `.pem` rồi chúng ta sẽ làm gì để có thể dùng được HTTPS cho localhost?

Điều này còn tùy vào development của bạn. Mình sẽ ví dụ 2 trường hợp đó là sử dụng Apache web server và một web server bằng Node.js

### Cài đặt trên Apache

Apache hay Nginx đều hỗ trợ chúng ta cấu hình SSL cerficates. Đối với Apache, các bạn có thể cấu hình như sau:

```
<VirtualHost localhost:443>
  ...
  SSLEngine on
  SSLCertificateFile "/Users/thien/localhost.pem"
  SSLCertificateKeyFile "/Users/thien/localhost-key.pem"
  ...
</VirtualHost>
```

Sau khi config, bạn restart lại Apache và kiểm tra kết quả:

{{<figure src="images/mkcert-01.png" title="Trước">}}

{{<figure src="images/mkcert-02.png" title="Sau">}}

### Cài đặt cho Node.js

Chúng ta sẽ tạo một web server đơn giản sử dụng module `https`. Phần options, các bạn cần require 2 file `.pem` đã được tạo ở phần trên.

```markdown
├── certificates
│   ├── localhost-key.pem
│   └── localhost.pem
└── index.js
```

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('certificates/localhost-key.pem'),
  cert: fs.readFileSync('certificates/localhost.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

Chúng ta có thể kiểm tra kết quả bằng cách truy cập vào https://localhost:8000

{{<figure src="images/mkcert-03.png" title="Bạn sẽ thấy dòng chữ 'Issued by: mkcert'">}}

## Tham khảo

- [mkcert repo](https://github.com/FiloSottile/mkcert)
- [mkcert: valid HTTPS certificates for localhost](https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/)
