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

## Explanation

The first step is to install the necessary Python and system dependencies. This is achieved by running the command sudo apt install python3 python3-venv libaugeas0. Here, sudo grants administrator permissions, apt install is the package management command, and python3, python3-venv, and libaugeas0 are the packages to be installed.

Next, we create a Python virtual environment in the directory /opt/certbot/ using the command sudo python3 -m venv /opt/certbot/. This isolates our Certbot installation and its dependencies from the rest of the system.

Once the virtual environment is set up, we need to install and upgrade the Python package installer pip to the latest version. We do this by invoking pip directly from the virtual environment using the command sudo /opt/certbot/bin/pip install --upgrade pip.

With our virtual environment and pip set up, we can now install Certbot and its Nginx plugin. This is done by running sudo /opt/certbot/bin/pip install certbot certbot-nginx.

Finally, we create a symbolic link to the Certbot executable in the /usr/bin directory. This allows us to run the certbot command from any location within the terminal. This is achieved by running sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot.
