---
authors:
  - tatthien
date: "2018-12-06T17:44:44+07:00"
description: Bài viết này mình xin giới thiệu cách deploy một lambda function viết
  bằng Go lên Netlify.
draft: false
images:
- /articles/gioi-thieu-go-lambda-functions-tren-netlify/images/01.png
tags:
- go
- lambda function
- netlify
title: Giới thiệu Go Lambda Functions trên Netlify
---

Bài viết này mình xin giới thiệu cách deploy một lambda function viết bằng Go lên Netlify.

Thật ra chúng ta đang sử dịch vụ AWS Lambda của Amazon, tuy nhiên functions được quản lí thông qua Netlify và bạn không cần phải có tài khoản AWS. [Gói miễn phí](https://www.netlify.com/pricing/) của Netlify cung cấp 125.000 function requests/tháng và 100 giờ run time/tháng. Trong khi đó, [gói free của AWS](https://aws.amazon.com/vi/lambda/pricing/) cung cấp cho bạn 1 triệu request/tháng và 400 nghìn Gb-Giây (gb*giây).

## Chuẩn bị

Cài đặt [Netlify Command Line Interface](https://www.netlify.com/docs/cli/), giúp chúng ta deploy project lên Netlify.

```sh
npm install -g netlify-cli
```

Khởi tạo project với cấu trúc sau:

```sh
├── .gitignore
├── main.go
├── Makefile
└── site
    └── index.html
```

## Viết function

Đầu tiên chúng ta cần cài đặt package chính thức của AWS hỗ trợ AWS Lambda Functions.

```sh
go get https://github.com/aws/aws-lambda-go
```

Code của chúng ta sẽ nằm trong `main.go`

```go
package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello from 12bit.vn",
	}, nil
}

func main() {
	lambda.Start(handler)
}
```

Đoạn code trên thực hiện một tác vụ đơn giản đó là trả về chuỗi _“Hello from 12bit.vn”_ khi chúng ta gởi một request vào đúng endpoint của function đó.

Body có kiểu string, chính là những gì sẽ trả về cho người dùng, nếu bạn muốn trả về kiểu JSON, thì phải tự marshal, cast []byte về kiểu string và gửi vào body, đồng thời thêm vào header:

```sh
Content-Type: application/json
```

Chúng ta thay đổi code bên trong function `handler` một chút.

```go
func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	body, _ := json.Marshal(map[string]interface{}{
		"msg": "Hello from 12bit.vn",
	})
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"content-type": "application/json",
		},
		StatusCode: 200,
		Body:       string(body),
	}, nil
}
```

Dữ liệu trả về sẽ có type JSON

```json
{
    "msg": "Hello from 12bit.vn"
}
```

## Build và Deploy

Để có thể gởi request lên function bên trên, chúng ta cần deploy project lên Netlify.

Để làm được điều này chúng ta có 2 bước:

- Build project thành file binary.
- Deploy file binary đó lên Netlify.

Chúng ta sẽ dùng Make và định nghĩa các câu lệnh trong `Makefile` để giảm thời gian gõ lại lệnh build và cũng tiện để implement auto deployment.

### Build binary file

```sh
build:
   mkdir -p functions
   go get ./...
   GOOS=linux GOARCH=386 go build -o functions/hello main.go
```

Lệnh build gồm 3 bước:

- Tạo folder chứa file binary sau khi build.
- Get tất cả packages cần thiết.
- Build file `main.go` với flag `-o functions/hello` để định nghĩa đường dẫn sau khi build của file binary.

Vì lambda chạy trên các máy chủ linux, vì vậy bạn cần phải chỉ định các biên ENV là `GOO` và `GOARCH` để go có thể build ra file thực thi phù có thể chạy trên linux.

Sau khi định nghĩa command `build` trong makefile, ta dùng lệnh sau để build:

```sh
make build
```

Kết quả sau build sẽ sinh ra folder `functions` chứa file thực thi.

```
├── functions
│   └── hello
├── .gitignore
├── main.go
├── Makefile
└── site
    └── index.html
```

### Deploy lên Netlify

Tiếp tục trong `Makefile`, chúng ta định nghĩa lệnh `deploy`

```sh
deploy:
   netlify deploy --dir=site --functions=functions --prod
```

Để biết và hiểu các option khi deploy, các bạn gõ lệnh:

```sh
netlify deploy --help
```

Một điểm cần lưu ý đó là các bạn phải trỏ đúng tên folder chứa các functions ở phần `--functions=functions`. Cụ thể folder của chúng ta đang là `functions`

Để deploy, các bạn gõ lệnh `make deploy`. Sau khi deploy, Netlify cung cấp cho chúng ta đường dẫn để request vào các functions như sau:

- Unique Deploy URL: https://5c0756bcc9659235c6174832--go-lambda-netlify.netlify.com
- Live URL: https://go-lambda-netlify.netlify.com

Để truy cập vào function các bạn theo cú pháp sau:

```sh
[site_name].netlify.com/.netlify/functions/[function_name]
```

Trong ví dụ của chúng ta thì endpoint sẽ như sau:

```sh
https://go-lambda-netlify.netlify.com/.netlify/functions/hello
```

> Các bạn có thể dùng Unique Deploy URL hoặc Live URL đều được, tùy mục đích sử dụng.

{{<figure src="/articles/gioi-thieu-go-lambda-functions-tren-netlify/images/01.png" title="Dùng Postman để test request">}}

## Kết luận

Bài viết trên với mục đích giới thiệu cho các bạn một tính năng hay của Netlify, giúp chúng ta có thể deploy AWS Lambda Function một cách dễ dàng.

Các bạn có thể đọc thểm về Functions trên Netlify tại đây: https://www.netlify.com/docs/functions/

Source code: https://github.com/12bitvn/go-lambda-netlify/

Request url: https://go-lambda-netlify.netlify.com/.netlify/functions/hello
