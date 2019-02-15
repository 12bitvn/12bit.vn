---
title: "Tạo hiệu ứng cho URL bằng JavaScript"
description: A short description for the post.
date: 2019-02-15T10:19:23+07:00
tags: 
  - JavaScript
  - Animation
images:
  - /img/articles/default-thumb-1200-630.png
author:
    name: vominh
    github: vominh
draft: false
---

Bài viết này tham khảo từ bài [Animating URLs with Javascript and Emojis](http://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis) của bạn [Matthew Rayfield](http://matthewrayfield.com). Blog của bạn này khá là dị và tất nhiên là ý tưởng trong bài viết này cũng dị không kém.

Trong URL có một thành phần là hash, thường dùng để tự cuộn viewport tới một vị trí nào đó trong page, hoặc dùng trong single page app (SPA). Khi hash thay đổi không dẫn tới việc trình duyệt reload page.

Với đặt tính của hash như vậy, Matthew có ý tưởng là sẽ liên tục thay đổi hash bằng emoji hoặc các ký tự đặt biệt trong bản mã unicode để tạo thành hiệu ứng trên thanh địa chỉ:

![](/articles/tao-hieu-ung-cho-url-bang-javascript/img/babies2.gif)

## Emoji

Cái thú vị là có khá nhiều emoji thể hiện các trạng thái liên tiếp của một đối tượng nào đó, ví dụ như:

* Mặt trăng: 🌑 🌒 🌓 🌔 🌝 🌖 🌗 🌘
* Trái đât: 🌎🌍🌏
* Đồng hồ: 🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧
* Ổ khóa: 🔒🔓

Hoặc cũng có thể sử dụng các ký tự unicode:

![](/articles/tao-hieu-ung-cho-url-bang-javascript/img/box-characters.png)

## Loop

Giống như cách phim được tạo ra, chúng ta cho các emoji này thay thế nhau trong một khoản delay nhất định sẽ tạo ra hiệu ứng. Ví dụ như:

![](/articles/tao-hieu-ung-cho-url-bang-javascript/img/moon.gif)

Hoặc các ký tự unicode:

![](/articles/tao-hieu-ung-cho-url-bang-javascript/img/wavy.gif)

## Code

Ý tưởng thì khá độc đáo nhưng cách làm thì khá đơn giản nên cũng không biết phải đặt heading sao cho phù hợp. Bạn có một array các emoji, bạn loop trong array này và set hash cho `location.hash`. 

### Mặt trăng

```js
const applyMoon = document.getElementById('apply-moon');
const moons = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘'];
let currentIndex = 0;
function loop() {
    location.hash = moons[currentIndex % moons.length];
    currentIndex++;
    if (currentIndex >= moons.length) {
      currentIndex = 0; 
    }
    if (applyMoon.checked) {
      setTimeout(loop, 100);
    }
}
applyMoon.addEventListener("change", (event) => {
  if (event.target.checked) {
    loop();
  }
});
```
{{% alert success %}}
<label><input id="apply-moon" type="checkbox"> Check vào đây để thấy mặt trăng</label>
{{% /alert %}}

<script>
const applyMoon = document.getElementById('apply-moon');
const moons = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘'];
let currentMoonIndex = 0;
function loopMoon() {
    location.hash = moons[currentMoonIndex % moons.length];
    currentMoonIndex++;
    if (currentMoonIndex >= moons.length) {
      currentMoonIndex = 0; 
    }
    if (applyMoon.checked) {
      setTimeout(loopMoon, 100);
    }
}
applyMoon.addEventListener("change", (event) => {
  if (event.target.checked) {
    loopMoon();
  }
});
</script>

### Đồng hồ

```js
var clocks = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];
function loop() {
    location.hash = f[Math.floor((Date.now()/100)%f.length)];
    setTimeout(loop, 50);
}
loop();
```
{{% alert success %}}
<label><input id="apply-clock" type="checkbox"> Check vào đây để thấy mặt trăng</label>
{{% /alert %}}

<script>
const applyClock = document.getElementById('apply-clock');
const clocks = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];
let currentClockIndex = 0;
function loopClock() {
    location.hash = clocks[currentClockIndex % clocks.length];
    currentClockIndex++;
    if (currentClockIndex >= clocks.length) {
      currentIndex = 0; 
    }
    if (applyClock.checked) {
      setTimeout(loopClock, 100);
    }
}
applyClock.addEventListener("change", (event) => {
  if (event.target.checked) {
    loopClock();
  }
});
</script>

## Lời kết

Ngoài ra còn nhiều hiệu ứng khác thú vị hơn. Đặt biệt là ứng dụng hiển thị thanh playback của video.

![](/articles/tao-hieu-ung-cho-url-bang-javascript/img/video-progress.gif)

Bạn có thể xem thêm các ý tưởng rất thú vị này tại chính blog của Matthew: [Animating URLs with Javascript and Emojis](http://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis)
 
 Dù các hiệu ứng này thú vị và mới lạ, nhưng tính thực tế có lẽ không cao, vì nếu URL dài hoặc kích thước màn hình nhỏ thì thanh địa chỉ không thể được nhìn thấy, trên nhiều browser và trên mobile thì thanh address này còn bị ẩn đi.
 
 Nhưng nếu 
