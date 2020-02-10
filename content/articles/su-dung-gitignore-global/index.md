---
authors:
  - tatthien
date: "2020-02-10T09:22:38+07:00"
draft: true
tags:
- git
- til
title: Cấu hình .gitignore global
---

Có những file hoặc folder chúng ta luôn luôn phải ignore hoặc khi làm chung với những dev sử dụng hệ điều hành khác, editor khác thì lại không sinh ra file đó. Vì vậy một cách tốt hơn đó là ignore global. Có nghĩa là bạn sẽ không cần phải ignore những file như `.DS_Store` cho từng repo nữa. Chỉ cần ignore một lần là đủ.

Lấy một ví dụ, nếu bạn dùng JetBrain IDE sẽ sinh ra `.idea` nhưng một dev khác lại dùng VSCode thì sinh ra `.vscode`. Như vậy để file `.gitignore` của repo được gọn hơn thì chúng ta nên ignore global.

Cách làm cũng khá đơn giản với 3 bước sau:

**Bước 1**: chúng ta sẽ tạo một file để chứa nội dung cần ignore bởi Git.

```bash
$ touch ~/.gitignore_global
```

**Bước 2**: cấu hình để Git sử dụng file chúng ta vừa tạo để dùng cho tất cả các repo.

```bash
$ git config --global core.excludesfile ~/.gitignore_global
```

Lưu ý rằng command phía trên không tạo ra file `.gitignore_global`. Mà nó sẽ thêm một dòng là 

```
excludesfile = ~/.gitignore_global
```

bến dưới section `core` trong file `.gitconfig`.

**Bước 3**: bây giờ bạn chỉ cần thêm những gì muốn ignore vào file `.gitignore_global`

```bash
$ vim ~/.gitignore_global

~
.DS_Store
.idea/
~
~
```

Như vậy Git đã có thể ignore tất cả các file `.DS_Store` và folder `.idea/` cho các repo của mình mà không cần phải cấu hình riêng cho từng file `.gitignore`.

Tuy nhiên cũng có một vài ý kiến cho rằng không nên dùng cách này, vì những người khác coloborate vào thì họ sẽ không có chung một file gitignore global như chúng ta. Thay vào đó bỏ tất cả vào `.gitignore` thì tốt hơn. Không biết quan điểm của các bạn như thế nào? Hãy cùng bình luận nhé!