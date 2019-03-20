---
authors:
  - tatthien
date: "2018-06-12T09:39:29+07:00"
description: Bài viết sẽ hướng dẫn bạn cài đặt PHP Code Sniffer kết hợp với WordPress
  Coding Standards trên PhpStorm.
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*ZdYZmO3P_PL39PbkviqagQ.jpeg
tags:
- php
- wordpress
- coding standard
title: Cài đặt WordPress Coding Standards cho PhpStorm
---

TL;DR

Bài viết sẽ hướng dẫn bạn cài đặt PHP Code Sniffer kết hợp với WordPress Coding Standards trên PhpStorm. Tuy nhiên trước khi cài đặt, chúng ta tản mạn xíu.

## Viết code như làm thơ

WordPress có một câu sologan nổi tiếng “Code is Poetry” có thể tạm dịch là “Viết code như làm thơ”. Quả đúng như vậy, công việc lập trình không phải là thứ gì đó khô khan, cứng nhắc hay tẻ nhạt chỉ có **if** cái này **then** cái kia. Nhưng nó còn ẩn chứa rất nhiều điều thú vị.

{{< figure src="https://cdn-images-1.medium.com/max/800/1*-HCjHyR7Q3pXmkHc8Sgcnw.jpeg" title="Nguồn: Google" >}}

Khi làm văn hay thơ, bước đầu bạn có thể phải lên dàn ý, draft ý tưởng. Nhưng cuối cùng bạn phải chỉnh sửa lại bài văn hay bài thơ đó cho thật đẹp mắt, mạch văn phải trôi chảy, kiểm tra lỗi chính tả, ngữ pháp v.v.. với mục đích trước tiên là để bạn dễ dàng đọc, dễ dàng chỉnh sửa sau này, tiếp đến là hướng tới người đọc.

Việc viết code cũng tương tự, bạn cũng phải “viết code đẹp” để có thể maintain code của chính mình và cho người khác dễ dàng contribute. Và “viết code đẹp” đấy chính là viết theo chuẩn, vì những gì đẹp, đúng đắn và thống nhất đều xuất phát từ một tiêu chuẩn giá trị có sẳn nào đó.

## Tại sao phải code theo chuẩn

> Nếu mong muốn công ty không bao giờ sa thải bạn vì code của bạn không ai có thể maintain được ngoài bạn thì bạn có thể bỏ qua bài này và đọc những bài viết khác của 12bit.

Đi sâu hơn một chút về việc tại sao cần code theo chuẩn thì có vài điều sau để thuyết phục một lập trình viên phải “viết code đẹp”:

- Giúp thần thái coding của bạn được tôn lên một đẳng cấp khác.
- Việc code theo một tiêu chuẩn đã được công nhận sẽ giúp bạn hòa mình vào cộng đồng coder thế giới một cách dễ dàng. Nếu bạn muốn contribute vào một project nào đó, bắt buộc bạn phải code theo chuẩn của project đó.
Team của bạn sẽ trở nên đoàn kết yêu thương nhau hơn vì tất cả đã có chung một tiêu chuẩn, ai cũng có thể contrubite vào một project mà không sợ bị conflict style. Sếp của bạn chắc hẳn sẽ rất yên tâm.
- Bạn sẽ thêm yêu cuộc sống khi nhìn vào code của mình.
- Sếp bạn yêu cầu!

Còn nhiều lí do nữa, nhưng mà mình không liệt kê hết ra đây. Như vậy cũng đủ để thuyết phục một coder chân chính phải viết code theo chuẩn.

## Code theo chuẩn WordPress

Mỗi ngôn ngữ, framwork đều có một tiêu chuẩn (Coding standard) riêng. WordPress cũng không năm ngoài số đó.

{{<figure src="https://cdn-images-1.medium.com/max/800/1*rG0xNcNk1bB-cZjKI2AbwQ.png" title="Nguồn: Effective Go">}}

