---
authors:
  - tatthien
date: "2021-09-28T09:39:29+07:00"
description: Bài viết sẽ hướng dẫn bạn cài đặt WordPress Coding Standards cho một project cụ thể.
draft: false
tags:
- php
- wordpress
- coding standard
- ci/cd
title: Cài đặt Coding Standards cho dự án WordPress
---

Trong quá trình sửa lỗi một plugin của mình bị gỡ xuống khỏi WP repository do không tuân thủ best practice của WordPress thì mình cũng xem thử có cách nào cài đặt coding standard của WordPress đơn giản hay không.

Với tiêu chí là không cài đặt cho 1 editor nào cụ thể, không cài đặt global mà chỉ dành cho một project riêng lẻ nào đó. Bài viết này chia sẻ lại cách mình đã làm.

Nếu các bạn có đọc qua các bài viết của 12bit, các bạn sẽ thấy có một bài mình chia sẻ [cách cài đặt WordPress coding standard cho PHPStorm](/articles/cai-dat-wordpress-coding-standards-cho-phpstorm/). Tuy nhiên sau thời gian, mình nhận ra việc cài đặt cho 1 editor cụ thể không hợp lí:

- Có thể bạn sẽ đổi editor trong tương lai.
- Thành viên trong team của bạn có thể sử dụng editor khác.
- Nếu chỉ cài đặt cho editor thì việc qualify code trên CI/CD như thế nào?

Vì vậy, cách tốt nhất là cài đặt coding standard cho từng project riêng biệt. Editor vẫn nhận biết được những rule set mà bạn đặt ra để hiển thị cảnh báo.

## Cài đặt

Sau đây là những package cần thiết mà bạn cần cài đặt cho project của mình:

```shell
$ composer require --dev \
    squizlabs/php_codesniffer:"*" \
    wp-coding-standards/wpcs:"*" \
    dealerdirect/phpcodesniffer-composer-installer:"^0.7"
```

Như vậy là đủ các package. Mình sẽ giải thích một chút về các package này.

- `php_codesniffer`: cái này không cần giải thích nha.
- `wpcs`: đây là bộ rulesets của WordPress
- `phpcodesniffer-composer-installer`: đây là package quan trọng nhất. Nó giúp bạn cài đặt các rulesets cho PHP CS thông qua `composer` một cách dễ dàng. Nếu bạn có đọc qua document của WordPress về cách cài đặt coding standard hoặc bài của mình từng viết thì việc tải và cài đặt rulesets khá phức tạp.

Sau khi cài đặt xong, các bạn có thể kiểm tra coding standard đã có WordPress hay chưa bằng cách:

```shell
$ ./vendor/bin/phpcs -i
The installed coding standards are PEAR, Zend, PSR2, MySource, Squiz, PSR1, PSR12, PHPCompatibility, PHPCompatibilityParagonieRandomCompat, PHPCompatibiliyParagonieSodiumCompat, PHPCompatibilityWP, WordPress, WordPress-Extra, WordPress-Docs and WordPress-Core
```

```
WordPress, WordPress-Extra, WordPress-Docs and WordPress-Core
```

:tada: Ok! như vậy là đã có rulesets cho WordPress.

## Kiểm thử

Bây giờ chúng ta sẽ viết code không theo chuẩn. Sau đó validate thử có báo lỗi nào hay không?

Làm sao để code không theo chuẩn WordPress? Bạn hãy tham khảo coding standard của WordPress [ở đây](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/).

Giả sử mình có một đoạn code đơn giản như vầy, xem thử sau khi validate sẽ có bao nhiêu lỗi nào.

```php
<?php

function sayHello($name) {
    echo 'Hello' . $name;
}
```

Chúng ta sẽ chạy command `phpcs`, sử dụng `--standard=WordPress` và khai báo file hoặc folder cần validate. Trường hợp mình đang code trong file `test.php`.

```shell
$ ./vendor/bin/phpcs --standard=WordPress test.php
```

:boom: Chỉ có vài dòng thôi mà lỗi nhiều quá.

{{<zoom-img src="img/figure-1.png">}}

_click vô hình để xem to hơn_

Bạn để ý sẽ thấy 4 dấu `x` tương đương với việc `phpcbf` có thể fix giúp bạn 4 lỗi đó. Còn lại bạn phải tự mình fix.

Chạy thử `phpcbf`. 4 lỗi đã được fix.

{{<zoom-img src="img/figure-2.png">}}

Sau khi fix xong thì code sẽ như sau:

```php
<?php

function sayHello( $name ) {
    echo 'Hello' . $name;
}
```

Kiểm tra lại 1 lần nữa.

{{<zoom-img src="img/figure-3.png">}}

Những lỗi còn lại chúng ta sẽ phải tự fix. Để biết cách fix các bạn cần phải xem qua coding standard của WordPress. Mình sẽ không giải thích từng lỗi nhé.

```php
<?php
/**
 * Test file
 *
 * @package WordPress
 */

/**
 * Hello function
 *
 * @param string $name This is your name.
 */
function say_hello( $name ) {
    echo 'Hello' . esc_html( $name );
}
```

Chạy lại `phpcs` một lần nữa. Lần này hết lỗi rồi đó!

## File config

Để có thể tùy chỉnh nhiều hơn cho PHP CS như exclude files, thêm custom rule thì các bạn nên sử dụng file config của PHP CS là `phpcs.xml`.

WordPress đã tạo sẵn một [file config mẫu](https://github.com/WordPress/WordPress-Coding-Standards/blob/develop/phpcs.xml.dist.sample). Các bạn có thể tham khảo.

## Kết luận

Mình có một thói quen đó là trước khi push code sẽ chạy qua một vòng qualify code như run `phpcs` chẳn hạn. Ngoài ra nếu project đã có chung một standard, việc conflict format khi có nhiều người cùng contribute sẽ không xảy ra nữa.

Bạn nghĩ sao về bài viết này? Hãy cho tụi mình biết bằng cách [tham gia Discord](https://discord.gg/uMJxpXB) và cùng thảo luận nhé!



