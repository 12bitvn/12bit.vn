---
title: Duyệt web với Vimium
date: 2020-09-20T21:54:00+07:00
draft: false
tags: 
- vim
- vimium
- chrome extension
authors:
- tatthien
---

Chào các bạn, đã lâu rồi mình không viết gì trên 12bit. Nhân tiện mình đang tìm hiểu Vim nên chia sẻ với các bạn một extension cho Chrome hoặc Firefox tên là **Vimium**.

Vậy Vimium thì có liên quan gì tới Vim? Chúng có liên quan đó! Vì đều có họ là **Vim**. Mình đùa thôi. Nếu bạn là developer thì ít nhất một lần trong đời đã nghe với Vim là một text editor.

Và việc sử dụng Vim không phải là điều dễ dàng với chúng ta. Ví dụ:

- Phím điều hướng là `hjkl`.
- Copy/paste không phải là `Command + V` / `Command + P` nữa.
- Muốn select all không đơn giả là `Command + A`.

Bài viết này không hướng dẫn bạn sử dụng Vim. Nhưng thay vào đó giúp bạn làm quen với các phím chức năng của Vim thông qua việc duyệt web sử dụng các phím chức năng tương tự. Với sự hỗ trợ của Vimium.


## Giới thiệu

Mình nghĩ câu giới thiệu của tác giả Vimium là rõ ràng và dễ hiểu nhất. 

> Vimium is a browser extension that provides keyboard-based navigation and control of the web in the spirit of the Vim editor.

## Cài đặt

Bạn có thể cài đặt Vimium cho Chrome hoặc FireFox thông qua:

- [Chrome web store](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)
- [Firefox Addons site](https://addons.mozilla.org/en-GB/firefox/addon/vimium-ff/)

## Hướng dẫn sử dụng

Sau khi cài đặt xong, bạn có thể gõ `?` để hiển thị hướng dẫn.

{{<zoom-img src="vimium-1.png" >}}

Như bạn đã thấy, Vimium sẽ hiện thị tất cả các phím mà bạn cần phải bấm để có thể thao tác trên trang.

Có một số quy ước về key mà bạn cần lưu ý khi sử dụng:

- `<c-*>` bạn cần bấm `Control/Ctrl` + một key nữa để thực hiện câu lệnh.
- `<a-*>` bạn cần bấm `Alt` + một key nữa để thực hiện câu lệnh.
- `H`, `h` in hoa và in thường sẽ thực hiện 2 lệnh khác nhau. Vì vậy bạn cần lưu ý gõ đúng. Ví dụ `H` thì bấm `Shift + H`.
- `gT` combo như vầy thì bấm `G + Shilft + T`

## Thao tác chung

**Scroll trang lên, xuống**

Tương tự trong Vim, bạn sẽ gõ `j` và `k` tương ứng với di chuyển lên và xuống.

{{<zoom-img src="vim-scroll.gif">}}

**Di chuyển về đầu trang và cuối trang**

Bạn gõ `gg` để di chuyển về đầu trang, và `G` để xuống cuối trang.

{{<zoom-img src="vim-top-bottom.gif">}}

## Thao tác với tab

Đối với tab, mình nghĩ có một vài case mà chúng ta thường hay sử dụng như: tạo tab, đóng tab hiện tại, switch tab.

**Tạo tab**

Bạn gõ `t`

{{<zoom-img src="vimium-tab-create.gif">}}

{{% alert info %}}
Mình dùng **[Gifox](https://gifox.io/)** để quay lại thao tác. Gifox có capture key mình sẽ gõ. Bạn có thể xem để biết mình đã gõ những gì nhé.
{{% /alert %}}

**Đóng tab**

Bạn gõ `x`

{{<zoom-img src="vimium-tab-close.gif">}}

**Di chuyển qua lại giữa các tab**

Bạn chỉ cần gõ `J` để di chuyển qua tab bên trái, và gõ `K` để di chuyển ngược lại.

{{<zoom-img src="vimium-tab-switch.gif">}}

Nếu không muốn di chuyển tab như vậy mà muốn chọn một tab bất kì, bạn có thể gõ `T` và nhập vào title để search tab mình muốn mở.

{{<zoom-img src="vimium-tab-pick.gif">}}

## Thao tác với history

Giả sử bạn đang đọc một bài viết và muốn quay lại trang chủ thì làm như thế nào? Thông thường chúng ta sẽ click vào ⬅️ go back trên trình duyệt.

Tuy nhiên với Vimium thì bạn chỉ đơn giản gõ `H` để ⬅️ go back và gõ `K` để ➡️ go forward.

{{<zoom-img src="vimium-history-move.gif">}}

> Như mình đã đề cập, bạn sẽ làm quen với các phím điều hướng của Vim qua việc sử dụng Vimium. Cụ thể `h` qua trái, `l` qua phải. `j`, `k` là lên xuống.

Để mở một history item. Bạn gõ `o` và dùng phím mũi tên đễ di chuyển nhé. Vì lúc này bạn đang input nên nếu gõ `j, k` thì không được.

## Thao tác với link

Đây là tính năng mình ưng ý nhất và sử dụng nhiều nhất. Bạn đang duyệt web, muốn truy câp vào một link nào đó trong khi tay vẫn đang bấm `j, k` và không muốn rời bàn phím để dùng chuột.

Bạn chỉ cần bấm `f`. Lúc này, những element nào có thể focusable (ví dụ: thẻ a, input, button) sẽ hiển thị shortcut. Bạn chỉ việc bấm đúng shortcut là xong.

> Bạn có thể gõ in thường hoặc in hoa. Nếu in hoa thì link sẽ được mở ở new tab.

{{<zoom-img src="vimium-link-search.gif">}}

{{<zoom-img src="vimium-link.gif">}}

## Tìm kiếm

Giống như trong Vim, để bắt đầu tìm kiếm, bạn cần gõ `/` và nhập chuỗi cần tìm.

{{<zoom-img src="vimium-search.png">}}

Nhưng mình thì quen dùng native search của browser hơn.

## Kết

Vimium đã giúp mình làm quen kha khá với việc sử dụng Vim. Nếu các bạn đang tìm hiểu Vim thì nên cài extension này. Tuy nhiên không phải trang web nào cũng dùng được Vimium.

Nếu bạn không muốn dùng những key mặc định trên thì vẫn có thể map key theo ý muốn. Chúc bạn vui vẻ với Vim!

