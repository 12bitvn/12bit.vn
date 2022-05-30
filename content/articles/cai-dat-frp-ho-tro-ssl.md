---
authors:
  - vominh
date: 2022-05-30T11:31:57+07:00
draft: false
title: Sử dụng FRP để public localhost hỗ trợ SSL
---

Có khá nhiều feature, tốt hơn ngrok, localtunnel, nhưng ở đây chỉ bắt đầu với việc sử dụng frp để expose **localhost** dưới một **subdomain** bất kỳ, có **SSL**.

Cài đặt bao gồm 3 phần:

1.  Cài đặt domain
2.  Cài đặt frps trên server
3.  Cài đặt frpc trên máy local

## Cài đặt domain

Tạo 2 record như sau, với value là IP của server mà bạn muốn dùng để cài đặt frp:

1. `frp.duocnguyen.dev.`
2. `*.frp.duocnguyen.dev.`

## Cài đặt FRP server

{{% include "/references/cai-dat-frps.md" %}}

### Cài nginx

{{% include "/references/cai-dat-nginx.md" %}}

{{% include "/references/cai-ssl-cho-nginx.md" %}}

# Cài đặt client

{{% include "/references/cai-dat-frpc.md" %}}


# Sử dụng

Chạy server của mình:

```bash
go run ./cmd/server/...
```

Chạy frp:

```bash
frpc -c ./frpc.ini
```

Truy cập vào trang:

```bash
https://fireass.frp.duocnguyen.dev/ping
```
