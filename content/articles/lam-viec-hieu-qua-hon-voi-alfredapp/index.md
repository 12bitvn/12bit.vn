---
title: "Làm việc hiệu quả hơn với Alfred"
date: 2018-09-30T10:48:18+07:00
tags: 
  - productivity
  - alfredapp
images:
  - /articles/lam-viec-hieu-qua-hon-voi-alfredapp/images/1_zHs2UXc0IPtyBwFMhTaucQ.png
authors:
  - vominh
draft: false
---

Ngày hôm nay mình sẽ không nói về những ưu điểm của Mac trong việc lập trình, mà sẽ chỉ giới thiệu về cách mà mình sử dụng ứng dụng Alfred để làm việc hiệu quả hơn, thao tác với máy nhanh hơn mà thôi.

## Alfred

[Alfred](https://www.alfredapp.com/) là ứng dụng chỉ có trên Mac, giúp chúng ta thực hiện rất nhiều thao tác như xem lịch sử clipboard, search web, dịch, tính toán hoặc thậm chí là deploy code. Nó cũng gần giống như spotlight, nhưng cho phép bạn custom nhiều chức năng hơn.

Alfred có gói miễn phí và thu phí, với gói miễn phí bạn không làm được gì nhiều, tương đương với spotlight mà thôi, bạn phải mua powerpack để có thể sử dụng được các workflow, đây mới là thứ đáng giá nhất của application này.

Workflow sẽ giúp bạn làm một tác vụ nào đó tự động, giống như task runner vậy, ví dụ như gọi API và trả về kết quả, progress clipboard, gọi các lệnh hệ thống hoặc run script ở một ngôn ngữ nào đó.

Bạn có thể làm tất cả những điều này với command line, nhưng Alfred hỗ trợ bạn giao diện người dùng thân thiện, gợi ý các từ khóa, ... Và quan trọng là bạn không cần phải viết lại tất cả mọi thứ như input, output, notification, progress clipboard, bạn chỉ cần xử lý input để trả về output, Alfred sẽ xử lý phần còn lại.

Dưới đây là các cách mà mình đang áp dụng.

## Focus nhanh chóng các cứng dụng thường dùng

Mình mở nhiều ứng dụng cùng lúc, và nhiều khi cần di chuyển qua lại giữa các ứng dụng thường dùng như PhpStorm, Chrome, Slack. Mỗi lần muốn chuyển qua lại giữa các ứng dụng này thì phải dùng Application Switcher (CMD + Tab) hoặc sử dụng mission Control. Khá là mất thời gian.

Tuy nhiên, để focus một ứng dụng nào đó, có thể sử dụng oascript sau trong bash:

```
tell application "Slack"
  activate
end tell
```

Ta có thể tạo một workflow, với trigger là hotkey, link nó với một "Run script" và đặt đoạn script phía trên vào

Bạn có thể tải workflow của mình tại đây: [Quick Application Switcher](https://github.com/nguyenvanduocit/alfredapp-workflows/raw/master/Quick%20App%20Switcher.alfredworkflow).

## Rút gọn URL

Chỉ cần chép url vào clipboard sau đó gọi workflow bitly, url sẽ được rút gọn, sau đó được tự động chép vào clipboard.

Cài workflow này bằng lệnh:

``` 
npm install --global alfred-bitly
```

## Mở Project nhanh chóng

Thay vì mở PhpStorm lên, xong rồi open project, thì bạn có thể gõ tên của project trong Alfred, và PhpStorm sẽ tự động mở project đó. Workflow này hoạt động với tất cả IDE của jetBrain.

Tải workflow tại: [jetbrains-alfred-workflow](https://github.com/bchatard/jetbrains-alfred-workflow).

## Mở repo trên GitLab

Cũng tương tự như workflow phía trên, workflow alfred-gitlab cho phép bạn search repo của bạn trên GitLab và tự động mở nó bằng trình duyệt:

Tải workflow tại: [alfred-gitlab](https://github.com/lukewaite/alfred-gitlab).

## Translate nhanh chóng

Mình rất thường phải translate một cái gì đó, trước đây thì mình sẽ mở Google Translate để sẵn, nhưng giờ thì chỉ cần gõ trực tiếp vào Alfred là được.

{{<zoom-img src="https://cdn-images-1.medium.com/max/1000/1*qefBCFgjCzNw6Z54AQZ3kQ.png">}}

Cài đặt workflow bằng cách:

```
npm install --global alfred-polyglot
```

## Snippet

Giống như tính năng gõ tắt của các bộ gõ, khi bạn gõ đúng keyword vào input/editor thì nội dung snippet sẽ được thay thế vào vị trí của keyword đó.

Ví dụ: Mình làm việc với Golang và rất hay cần phải gõ hàm main, giờ mình có thể tạo một snippet có keyword là `fnmain` với nội dung là code của hàm main mà mình thường dùng. Giờ khi gõ vào editor dòng `fnmain` thì Alfred sẽ tự động thay thế keyword đó thành nội dung mà mình đã đặt trước.

## Mở issue nhanh chóng

Có một vấn đề trong team, đó là khi trao đổi về issue nào đó, thì mọi người không gửi nguyên link của issue (link trên Redmine hoặc Jira) mà chỉ nói tên của issue, muốn đọc nội dung thì sẽ phải tự lên Jira search issue, nhưng Alfred có thể giúp.

Có nhiều cách để làm, trong trường hợp này mình sẽ sử dụng chức năng Web Search.

Bạn truy cập vào Alfred Preference > Features > Web Search:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1000/1*UlJzCp1bRLsrrNuO8X0Mqg.png">}}

## Web Search

Click vào "Add Custom Search" và nhập vào như sau:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1000/1*8GWZ6yehVNvqJ8bt7SbCBA.png">}}

Giờ mở Alfred lên và nhập vào 12bit kèm theo tên của từ khó bạn cần, thì nó sẽ tự mở browser với link như format ở input "Search URL"

## Lời kết

Sẽ có rất nhiều trường hợp mà bạn cần một Workflow mà chưa ai có, ví dụ như mình cần tìm một từ vui vui nào đó để thể hiện sự đồng ý hoặc không đồng ý nhưng chưa có ai làm việc đó chả, vì vậy mình đã tự viết và đặt tên nó là alfred-cool. Bạn có thể tải bằng lệnh:

```
npm install --global alfred-cool
```

Viết workflow không khó, giống như viết app cli bình thường với input và đầu ra là một chuỗi json, bạn có thể viết bằng bất cứ ngôn ngữ nào.
