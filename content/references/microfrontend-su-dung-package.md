---
title: Microfrontend sử dụng package
date: 2022-05-30T10:23:58+07:00
authors:
  - vominh
draft: false
---

## Cài đặt

Làm một web app bình thường mà trong đó các micro frontend được implement thành các package khác nhau, giống như cách build, sử dụng những package bên thứ 3.

## Ưu điểm

1. Các module được phát triển độc lập.
2. Dependency độc lập

## Nhược điểm

1. Cần phải build lại cả app khi có bất kì thay đổi nào trong các module.
2. A/B testing, custom trải nghiệm người dùng thì phải build ra một bản khác.
