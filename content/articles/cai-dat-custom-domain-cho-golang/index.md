---
authors:
  - vominh
date: 2022-07-25T11:31:57+07:00
draft: false
title: Custom domain cho go mod giúp migrate code đơn giản hơn
---

Trong dự án TrueProfit mình đã từng dịch chuyển giữa hai git server khác nhau, Ban đầu dùng Gitlab, sau đó đổi qua Bitbucket và về sau này đang chuyển đổi một số repo qua Github.

Nhưng mình đã không gặp nhiều khó khăn trong quá trình di chuyển này nhờ vào việc sử dụng custom domain.

Nếu sử dụng git URL của từng dịch vụ thì trong code sẽ import như sau:

```go
import "bitbucket.com/mongo-driver/bson/primitive"
```

Vậy lúc thay đổi qua một dịch vụ khác sẽ phải tìm và sửa lại code trong mọi file, rất bất tiện, nếu sai sót có thể dẫn tới nhiều lỗi khó debug. Trong một hệ thống serverless thì việc sót là dễ xảy ra.

Nhưng ngay từ đầu, mình đã sử dụng custom domain cho go, nên không cần thay đổi gì trong code. Cũng như có thể sử dụng nhiều dịch vụ cùng lúc.

Vấn đề còn lại là làm sao để go mod biết remote url để pull code về.

## Cách go mod get code

Custom domain được trỏ về một server hoặc Lambda function, server này nhận request của `go mod` và trả về thông tin mà `go mod` cần để get source về.

Khi dùng `go get` thì go sẽ gửi request tới url kèm theo query `go-get=1`. Lúc này server cần trả về file html với meta `go-import` chứa content là path tới git, Ví dụ như sau:

```html
<meta name="go-import" content="pkg.trueprofit.goldencloud.dev/internalfns git https://bitbucket.org/trueprofit/internalfns.git">
```

Do đó ta chỉ cần làm sao cho server trả về content như vậy là được.

## Cài đặt server

Về cơ bản thì chỉ cần trả về content như trên là được, nên có thể hiện thực bằng nhiều cách khác nhau, đơn giản nhất là code một server bằng go. Nhưng ở đây mình sẽ hướng dẫn bằng hai công cụ quen thuộc là Nginx và Lambda.

### Nginx

Bạn cần có một server đã đã cài đặt nginx.

Point domain to nginx, và config nó.

Setup Nginx: `/etc/nginx/sites-available/pkg.trueprofit.goldencloud.dev`

```
server {
    server_name pkg.trueprofit.goldencloud.dev;
    location ~ /.well-known {
        allow all;
        root /usr/share/nginx/html;
    }
    location ~ /([A-Za-z0-9_-]+)(/[A-Za-z0-9_.-]+)*$ {
        if ($args = "go-get=1") {
            return 200 '<meta name="go-import" content="$host/$1 git https://bitbucket.org/trueprofit/$1.git">';
        }
        return 302 https://bitbucket.org/trueprofit/$1;
   }
}
```

### Lambda

Nếu chọn nginx thì có thể bỏ qua phần này.

Tạo Lambda function tên `go-module-proxy` bằng nodeJs:

```js
const hosts = {
    'mongo-go-driver': 'https://github.com/trueprofit',
    'go-shopify': 'https://github.com/goldencloud-io',
    '*': 'https://bitbucket.org/trueprofit',
}

exports.handler = async (event) => {
    // console.log(event)

    const pkg = event.path.substring(1)
    let host = hosts[pkg] || hosts['*']

    if (event.queryStringParameters && event.queryStringParameters['go-get'] == '1') {
        return {
            statusCode: 200,
            body: `<meta name="go-import" content="${event.headers.Host}${event.path} git ${host}${event.path}.git">`
        }
    }

    return {
        statusCode: 302,
        headers: {
            Location: `${host}${event.path}`
        }
    }
};
```

Map function này với API gateway:

{{<zoom-img src="20220526174453.png">}}

Map custom domain vào resource mới tạo này:

{{<zoom-img src="20220526174654.png">}}

## Sử dụng

Đồng thời  go get cũng thực hiện checksum repo bằng dịch vụ của go, nhưng private repo thì không được checksum vì vậy sẽ bị lỗi.

Nếu bạn server trả về private repo, thì bạn cần phải setup biết môi trường `GOPRIVATE` và chỉ định git sử dụng `ssl` thay vì `http`:

{{% include "/references/su-dung-private-repo-trong-go-mod.md" true%}}
