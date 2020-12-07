---
title: 'iTerm2: Trigger'
authors:
  - vominh
date: '2020-11-24T09:33:47+07:00'
draft: false
images:
  - /articles/iterm2-trigger/images/thumbnail.png
tags:
  - iterm2
---

## Giới thiệu về Trigger

Trigger là một action được thực hiện mỗi khi text từ terminal của session hiện tại match với regex tương ứng.

Cú pháp regex tuân theo các quy tắc của [ICU regular expressions](http://userguide.icu-project.org/strings/regexp).

## Cách Trigger hoạt động

Trước khi text (bao gồm cả [BEL control code](https://en.wikipedia.org/wiki/Bell_character)) được in ra màn hình thì đều được gửi qua một regular expression matcher để xử lý. Trong một thời điểm sẽ chỉ có một line được xử lý. Nếu line quá dài thì nó sẽ bị wrap và chỉ 3 dòng cuối cùng được xử lý. Việc này nằm đảm bảo performance. Bạn có thể tăng hoặc giảm số dòng này trong mục cài đặt "Advanced Preferences > Number of screen lines to match against trigger regular expressions."

## Các loại action

iTerm2 trigger một số action như sau:

1. Annotate: Thêm một đoạn ghi chú vào matched text
1. Bounce Dock Icon: Rung biểu tượng cái chuông trên dock cho đến khi iTerm được active.
1. Capture Output: Lưu nội dung vào [Capture Output](https://iterm2.com/documentation-captured-output.html).
1. Highlight Text: Highlight text
1. Invoke Script Function: Chạy một [script function](https://iterm2.com/documentation-scripting-fundamentals.html)
1. Make Hyperlink: Tạo link từ matched text
1. Open Password Manager: Mở phần mềm quản lý mật khẩu.
1. Post Notification: Post notification lên Notification Center.
1. Prompt Detected: Báo cho iTerm2 biết rằng shell prompt bắt đầu tại vị trí match.
1. Report Directory: Báo cho iTerm2 biết bạn đang ở thư mục nào.
1. Report User & Host: Báo cho iTerm2 biết bạn đang sử dụng user và host nào.
1. Ring Bell: Rung chuông mặc định của hệ thống.
1. Run Command: Chạy một command.
1. Run Coprocess: Chạy một [Coprocess](https://iterm2.com/documentation-coprocesses.html)
1. Run Silent Coprocess: Chạy một coprocess nhưng không hiển thị output.
1. Send Text: Gửi text vào terminal dưới dạng user input.
1. Set Mark: Tạo một đánh dấu.
1. Set Title: Đặt title cho session
1. Show Alert: Hiển thị một alert box.
1. Stop Processing Triggers: Action này sẽ ngưng quá trình process trigger, mọi trigger phía sau nó sẽ không được chạy.

## Một số ứng dụng của Trigger

Từ khác nhiều loại action phía trên, chung ta có thể hình dung ra nhiều ứng dụng có thể giúp cho việc sử dụng iTerm2 thêm phần tiện lợi. Đưới dây là một số ứng dụng mà mình đang áp dụng trong công việc hằng ngày.

### Link tới Xray

Tip này hữu ích khi làm việc với AWS Cloudwatch và Xray. Khi xem log của Cloudwatch trong iTerm thì sẽ thấy nội dung như sau:?

```
START RequestId: qwe1234asdf-41fb-4fe6-88fa-23435erwfsdf324re Version: $LATEST
END RequestId: qwe1234asdf-41fb-4fe6-88fa-23435erwfsdf324re
REPORT RequestId: qwe1234asdf-41fb-4fe6-88fa-23435erwfsdf324re	Duration: 1.17 ms	Billed Duration: 100 ms	Memory Size: 1024 MB	Max Memory Used: 34 MB	Init Duration: 65.78 ms
XRAY TraceId: 1-24dfasdf-435dfxzcvasdfqwer	SegmentId: f234sdfasdf	Sampled: true
```

Để xem được xray này ta sẽ phải sử dụng TraceId để nhập vào UI của AWS Dashboard. Nhưng mình muốn click vào ID này để đi tới trang dashboard luôn cho tiện. Vậy thì add một trigger như sau:

**Regular Expression**: `XRAY TraceId: (1-[a-z0-9\-]*)`

**Action**: Make Hyperlink

**Parameters**: `https://ap-southeast-1.console.aws.amazon.com/xray/home?region=ap-southeast-1#/traces/\1`

Mình sử dụng region ở Singapore nên url sẽ có `ap-southeast-1`, hãy thay nó bằng region phù hợp với bạn.

Giờ khi xem log của CloudWatch bạn sẽ thấy bất cứ khi nào dòng chữ `XRAY TraceId: ...` hiện ra thì đều sẽ trở thành hyperlink, click vào thì bạn sẽ được dẫn đến trang details.

### Highlight error

Cũng vẫn là log của CloudWatch như trên, nhưng nếu nó chứa thông báo lỗi thì mình muốn nó được highlight lên cho dễ mình. Trong trường hợp của mình thì chuỗi `"level":"error"` chính là dấu hiệu của lỗi. Nên mình tạo action như sau:

**Regular Expression**: `"level":"error"`

**Action**: Highlight Text

**Parameters**: Text: whilte, background: red
