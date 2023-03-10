---
title: Làm sao để cài certbot trên linux
date: 2022-05-30T10:23:58+07:00
authors:
  - vominh
draft: false
---

Certbot là một công cụ nguồn mở và miễn phí được phát triển bởi Electronic Frontier Foundation (EFF) để tự động hóa việc lấy và gia hạn chứng chỉ SSL/TLS.


```bash
sudo apt install python3 python3-venv libaugeas0
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot certbot-nginx
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
```
