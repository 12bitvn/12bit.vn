---
authors:
  - vominh
date: "2018-03-09T20:13:05+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/800/1*LAlUHbdgtNQdssTdUwK0oQ.png
tags:
- ngrok
- localhost
- webhook
title: Công khai localhost lên internet bằng Ngrok
---

{{<figure src="https://cdn-images-1.medium.com/max/800/1*LAlUHbdgtNQdssTdUwK0oQ.png" title="Nguồn: https://www.npmjs.com/package/ngrok">}}

Có nhiều lý do để chúng ta cần làm việc này, ví dụ như muốn test app facebook thì bạn cần cung cấp url cho facebook và họ sẽ request tới url đó, hoặc paypal cần một request post về url của bạn để xác nhận thanh toán, hoặc muốn nhờ người khác test giùm bạn một chức năng nào đó. Bạn có thể mở port và dùng static IP để làm việc này, nhưng cấu hình https và mở port cũng mất nhiều thời gian, nếu có cách chỉ tốn của bạn một dòng lệnh thì sao nhỉ.

## Ngrok

Ngrok có gói miễn phí và tốn phí, khác nhau ở vài tính năng nâng cao như custom domain, wildcard domain, v.v.. Ở gói free thì subdomain là random, vì vậy mỗi lần chạy ngrok lại là mỗi lần phải setting lại trên facebook, paypal.

Bạn có thể xem [bảng giá](https://ngrok.com/pricing) và [tài liệu](https://ngrok.com/docs) đầy đủ tại website của ngrok.

## Cài đặt ngrok

Tải file ngrok tại trang [download](https://ngrok.com/download). Sau đó thì tùy theo hệ điều hành mà bạn đang sử dụng mà sẽ có thêm những bước tiếp theo. Đối với mac thì việc cài đặt để chạy ngrok global còn đơn giản hơn:

```sh
brew install ngrok
```

## Sử dụng ngrok

Việc sử dụng cũng khá đơn giản, giả sử apache hoặc phần mềm server nào đó của bạn đang handle ở port 80:

```sh
ngrok http 80
```

bạn sẽ thấy như sau:

```sh
ngrok by @inconshreveable

Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://92832de0.ngrok.io -> localhost:80
Forwarding                    https://92832de0.ngrok.io -> localhost:80

Connnections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Nhìn vào kết quả có lẽ cũng dễ hiểu ý nghĩa của các url này.

Truy cập vào 127.0.0.1:4040 bạn sẽ thấy giao diện theo dõi traffic. Giao diện này cũng cung cấp một số tính năng nhằm debug.

Ngrok cung cấp nhiều config, trong trường hợp bạn cần dùng nhiều config một lúc thì việc gõ đi gõ lại rất mất thời gian, hoặc nếu bạn muốn share project với người khác thì việc viết config vào một file là rất hữu ích:

```sh
ngrok http -config=ngrok.yml 8000
```

Và còn nhiều config khác mà bạn có thể xem đầy đủ hơn tại [trang tài liệu](https://ngrok.com/docs) của ngrok.

## Sử dụng với node.js

Bạn có thể dùng child_process để run ngrok, nhưng có người đã giúp bạn đóng gói thành một thư package để dùng tiện hơn:

```sh
npm install ngrok
```

Và dùng thôi

```javascript
const url = await ngrok.connect({
	proto: 'http', // http|tcp|tls, defaults to http
	addr: 8080, // port or network address, defaultst to 80
	auth: 'user:pwd', // http basic authentication for tunnel
	subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io
	authtoken: '12345', // your authtoken from ngrok.com
	region: 'us', // one of ngrok regions (us, eu, au, ap), defaults to us
	configPath: '~/git/project/ngrok.yml' // custom path for ngrok config file
	binPath: default => default.replace('/bin', '.unpacked/bin'); // custom binary path, eg for prod in electron
});
```

Bạn xem thêm tại liệu tại trang repo [bubenshchykov/ngrok](https://github.com/bubenshchykov/ngrok).
