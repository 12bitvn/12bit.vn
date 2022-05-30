---
title: Cài SSL cho nginx
date: 2022-05-30T10:23:58+07:00
reference-tags:
  - Nginx
authors:
  - vominh
draft: false
---

Tạo config:

```bash
touch /etc/nginx/sites-available/frp.duocnguyen.dev.conf
```

Link nó qua bên enabled:

```bash
sudo ln -s /etc/nginx/sites-available/frp.duocnguyen.dev.conf /etc/nginx/sites-enabled/
```

Config file:

```nginx
server {
    server_name *.frp.duocnguyen.dev;
    listen 80;
    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header    Host            $host;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/frp.duocnguyen.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/frp.duocnguyen.dev/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
server {
    if ($host = .frp.duocnguyen.dev) {
        return 301 https://$host$request_uri;
    }
    listen 80;
    return 404;
}
```

## Cài đặt certbot

{{% include "/references/cai-dat-certbot.md" %}}

Config cert bot và nginx

```bash
sudo certbot -d *.frp.duocnguyen.dev -d frp.duocnguyen.dev --manual --preferred-challenges dns-01 certonly
```

Cài đặt DNS theo như hướng dẫn là được.