WordPress đã xây dựng một [handbook](https://make.wordpress.org/core/handbook/best-practices/coding-standards/) đầy đủ coding standards cho PHP, HTML, CSS và Javascript. Bài viết này sẽ tập trung vào phần PHP và cách sử dụng PhpStorm để có thể code PHP theo chuẩn của WordPress một cách dễ dàng.

{{<figure src="https://cdn-images-1.medium.com/max/800/1*5ccL5tU13-KZRxGnmi4hew.png" title="Nguồn: Handbook WordPress Coding Standards">}}

Cách code [PHP theo chuẩn của WordPress](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/) đã được ghi rất cụ thể và mình sẽ không đi chi tiết phần này.

Bây giờ chúng ta sẽ đến phần cài đặt PHP Code Sniffer cho PhpStorm kết hợp với WordPress Coding Standards để PhpStorm có thể highlight mỗi khi code không theo chuẩn cũng như giúp format code chuẩn hơn.

_À mà khoan! Tại sao lại phải cài những thứ này?_

_Nếu bạn chắc mình có thể nhớ hết các tiêu chuẩn và không bao giờ thiếu xót thì có thể bạn không cần phải cài đâu._

### Cài đặt PHP Code Sniffer cho PhpStorm

Bạn hãy truy cập vào repo của PHP Code Sniffer (phpcs) trên Github https://github.com/squizlabs/PHP_CodeSniffer và xem hướng dẫn cài đặt. Mình chọn cách cài đặt bằng Composer để thuận tiện cho việc tích hợp với PhpStorm.

```sh
composer global require "squizlabs/php_codesniffer=*"
```

Sau khi install phpcs bằng Composer xong, bạn mở PhpStorm lên và truy cập tới **Settings > Languages & Frameworks > PHP > Code Sniffer**

{{<figure src="https://cdn-images-1.medium.com/max/800/1*DmHHhtJDI0XLidV3PWo5EA.png" title="Settings > Languages & Frameworks > PHP > Code Sniffer">}}

Vẫn trên giao diện **Code Sniffer**, bạn đi tới mục **Development evironment > Configuration** và chọn **Local**, sau đó click vào button 3 chấm để load PHP Code Sniffer.

![](https://cdn-images-1.medium.com/max/800/1*z_mBEBYxpMX1xliaqLlfEQ.png)

Sau khi bật lên bạn sẽ thấy 3 setting chính đó là:

- **PHP Code Sniffer (phpcs) Path**: Đường dẫn tới phpcs.
- **Maximum number of messages per file[1…100]**: số lỗi thông báo trên một file. Ví dụ bạn đang kiểm tra code standards cho file chuan.php file này có tới 101 lỗi, thì theo như setting bạn chỉ đọc được 100 lỗi, nếu fix xong ≥ 1 lỗi thì bạn mới thấy được lỗi thứ 101 còn lại.
- **Tool process timeout, sec [1…30]**: đây là thời gian timeout để phpcs check lỗi. Nếu bạn để timeout quá thấp thì không thể check hết lỗi của một file (nếu file đó có quá nhiều lỗi).

Để phpcs hoạt động trong PhpStorm bạn phải load file php.bat đã được tải về bằng Composer, đường dẫn cho file này phụ thuộc vào hệ điều hành của bạn. Mình đang dùng Windows 10 nên đường dẫn sẽ là:

```sh
C:\Users\{your_username}\AppData\Roaming\Composer\vendor\bin\phpcs.bat
```

{{<figure src="https://cdn-images-1.medium.com/max/800/1*-Z446mmp9mu9WVsa5aFcvA.png" title="Đường dẫn tới phpcs.bat">}}

Nếu bạn dùng hệ điều hành khác thì hãy để lại đường dẫn phpcs ở phần bình luận nhé.

Sau đó bấm vào button Validate. Nếu thấy thông báo màu xanh tức bạn đã cài thành công.

![](https://cdn-images-1.medium.com/max/800/1*HfcWfckJlnZMfjM63OuoqA.png)

### Cài đặt WordPress Coding Standards

PHP Code Sniffer là công cụ để nhận diện lỗi trên PHP, Javascript, CSS files theo một tiêu chuẩn được định nghĩa trước. Vì vậy chúng ta cần cung cấp tiêu chuẩn đó. Trong bài viết này sẽ là **WordPress Coding Standards (WCS)**.

Bạn truy cập vào repo của WCS tại đây: https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards và tải bản zip của repo này về.

![](https://cdn-images-1.medium.com/max/800/1*Duq13F1Z0rDGhgQuA_-szw.png)

Sau khi tải về, hãy giải nén và copy các folder **WordPress-*** vào thư mục **Standards** của phpcs

```sh
C:\Users\{your_username}\AppData\Roaming\Composer\vendor\squizlabs\php_codesniffer\src\Standards
```

{{<figure src="https://cdn-images-1.medium.com/max/800/1*1NVXsFcivun6-1oF5BsLdA.png" title="Thư mục chứa các coding standard của PHP Code Sniffer">}}

Như bạn thấy, phpcs đã có sẵn một vài coding standard như PSR1, PSR2. Bây giờ chúng ta cung cấp thêm WordPress Coding Standards.

Bước tiếp theo bạn sẽ enable WordPress Coding Standards trong PhpStorm bằng cách truy cập vào **File > Settings > Editor > Inspections** và tìm ngôn ngữ **PHP**

![](https://cdn-images-1.medium.com/max/800/1*PX1HW_Y_qEJtz1hDUleURw.png)

Sau khi đã lọc ra ngôn ngữ PHP, bạn kéo xuống phía cuối cùng sẽ thấy 2 mục là **PHP Code Sniffer validation** và **PHP Mess Detector validation**

{{<figure src="https://cdn-images-1.medium.com/max/800/1*3DpK2LmZ1_ZHNmwXkEV-nA.png" title="Check vào 2 ô này.">}}

Bây giờ bạn chọn mục **PHP Code Sniffer validation**, ở phần **Coding standard** bạn sẽ chọn chuẩn là **WordPress**. _Trong trường hợp không thấy hãy bấm vào button refresh bên cạnh._

Như vậy là toàn bộ cước cài đặt đã xong, bây giờ chúng ta sẽ kiểm tra xem phpcs đã có thể validate theo chuẩn WordPress Coding Standards hay chưa.

### Kiểm tra hoạt động của PHP Code Sniffer theo WordPress Coding Standards

Mình sẽ thử đoạn code sau:

```php
function testWordPressCodingStandard() {
   echo '12bit.vn';
}
```

Để xem phpcs sẽ báo lỗi gì?

![](https://cdn-images-1.medium.com/max/800/1*TVcYGpQTnnsUh7d4F4fBew.png)

Như bạn thấy, phpcs đang báo lỗi naming convention và missing doc. Vì naming convention của WordPress là snake_case chứ không phải là camelCase và function bắt buộc phải có doc comment. Bây giờ mình sẽ fix theo báo lỗi của phpcs:

```php
/**
 * Test WordPress Coding Standard.
 */
function test_wordpress_coding_standard() {
   echo '12bit.vn';
}
```

{{<figure src="https://cdn-images-1.medium.com/max/800/1*LXABmBIO4rEybX_5BZrdFQ.png" title="Như vậy là đã hết báo lỗi">}}

### Tự động format code theo chuẩn WordPress

Phần cuối cùng trong bài viết này đó là format code tự động. Mỗi IDE đều có tính năng này, giúp lập trình viên không phải format code thủ công từng dòng. Trong PhpStorm sẽ là **Ctrl + Alt + L**

Để format code theo chuẩn WordPress, bạn cần cấu hình một chút bằng cách truy cập vào **Settings > Editor > Code Style > PHP**.

Sau đó chọn **Set from… > Predefined Style > WordPress**

![](https://cdn-images-1.medium.com/max/800/1*1gDrQB3MYfaMgNc3FAC3PA.png)

Có một lưu ý là style này sẽ format `true/false/null` thành `TRUE/FALSE/NULL` như vậy sẽ không theo chuẩn của WordPress nữa (cái này mình cũng không hiểu). Để fix, chúng ta sẽ check vào các mục sau:

{{<figure src="https://cdn-images-1.medium.com/max/800/1*59ZhPPig9d-DE6SUeZ3SEg.png" title="Vẫn đang trong giao diện Editor > Code Style > PHP">}}

Thử format xem nào.

![](https://cdn-images-1.medium.com/max/800/1*ii7ERYLCcc-BvDe04vg-6A.gif)

## Kết luận

Sau khi đọc bài viết này, mong muốn các bạn hãy cài đặt phpcs và WordPress Coding Standards sau đó tập tành code theo chuẩn.
