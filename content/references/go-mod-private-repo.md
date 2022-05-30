---
title: Go mod private repo
date: 2022-05-30T10:23:58+07:00
authors:
  - vominh
draft: false
---

Go get thực hiện checksum code bằng dịch vụ của go, nhưng private repo thì không được checksum vì vậy sẽ bị lỗi.

Nếu bạn server trả về private repo, thì bạn cần phải setup biết môi trường `GOPRIVATE` và chỉ định git sử dụng `ssl` thay vì `http`:

Setup Private trên máy cần get:

```bash
set -x GOPRIVATE "pkg.trueprofit.goldencloud.dev/*,bitbucket.org/trueprofit/*"
git config --global url."git@bitbucket.org:".insteadOf "https://bitbucket.org/"
```
