---
title: Microfrontend sử dụng iframe
date: 2022-05-30T10:23:58+07:00
authors:
  - vominh
draft: false
---

Đây là cách để implement microfrontend đơn giản và sơ khai nhất, cũng như dễ implement. Nhưng cũng có những limit riêng

## Cách cài đặt

Cài đặt không quá phức tạp. Hiện thực các module thành những trang web riêng biệt, thương thì các trang này không có header, footer hoặc các thành phần thuộc về app shell. Nó chỉ bao gồm những gì phục vụ cho feature đó.

Shell là một website dùng để gắn các micro frontend vào một chỗ, quản lý share data, layout và navigation.

## Ưu điểm

1. Implement đơn giản
2. Quen thuộc với cách implement truyền thống

## Nhược điểm

Các microfrontend không thể chia sẻ dữ liệu với nhau trực tiếp được. Mà phải sử dụng cookie, hoặc thông qua server.
