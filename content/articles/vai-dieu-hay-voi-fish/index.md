---
authors:
  - vominh
date: "2019-11-17T23:40:48+07:00"
description: Vài điều thú vị với Fish shell
draft: false
tags:
- fish shell
- ternimal
title: Vài điều thú vị với Fish shell
---

Gần đây mình mới chuyển qua sử dụng [Fish shell](http://fishshell.com/) thấy tâm trạng cũng vui nên nay chia sẻ một số điều mình làm với Fish Shell xem như cho có bài để viết.

## Cài đặt

Nhưng trước hết cần phải cài đặt nó trước:

Cài đặt trên MacOS

```
open https://fishshell.com
```

Rồi làm theo hướng dẫn tại trang này.

Hoặc

```
brew install fish
```

Đặt fish làm shell mặc định cho MacOS:

```
echo "/usr/local/bin/fish" | sudo tee -a /etc/shells
chsh -s `which fish`
```

Giờ có thêm xem những gì thú vị mà ta có thể làm nhé:

## Syntax highlighting

Như bạn thấy trong ảnh dưới đây, những command hoặc thư mục, file không tồn tại sẽ có màu đỏ:

![Syntax highlighting](/articles/vai-dieu-hay-voi-fish/images/fish-shell-1.gif)

## Tự gợi ý những lệnh đã  trong quá khứ

Khi bạn gõ lệnh, Fish sẽ cố gợi ý cho bạn bằng những lệnh mờ mờ phía sau, bấm tab hoặc mũi tên qua phải để sử , nếu bấm phím mũi tên hướng lên, thì fish sẽ search những command trong quá khứ:

![](/articles/vai-dieu-hay-voi-fish/images/fish-shell-2.gif)

### Gợi ý các target trong Makefile

![Syntax highlighting](/articles/vai-dieu-hay-voi-fish/images/fish-shell-6.gif)

### Gợi ý các script trong package.json

![Syntax highlighting](/articles/vai-dieu-hay-voi-fish/images/fish-shell-7.gif)

## Wildcard

À há, kiểm tra git status của các thư mục con trong project dễ hơn bao giờ hết:

![](/articles/vai-dieu-hay-voi-fish/images/fish-shell-3.gif)

## Function chuyển đổi video thành gif

Bạn cần cài đặt `ffmpeg` và `gifsicle` trước. Sau đó tạo file `~/.config/fish/functions/video-to-gif.fish`:

```
#https://gist.github.com/dergachev/4627207
function video-to-gif --description 'Convert mov to '
   if test (count $argv) -lt 1
       echo "video name is required"
       return
   end
   set -l out (string replace -r "\.mov\$" "\.gif" $argv[1])
   # -r : frame rate
   ffmpeg -i $argv[1] -vf scale=w=1000:h=1000:force_original_aspect_ratio=decrease -pix_fmt rgb24 -r 10 -f gif - | gifsicle --optimize=3 --loop --delay=3 > $out
end
```

Tận hướng thành quả:

```
video-to-gif my-meme.mov
```

output sẽ nằm trong file `my-meme.gif`

## Thông báo khi một command thực thi xong

Có nhiều command cần nhiều thời gian để thực thi, ví dụ như build hay deploy, chúng ta cũng chả muốn ngồi đợi lại gì, thay vào đó ai cũng muốn mở Youtube, Netflix lên xem, thay vì quay lại kiểm tra terminal định kỳ, bạn có thể bảo terminal "Kêu tao khi xong việc nhé":

```
sleep 2s; say done
```

Hoặc có thể thông báo ở notification:

```
fisher add franciscolourenco/done
brew install terminal-notifier
```

Chạy thử nhé:

```
sleep 2s
```

Bạn có thể thay đổi một số tùy chỉnh trong file `~/.config/fish/config.fish` theo hướng dẫn [tại đây](https://github.com/franciscolourenco/done).

![](/articles/vai-dieu-hay-voi-fish/images/fish-shell-5.gif)
