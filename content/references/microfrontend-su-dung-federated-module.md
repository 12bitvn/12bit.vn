---
title: Microfrontend sử dụng Federated Module
date: 2022-05-30T10:23:58+07:00
authors:
  - vominh
draft: false
---

## Cài đặt

Sử dụng Webpack để build các module một cách độc lập, rất giống với [[Microfrontend sử dụng package]], nhưng khác biệt ở chỗ các module này được build để có thể được require trong quá trình runtime. Dependency cũng được resolve trong lúc runtime.

## Ưu điểm

1. Các module được build, phát triển độc lập
2. Khả năng custom, tạo nhiều phiên bản trải nghiệm cho người dùng mà không cần phải build lại.
3. Rollout/rollback đơn giản, nhanh chóng và độc lập.
4. Không cần phải build lại toàn bộ app khi release một micro frontend

## Nhược điểm

1. Implement có phần phức tạp hơn.

