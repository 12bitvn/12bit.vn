
---
title: Cài đặt FRPC
date: 2022-05-30T10:23:58+07:00
authors:
  - vominh
draft: false
---

Cài đặt client:

```bash
brew install frp
```

Hoặc tải tại trang [Releases · fatedier/frp · GitHub](https://github.com/fatedier/frp/releases)

Config client:

```ini
[common]
server_addr = 128.199.148.122
server_port = 7000
protocol = kcp
token = 2J6R3xfPBeHyKX
admin_addr = 127.0.0.1
admin_port = 7400
admin_user = admin
admin_pwd = admin

[fireass]
type = http
local_port = 8080
subdomain = fireass
use_compression = true
```

Run client:

```bash
frpc -c ./frpc.ini
```
