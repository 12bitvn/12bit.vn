---
authors:
  - vominh
date: 2022-07-25T11:31:57+07:00
draft: false
title: Sử dụng private repo trong go mod
---

Setup Private trên máy cần get

```bash
set -x GOPRIVATE "pkg.trueprofit.goldencloud.dev/*,bitbucket.org/trueprofit/*"
git config --global url."git@bitbucket.org:".insteadOf "https://bitbucket.org/"
```
