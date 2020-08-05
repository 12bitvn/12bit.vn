---
authors:
  - tatthien
date: "2020-02-10T09:22:38+07:00"
draft: false
tags:
- git
- til
title: Cấu hình .gitignore global
---

Có những file hoặc folder chúng ta luôn luôn phải ignore hoặc khi làm chung với những dev sử dụng hệ điều hành khác, editor khác thì lại không sinh ra file đó. Vì vậy một cách tốt hơn đó là ignore global. Có nghĩa là bạn sẽ không cần phải ignore những file như `.DS_Store` cho từng repo nữa. Chỉ cần ignore một lần là đủ.

Lấy một ví dụ, nếu bạn dùng JetBrain IDE sẽ sinh ra `.idea` nhưng một dev khác lại dùng VSCode thì sinh ra `.vscode`. Như vậy để file `.gitignore` của repo được gọn hơn thì chúng ta nên ignore global.

Cách làm cũng khá đơn giản với 3 bước sau:

**Bước 1**: Tạo một file để chứa nội dung cần ignore:

```shell script
$ touch ~/.gitignore
```

**Bước 2**: Config git để sử dụng file này:

```shell script
$ git config --global core.excludesfile ~/.gitignore
```

Lưu ý rằng command phía trên không tạo ra file `.gitignore`. Mà nó sẽ thêm một dòng config vào dưới section `core` trong file `.gitconfig`.

```shell script
excludesfile = ~/.gitignore
```

**Bước 3**: Thêm những gì muốn ignore vào file `.gitignore`

```shell script
$ vim ~/.gitignore
```

```shell script
.DS_Store
.idea/
```

Như vậy Git đã có thể ignore tất cả các file `.DS_Store` và folder `.idea/` cho các repo của mình mà không cần phải cấu hình riêng cho từng file `.gitignore`.

### Một số gitignore phổ biến

Không có gì là quá mới lạ trong ngành này, kể cả ignore cũng thế. Bạn có thể tìm thấy rất nhiều file ignore thường dùng tại repo của Github: [github/ignore](https://github.com/github/gitignore).

Hoặc thậm chí là một công cụ generate file ignore cho các stack mà bạn sử dụng: [ignore.io](https://gitignore.io ).

Tuy nhiên cũng có một vài ý kiến cho rằng không nên dùng cách này, vì những người khác coloborate vào thì họ sẽ không có chung một file gitignore global như chúng ta. Thay vào đó bỏ tất cả vào `.gitignore` thì tốt hơn. Không biết quan điểm của các bạn như thế nào? Hãy cùng bình luận nhé!
