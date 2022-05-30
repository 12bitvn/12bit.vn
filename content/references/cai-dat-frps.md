---
title: Cài đặt FRP
date: 2022-05-30T10:23:58+07:00
authors:
  - vominh
draft: false
---

Download file từ Github

```bash
wget https://github.com/fatedier/frp/releases/download/v0.42.0/frp_0.42.0_linux_amd64.tar.gz
```

Giải nén nó:

```bash
tar -zxvf frp_0.42.0_linux_amd64.tar.gz
```

Di chuyển vào thứ mục vừa giải nén:

```bash
cd frp_0.42.0_linux_amd64
```

Chép file `frps` vào thư mục bin:

```bash
cp frps /usr/bin
```

Chép file service:

```bash
cp systemd/frpc.service /etc/systemd/system/.
chmod 754 /etc/systemd/system/frps.service
```

Chép file config:

```bash
mkdir /etc/frp
cp frps.ini /etc/frp/.
```

Config file `/etc/frp/frps.ini`

```ini
[common]
bind_port = 7000
kcp_bind_port = 7000
vhost_http_port = 8090
token = 2J6R3xfPBeHyKX
tcp_mux = true
subdomain_host = frp.duocnguyen.dev
dashboard_port = 7500

dashboard_user = admin
dashboard_pwd = ipIf08D3a42
```

Enable service:

```bash
systemctl enable frps.service
```

Chạy service

```
systemctl start frps.service
```
