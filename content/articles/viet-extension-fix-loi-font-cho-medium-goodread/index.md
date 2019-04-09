---
authors:
  - vominh
date: "2018-06-25T06:14:44+07:00"
description: A short description for the post.
draft: false
images:
- /articles/viet-extension-fix-loi-font-cho-medium-goodread/images/thumbnail.png
tags:
- Chrome Extension
title: Viết Chrome Extension fix lỗi font cho Medium
---

Font trên web của Medium không hỗ trợ tiếng Việt, nên các bài viết của 12bit.vn khá khó đọc. Bạn cần phải cài extension của tụi mình thì mới có thể đọc được tốt.

Nội dung của bài này không có gì nhiều cả. Chỉ là giới thiệu về về một giải pháp mà mình đã sử dụng, khi bạn cần vấn đề gì tương tự thì cũng dễ tìm hiểu.

Đây là kết quả:

1. Dành cho Chrome: [Vietnamese Fonts](https://chrome.google.com/webstore/detail/vietnamese-fonts/kgobddnnjblfgabopmdcdloiaajmpgha)
1. Dành cho Firefox: [Vietnamese Fonts](https://addons.mozilla.org/en-US/firefox/addon/vietnamese-fonts/)

## Mã nguồn

Đây là mã nguồn của extension: [Github](https://github.com/nguyenvanduocit/vietnamese-fonts)

## Lỗi font

Lỗi font là do trong font của Medium không hỗ trợ các ký tự tiếng Việt. Để fix thì mình sẽ thay luôn font của họ thành một font khác.

Để làm được như vậy thì chúng ta cần phải chặn file font của họ và thay thế bằng file font của chúng ta nhưng vẫn phải giữ lại tên font-family của họ, vì trong code css họ dùng tên đó.

## Chọn font

Trươc tiên chúng ta cần chọn font phù hợp. Có nhiều tham số trong font để xác định xem hai font có tương đồng nhau hay không, mình không rành về font, chỉ dựa vào cảm quan để chọn, ở đây mình sẽ chọn font sao cho ở cùng một font-size, chiều rộng của nét, khoản cách giữa các dòng, các từ và các ký tự vẫn giống nhau. Mình cảm thấy font [Alegreya Sans](https://fonts.google.com/specimen/Alegreya+Sans) là thích hợp nhất.

Bạn chọn file font ở fonts.google.com, sau đó nó sẽ cho bạn một url của file css, bạn mở file đó, lấy nội dung, và thay font-family của nó bằng font-family của Medium.

Vì code khá dài, nên bạn xem tại đây: [medium.css](https://github.com/nguyenvanduocit/vietnamese-fonts/blob/master/assets/css/medium.css).

## Viết Extension

Để biết cách viết một extension, bạn có thể tham khảo hai link sau đây:

1. [Chrome Extension](https://developer.chrome.com/extensions/extension)
1. [Firefox Extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/extension)

Chrome và Firefox hỗ trợ extension, cung cấp API gần giống nhau.

Bạn cần tạo thư mục chưa project, trong đó có mọi file cần thiết. Đầu tiên sẽ là file manifest.json:

![](/articles/viet-extension-fix-loi-font-cho-medium-goodread/images/thumbnail.png)

Chúng ta sẽ dùng API `webRequest` và `webRequestBlocking` để chặn file font của Medium, và thay bằng file của chúng ta trong thư mục `assets/css`, nên cần phải khai báo nó trong permissions và `web_accessible_resources`. Cần làm như vậy vì chrome không cho phép website truy cập vào các file trong extension trừ khi bạn khai báo nó.

Bạn có thể tham khảo link sau đây: [chrome.webRequest](https://developer.chrome.com/extensions/webRequest)

File background.js sẽ chạy ở background và xử lý các request.

![](/articles/viet-extension-fix-loi-font-cho-medium-goodread/images/background.png)

Ở đây mình handle hai file, vì extension này còn hỗ trợ fix lỗi font cho goodread.com nữa.

Array fileMap là map với key là tên file bị thay thế và value là path để file đã fix lỗi font.

chrome cung cấp API dưới object `chrome` còn Firefox thì dùng object `browser`.

Tham khảo link sau đây: [Porting a Google Chrome extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Porting_a_Google_Chrome_extension)

Chúng ta listen sự kiện sẽ chạy trước khi browser gửi request tới server và thay đổi URL của resource mà browser muốn request thành file mà mình đã fix lỗi font.

## Test extension

### Chrome

Chrome cho phép bạn load thư mục như là một extension:

1. Mở trang [Extension Management](about:invalid#zSoyz).
2. Enable Developer mode.
3. Click vào nút: LOAD UNPACKED
4. Chọn thư mục chứa extension

![](/articles/viet-extension-fix-loi-font-cho-medium-goodread/images/load-chrome-extension.png)

### Firefox

1.  Mở trang [debugging](about:invalid#zSoyz).
2.  Click vào nút: Load Temporary Add-on
3.  Chọn thư mục chứa extension

## Đóng gói và xuất bản

Đối với Chrome bạn có thể tham khảo tại đây: [Public In The Chrome Web Store.](https://developer.chrome.com/webstore/publish)

Còn đây là với Firefox: [Submit addon](https://addons.mozilla.org/vi/developers/addon/submit/agreement)

## Kết

Đây chỉ là một bài nho nhỏ nhằm giới thiệu về extension để fix lỗi tiếng Việt, giúp các bạn đọc bài dễ hơn, và cũng chia sẻ một chút kiến thức, kiểu như today I learned thôi.
