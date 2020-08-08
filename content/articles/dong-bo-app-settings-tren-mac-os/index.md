---
title: Đồng bộ application settings giữa nhiều máy mac
authors:
  - vominh
date: "2020-08-06T20:54:43+07:00"
description: Đồng bộ application setting giữa các máy mac OS với nhau.
draft: false
images:
- /articles/dong-bo-app-settings-tren-mac-os/images/thumbnail.jpg
tags:
- productivity
---

## Mình có MỘTs  cái mac

Mình có một cái mac thôi, nhưng MỘT ở công ty, MỘT ở phòng ngủ, MỘT ở nhà vệ sinh, MỘT ở phòng khách. Và vấn đề là:

> Làm sao để config của các ứng dụng trên các máy này đồng bộ với nhau?

Việc đầu tiên có thể nghĩ đến chính là các ứng dụng cli thường lưu config ở như mục `home` hoặc `~/.config`. Có thể chép nội dung ở các thư mục này rồi bỏ vào iDrive để đồng bộ, sau đó sử dụng nó trên những máy khác.

Nhưng vấn đề là:

> Còn các ứng dụng khác thì sao?

Những ứng dụng lưu config trong thư mục riêng của nó, hoặc trong thư mục `ApplicationSupport`?

Vậy thì mình lại mò mẫm vào một đống thư mục trong đó và tìm đúng thư mục config rồi chép vào iDrive là xong. Dễ mà ... ừ dễ lắm.

Nhưng vấn đề là:

> Chép bằng tay đến bao giờ?

Vậy thì mình sẽ viết script để tự động copy, làm một cấu trúc các file cần được lưu, sau đó loop và copy thôi. Nếu lúc này ta ngồi hì hục code thì sẽ được một chương trình rất chi là handcraft, sẽ học được nhiều thứ, và nhất là bài học "nếu dùng đồ có sẵn thì đã không trễ deadline".

 Vậy nên nếu đang chạy deadline thì hãy dùng ứng dụng [mackup](https://github.com/lra/mackup#whats-up-with-the-weird-name) của anh [Laurent Raufaste](https://github.com/lra), nó cũng phát từ câu chuyện mà chúng ta gặp phải lúc nảy.

Mackup và cộng đồng đã define khá nhiều rule để backup cho nhiều ứng dụng thông dụng.

## Cài đặt mackup

Thánh thần phù hộ các bạn sử dụng `brew`:

```shell script
brew install mackup
```

hoặc `pip`:

```shell script
pip install --upgrade mackup
```

## Cấu hình mackup

Mackup lưu config ở path `~/.mackup.cfg`. Ta cần tạo file này để config những app nào cần được backup và backup vào dịch vụ lưu trữ nào.

### Storage

Config nơi lưu trữ các file config =)). mackup hỗ trợ khá đầy đủ các dịch vụ lưu trữ file:

1. dropbox
1. google_drive
1. icloud
1. copy
1. file_system

Mình thích icloud nên config như sau:

```
[storage]
engine = icloud
```

### Backup application settings

Cộng đồng đã giúp define rule để backup cho khá nhiều ứng dụng thông dụng. Gần như có thể đáp ứng mọi nhu cầu. Sử dụng lệnh `list` để xem các ứng dụng được hỗ trợ:

```shell script
mackup list
```

Và thêm vào file config như sau:

```
[applications_to_sync]
asciinema
bettertouchtool
fish
fisher
git
goland
macosx
mkcert
phpstorm
vscode
mackup
webstorm
```

Đối với các file riêng lẽ mà bạn muốn backup, ví dụ như những ứng dụng cli đặt file config ở thư mục home:

```
[configuration_files]
.gitconfig
```

sau khi config đầy đủ thì backup thôi:

```shell script
mackup backup
```

Sau khi chạy lệnh này thì chuyện gì xảy ra? Mackup sẽ:

```
cp ~/.gitconfig ~/Dropbox/Mackup/.gitconfig
rm ~/.gitconfig
ln -s ~/Dropbox/Mackup/.gitconfig ~/.gitconfig
```

### Restore application settings

Cài đặt mackup trên máy cần backup rồi chạy lệnh:

```
mackup restore
```

Sau khi chạy lệnh này thì chuyện gì xảy ra?  Mackup sẽ thực hiện các việc sau:

```
ln -s ~/Dropbox/Mackup/.gitconfig ~/.gitconfig
```

Giờ các file config đã được restore hệt như trên máy mà bạn đã backup. Tuỳ theo ứng dụng mà bạn sẽ phải khởi động lại nó hoặc không.

## Lời kết

Đồng bộ config giữa các máy thật là điều tiện lợi, vì khi làm việc với máy nào thì quen với config trên máy, đến lúc đổi máy lại phải thay đổi để thích nghi với config mới thì rất bất tiện, việc config bằng tay thì khỏi phải nói rồi.

Tuy nhiên đồng bộ cũng có cái dở của nó đó là không đồng bộ đầy đủ dependency. Ví dụ một application phụ thuộc vào một application khác, nhưng bạn lại không cài nó trong máy thì cũng không sử dụng được.

Một vấn đề nữa là mình xạo đấy, mình làm gì có nhiều mac đến thế.
