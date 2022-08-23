---
title: Quản lí nhiều SSH key trên cùng một thiết bị
date: 2022-08-23T09:15:46+07:00
authors:
  - tatthien
draft: false
tags:
  - gitlab
  - ssh
---

Hôm nay mình gặp phải một vấn đề khi thêm SSH key cho tài khoản Gitlab mới. Mình thử add key vào những bị báo lỗi `Fingerprint has already been taken`. Điều này có nghĩa mình đã dùng key này cho một tài khoản khác trên Gitlab. Và Gitlab không cho phép sử dụng chung một SSH key cho nhiều tài khoản khác nhau.

Như vậy mình cần phải generate ra một key mới và thêm vào tài khoản mới. Tuy nhiên làm sao để biết là mình đang clone repo ở tài khoản nào để không bị báo lỗi authorization?

## Generate key mới

Đầu tiên chúng ta cần tạo ra một SSH key mới và lưu nó với một tên khác để tránh bị trùng với key trước đó. Ví dụ `~/.ssh/id_rsd_company`.

```bash
ssh-keygen -t rsa -b 4096 -C "email@company.com"
```

{{% alert info %}}
Đừng quên thêm key này vào tài khoản Gitlab của bạn nhé.
{{% /alert %}}

## Config

Bây giờ chúng ta sẽ cần phải thêm cấu hình trong `~/.ssh/config`

```
# Company account
Host gitlab.company
  HostName gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_company

# Personal account
Host gitlab.personal
  HostName gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_personal
```

Như các bạn thấy, chúng ta define một Host với tên là `gitlab.company`, với những thông số như `HostName`, `IdentityFile` là đường dẫn tới SSH key chúng ta mới tạo.

## Sử dụng

Bây giờ khi clone repo từ 2 tài khoản trên, sẽ có thay đổi một chút ở phần URL. Giả sử chúng ta clone repo với tên là `demo` ở tài khoản company. URL thông thường sẽ là:

```bash
git@gitlab.com:username/demo.git
```

Tuy nhiên, vì đã cấu hình lại host name cho gitlab.com, vì vậy URL mới sẽ phải làm

```bash
git@gitlab.company:username/demo.git
```

Như vậy `gitlab.company` sẽ được resolve ra thành `gitlab.com` và được chứng thực thông qua SSH key mà chúng ta vừa tạo.

Tương tự, bạn cũng phải chỉnh sửa URL cho tài khoản cá nhân tương tự như trong file `~/.ssh/config`.
