---
authors:
  - tatthien
date: "2018-03-07T17:22:17+07:00"
description: Phần 1 hướng tới các bạn đang vận hành những site sử dụng WordPress và
  không bắt buộc phải có kỹ năng về lập trình.
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*G-yRIqhUzxT3dwMqa2N_aA.jpeg
tags:
- wordpress
- speed
- performance
title: Tối ưu tốc độ cho site WordPress - Phần 1
---

Đây là phần tiếp theo trong loạt bài bảo mật và tăng tốc cho site WordPress, dự kiến cũng sẽ là một trong những chủ đề của [Saigon WordPress Meetup #23](https://www.meetup.com/Saigon-WordPress/events/248725158/).

Phần 1 hướng tới các bạn đang vận hành những site sử dụng WordPress và **không bắt buộc** phải có kỹ năng về lập trình.

Các bạn có thể xem phần trước về Tăng cường bảo mật cho site WordPress.

## Tại sao website lại cần phải nhanh?

{{<figure src="https://cdn-images-1.medium.com/max/800/1*E1oX91VhSat7P1T22-fXPA.jpeg" title="Nguồn: Unsplash">}}

Khi tạo ra một website, bạn luôn mong muốn có được sự ghé thăm của người dùng. Nếu một website chạy quá chậm, người dùng có thể bỏ đi sang một nơi khác cũng cùng nội dung nhưng tốc độ nhanh hơn, tạo trải nghiệm tốt hơn.

Đối với mình, một website chạy chậm ảnh hưởng tới 2 vấn đề chính:

1. SEO
2. Trải nghiệm người dùng.

## Kiểm tra hiệu năng của website

{{<figure src="https://cdn-images-1.medium.com/max/800/1*eQxZheZRAbFieGGmfgAxww.png" title="Kết quả kiểm tra tốc độ website từ tools.pingdom.com">}}

Để tối ưu được website, bạn phải xác định được nguyên nhân vì sao website của mình lại chậm. Dưới đây sẽ là 2 công cụ được nhiều người sử dụng để kiểm tra tốc độ cho website:

1. [Tools Pingdom](https://tools.pingdom.com/)
2. [Google PageSpead Insights](https://developers.google.com/speed/pagespeed/insights)

Hai công cụ này có thể chỉ cho bạn thấy được tốc độ load một trang trên website của bạn là bao lâu, có bao nhiêu requests, page size, .v.v.. Và cũng sẽ có những gợi ý cho bạn để cải thiện tốc độ load trang hơn.

Tuy nhiên, hai công cụ trên chưa phải là tất cả và cũng không thể đánh giá, phân tích được hết các nguyên nhân dẫn đến website của bạn bị chậm. Vì ngoài ra còn những lí do khác như plugins, themes, code sẽ được nói đến sau.

## Tối ưu những gì?

Website của chúng ta chạy trên nền tảng WordPress vì vậy thứ cần được tối ưu đầu tiên nên là WordPress, tiếp theo sẽ đến những phần liên quan đến server nơi lưu trữ website của bạn.

## Tối ưu những phần liên quan đến WordPress

Việc tối ưu những phần này có thể liên quan đến: plugins, themes, caching, database, .v.v..

### Plugins

Hãy gỡ bỏ những plugins không thật sự cần thiết, vì mỗi plugin khi được cài vào WordPress thường sẽ chèn thêm scripts, styles khiến website của bạn phải load thêm chúng, thậm chí là tác động đến các câu query. Vì vậy bạn hãy rà lại danh sách plugin đang được cài đặt và gỡ bỏ những plugin không cần thiết.

Gỡ bỏ những plugin không cần thiết không chỉ giúp tối ưu tốc độ, nhưng còn giảm được nguy cơ bị tấn công.

Hãy khôn khéo chọn plugin phù hợp, Đừng chọn một plugin cồng kềnh nếu bạn chỉ muốn dùng một tính năng nhỏ của nó.

### Themes

Mình thật sự rất ghét những trang nào sử dụng page builder. Nó sinh ra hàng loạt elements không cần thiết.

Bạn hãy cân nhắc sử dụng page builder chỉ khi bạn không thể tự code được giao diện cho site và không thể chọn được một theme phù hợp.

Những theme multi-purpose được thiết kế để phục vụ cho nhiều mục đích khác nhau, vì vậy code cũng thường khá rườm, bạn chỉ nên chọn theme này nếu bạn không thể chọn được các theme single-purpose nào khác.

Nhưng site về tin tức, blog thì hãy đơn giản hóa, hạn chế load quá nhiều hình ảnh cùng lúc trên một trang. Những phần hình ảnh nào có thể thay thế bằng text thì hãy thay thế.

### Javascript/CSS

Việc tối ưu js, css có rất nhiều thứ cần làm. Nhưng mình sẽ nói 2 phần chính ở dưới. Có thể mình sẽ viết bài về tối ưu js, css riêng.

### Minify js, css

WordPress cung cấp rất nhiều plugin hỗ trợ việc minify js và css. Bạn có thể sử dụng những plugin có lượt download nhiều và rating cao ví dụ như [Autoptimize](https://wordpress.org/plugins/autoptimize/)

Đối với các bạn lập trình viên, có thể dùng task runner như Gulp, Grunt, Webpack để tạo một bản minify cho js, css bên cạnh bản full. Và cho phép người dùng switch qua lại. Ví dụ như `main.js` và `main.min.js`

Cũng lưu ý là minify dễ dẫn tới lỗi. Nếu minify mà thấy site bị lỗi thì nên tắt nó đi.

### Chỉ load js, css khi cần thiết

Trong một trang sẽ có js, css global có nghĩa là nó sẽ tác động để toàn bộ website. Những file js, css đó thì trang nào cũng phải load.

Tuy nhiên có những trang đặc biệt cần js, css mà những trang khác không cần thì chúng ta chỉ load cho những trang đặc biệt đó thôi.

Về kỹ thuật cho việc này mình xin có một bài riêng dành cho developers.

### Hình ảnh

Giảm dung lượng ảnh cũng sẽ giúp cải thiện rất nhiều việc tăng tốc cho site. Bạn có thể dùng những plugins sau để nén ảnh đã được upload lên site WordPress:

- [WP Smushit](https://wordpress.org/plugins/wp-smushit/)
- [EWWW Image Optimizer](https://wordpress.org/plugins/ewww-image-optimizer/)
- [Kraken.io Image Optimizer](https://wordpress.org/plugins/kraken-image-optimizer/)

Hoặc bạn cũng có thể nén ảnh trước khi upload lên WordPress.

Ngoài ra thì lazy load cũng khá hữu dụng, nó không buộc người dùng phải load những hình ảnh nằm ngoài khung nhìn, nên nội dung trong khung nhìn đầu tiên sẽ được hiển thị rất nhanh, tạo trải nghiệm khá tốt.

### Caching

Có thể hiểu caching là việc trang web của bạn sao lưu nội dung của bạn trong một file mà khi người dùng request lại nội dung đó thì sẽ nhanh hơn. Vì truy cập vào file sẽ nhanh hơn là query tới database.

Đối với plugin hỗ trợ cho việc caching thì bạn chỉ cần cài [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/) (cái này là hàng chính chủ từ Automattic) là đủ rồi.

Có rất nhiều bài viết hướng dẫn kỹ càng việc cấu hình WP Super Cache. Mình sẽ không hướng dẫn chi tiết.

### Database

Nội dung trên site của bạn sẽ được load từ database, vì vậy việc load nhanh hay chậm cũng phụ thuộc vào database.

Việc clean up database cũng quan trọng, giúp bạn loại bỏ được những dữ liệu không cần thiết như revisions, deleted comments, spammed comments, meta trùng lập, .v.v..

Bạn có thể dùng phpMyAdmin để clean up database hoặc dùng những plugins sau:

- [WP-Sweep](https://wordpress.org/plugins/wp-sweep/)
- [Advanced Database Cleaner](https://wordpress.org/plugins/advanced-database-cleaner/)

## Tối ưu những vấn đề liên quan đến server

### Chọn server có cấu hình tốt

Hãy đầu tư cho site của bạn một hosting tốt, đủ để xử lí những tác vụ của site. Việc lựa chọn cấu hình hosting phụ thuộc vào lượng truy cập vào site của bạn, lượng dữ liệu bạn cần lưu.

Nên chọn những hosting nào hỗ trợ SSD nhé.

- https://wpengine.com
- https://digitalocean.com
- https://azdigi.com (Việt Nam)

### Lựa chọn nơi đặt server phù hợp

Vì sao điều này quan trọng. Nói dễ hiểu, người dùng truy cập vào site của bạn sẽ là điểm A và server sẽ là điểm B. Vì vậy khoảng cách từ A → B càng ngắn thì việc người dùng nhận được dữ liệu càng nhanh.

Nếu bạn hướng tới người dùng là Việt Nam, hay cân nhắc những server ở gần Việt Nam. Nếu dùng server của Digital Ocean thì có thể chọn Singapore. Hoặc những nhà cung cấp hosting ở Việt Nam thì khỏi bàn rồi.

### CDN (Content Delivery Network)

Đây là khái niệm không còn xa lạ nữa, nó cũng liên quan đến khoảng cách của người dùng đến nơi bạn lưu trữ dữ liệu.

CDN sẽ lưu dữ liệu của bạn ở nhiều server khác nhau. Khi người dùng truy cập dữ liệu, CDN sẽ xác định vị trí người dùng và trả về dữ liệu ở server gần người dùng nhất. Như vậy sẽ giảm đáng kể thời gian đấy.

Các bạn có thể tham khảo những nhà cung cấp CDN sau:

- MaxCDN
- CloudFlare
- Incapsula
- Amazon ClounFront

### Nâng cấp PHP

{{<figure src="https://cdn-images-1.medium.com/max/800/1*CYdYumGXh4_7QBdUZN1kAw.png" title="Nguồn: wpengine.com">}}

Hãy nâng cấp lên PHP 7 để tốc độ xử lí nhanh hơn. Lưu ý trước khi nâng cấp lên PHP 7, bạn hãy cài plugin [PHP Compatibility Checker](https://wordpress.org/plugins/php-compatibility-checker/) để kiểm tra độ tương thích.

### Bật tính năng GZIP compression

GZIP compression sẽ nén các trang của website trên server trước khi gởi cho người dùng và browser của người dùng sẽ có nhiệm vụ giải nén.

Việc nén như vậy sẽ giảm bớt lượng băng thông và tăng tốc độ load trang hơn.

Những webserver như Apache, IIS, nginx đều có hỗ trợ GZIP. Bạn chỉ cần xem hướng dẫn bật dành riêng cho từng server.

Bạn có thể check GZIP cho site của mình tại https://checkgzipcompression.com/

### Sử dụng giao thức HTTP/2

> HTTP/2 will make our applications faster, simpler, and more robust - Google Developers

Việc nâng cấp lên HTTP/2 sẽ giúp việc load trang của bạn nhanh hơn vì cơ chế xử lí của HTTP/2 đã được thay đổi.

Để tìm hiểu thêm về HTTP/2 các bạn có thể đọc các bài viết trên mạng rất chi tiết:

https://blog.hostvn.net/chia-se/http2-la-gi-http2-co-dac-diem-gi-khac-biet-voi-http11.html

https://tinhte.vn/threads/nhung-dieu-ban-nen-biet-ve-giao-thuc-http-2.2429806/

Hiện này nhiều nhà cung cấp web hosting cũng đã hỗ trợ HTTP/2 nên bạn sẽ dễ dàng sử dụng giao thức này cho site của mình.

### Đừng bắt server của bạn làm quá nhiều việc

Hãy nhớ câu “do less things”. Đừng bắt server của bạn phải handle quá nhiều thứ. Hãy để nó làm một việc duy nhất là lưu trữ website và xử lí những tác vụ liên quan. Đừng bắt nó phải làm thêm nhiều việc như mail servers, cron job, .v.v..

## Lời kết

Việc tối ưu tốc độ site WordPress là một hành trình tốn thời gian và công sức. Tuy nhiên bạn đã tạo được website vậy hãy giành thời gian để tối ưu nó.

Bài viết của mình có thể còn sai xót và thiếu nhiều phần, vì vậy các bạn hãy đóng góp để bài viết hoàn thiện hơn. Cảm ơn các bạn.
