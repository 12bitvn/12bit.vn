---
authors:
  - vominh
date: "2019-10-07T14:08:04+07:00"
draft: false
images:
- https://12bit.vn/articles/hay-quen-dock-di/images/0.jpg
tags:
- productivity
- macOS
- better touch tool
- macro
title: Hãy quên dock đi
---

Ngày xưa, có một developer nghèo (nghèo lắm), dành dụm rất lâu mới đủ tiền mua một cái Macbook Pro 13", màn hình nhỏ nên làm việc cũng khó, nhưng anh cũng tự nhủ lòng rằng âu thì đây cũng là động lực để bản thân cố gắng hơn nữa, anh developer nghèo (nghèo lắm) đành đặt chế độ auto hide cho dock để tiết kiệm diện tích. Nhưng hỡi ôi, mỗi lần muốn chuyển app thì phải hover chuột vào cạnh màn hình rồi đợi hai ba giây, đau đớn nhất là nếu đang ở app ở chế độ fullscreen thì dock có lúc hiện lúc không mà thường là không. Một ngày mùa hè nọ, khi ngoài trời thì oi bức, máy lạnh thì chỉ có thể mở 26 độ, cái sự kiên nhẫn vốn đã thiếu thốn nay lại bốc hơi mất mấy phần. Anh ngước mặt lên trời mà gào to: "Không lẽ cả đời này con phải sử dụng dock hay sao? (thực ra có mac dùng là tốt rồi)"

Rồi sự lương thiện ở sâu thăm thẳm trong tâm hồn quay trở lại khi anh chợt nhận ra rằng mình có thể sử dụng touch bar để chuyển đổi app. Nhưng hỡi ôi, trước mặt anh là cái bàn phím ASUS ROG Claymore Aura RGB Cherry MX Red, tay anh thì lại không phải loại tay đám dỗ, nên không hơi đâu mà với tới. Anh cuối mặt vào cái bàn phím không lấy gì làm xịn đó, nước mắt rơi, hai dòng lệ ấm chảy tràn vào từng phím một, ướt hết cả numpad, lúc này anh mới nhận ra rằng suốt đời này anh cũng không bao giờ có số tiền lớn đến nỗi phải dùng đến numpad để tính toán. Thế là anh quyết định map các key của numpad với BetterTouchTool để chuyển app. Vậy thôi đó.

Drama một chút cho bắt kịp trend thôi, chứ mình không có hút chích đâu, các bạn đừng hiểu lầm. Thực ra thì giải pháp cũng đơn giản lắm. Mình sử dụng BetterTouchTool để map các phím trên numpad và các file function (F1, F2, F3, ...) với một đoạn script nào đó nhằm active hoặc open một ứng dụng nào đó. Ở đây mình có danh sách các ứng dụng mà mình thường xuyên dùng đến: PhpStorn, Goland, iTerm 2, Mongodb Compass, Chrome, Clipboard, Snippet, Zalo, Slack, Facebook (ahihi).

Better Touch Tool là ứng dụng dùng để custom các input device trên mac.

{{<figure src="/articles/hay-quen-dock-di/images/1.png" title="Better Touch Tool">}}

## Setup keyboard shortcut

{{<figure src="/articles/hay-quen-dock-di/images/3.png" title="Better Touch Tool">}}

Sau khi làm như trong hình, thì BetterTouchTool đã có thể bắt đự sự kiện khi bạn ấn vào phím. Giờ để trigget một action nào đó thì bạn làm như sau:

{{<figure src="/articles/hay-quen-dock-di/images/4.png" title="Better Touch Tool">}}

Có khá nhiều action để bạn chọn, nhưng ở đây mình chủ yếu chỉ làm hai chuyện là active một cửa sổ ứng dụng , và active một tab trên chrome.

Để active một app thì bạn sử dụng applescript sau:

```
activate application "MongoDB Compass Community"
```

Thay `MongoDB Compass Community` bằng tên của app mà bạn muốn active, đây là tên của app trong thư mục Applications.

Đối với active một tab trong chrome thì hơi phức tạp hơn một chút. Đầu tiên bạn cần tạo file `open_url.applescript` ở đâu đó, mình thì tập hợp các script trong thư mục `~/scripts` vì vậy mình sẽ tạo file `~/scripts/open_url.applescript` với nội dung như sau:

```
on run {targetUrl}
    tell application "Google Chrome"
        activate

        set theUrl to my remove_http(targetUrl)

        if (count every window) = 0 then
            make new window
        end if

        set found to false
        set theTabIndex to -1
        repeat with theWindow in every window
            set theTabIndex to 0
            repeat with theTab in every tab of theWindow
                set theTabIndex to theTabIndex + 1
                set theTabUrl to my remove_http(theTab's URL as string)
                if (theTabUrl contains theUrl) then
                    set found to true
                    exit repeat
                end if

            end repeat

            if found then
                exit repeat
            end if
        end repeat

        if found then
            set theWindow's active tab index to theTabIndex
            set index of theWindow to 1
        else
            tell window 1 to make new tab with properties {URL:targetUrl}
        end if
    end tell
end run

on remove_http(input_url)
    if (input_url contains "https://") then
         return trim_line(input_url, "https://")
    else
         return trim_line(input_url, "http://")
    end if
    return input_url
end remove_http

on trim_line(this_text, trim_chars)
    set x to the length of the trim_chars
    -- TRIM BEGINNING
    repeat while this_text begins with the trim_chars
        try
            set this_text to characters (x + 1) thru -1 of this_text as string
        on error
            -- the text contains nothing but the trim characters
            return ""
        end try
    end repeat
    return this_text
end trim_line
```

Giờ cũng tạo một trigger giống như ở bước trước đó, nhưng thay vì chọn applescript, bạn chọn execute terminal command:

```
osascript ~/scripts/open_url.applescript "https://facebook.com"
```

Giờ khi bạn ấn phím thì đoạn script sẽ tìm xem có tab nào đang mở facebook.com hay không, nếu có thì active, nếu không có thì mở tab mới.

Giờ hãy map tất cả các phím trên numpad rồi cắt giấy dán lên từng phím để mà biết để bấm nhé:

![](/articles/hay-quen-dock-di/images/0.jpg)

## Cũng như vậy, nhưng nếu bạn giàu hơn

Nếu bạn không phải là một developer nghèo (nghèo lắm), bạn có thể mua một cái launchpad, sau đó match mọi thứ mà bạn có, từ app cho đến snippet ... cho đến khi bạn không còn nhớ phím nào để mà bấm nữa, vì launchpad có đến 96 phím.

![](/articles/hay-quen-dock-di/images/launchpad.webp)

Những khi rảnh rỗi, bạn có thể học remix một bài hát nào đó, mà sếp thì không thể biết được rằng bạn đang giải trí hay đang làm việc.
