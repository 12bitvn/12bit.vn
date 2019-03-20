---
authors:
  - tatthien
date: "2018-03-14T11:35:13+07:00"
description: Đối với developers thì dường như viết unit test là điều gì đó rất đáng
  sợ và tốn thời gian.
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*-zCsjQTZQQA5oBsIxkrwhw.jpeg
tags:
- wordpress
- plugin
- unit test
title: Cài đặt unit test cho WordPress Plugin
---

Đối với developers thì dường như viết unit test là điều gì đó rất đáng sợ và tốn thời gian. Bạn có thể code một theme hoặc một plugin hoàn chỉnh nhưng bảo bạn viết unit test cho nó thì thật sự là cực hình.

{{<figure src="https://cdn-images-1.medium.com/max/800/1*sGdIU2RBtNwdg7d9nvAf3A.png" title="Nguôn: Google">}}

Tuy nhiên unit test là một phần không thể thiếu trong quá trình phát triển sản phẩm. Vì vậy developer chúng ta cần phải tìm hiểu và áp dụng unit test vào các project của mình.

Unit test là một khái niệm chung, nhưng cách áp dụng vào từng project sẽ khác nhau, ví dụ như cái đặt unit test cho Laravel khác với WordPress theme / plugin. Bài viết này sẽ hướng dẫn các bạn cách đơn giản để có thể cài đặt unit test cho WordPress plugin.

## Chuẩn bị

Môi trường development của bạn cần có:

- [WP-CLI](http://wp-cli.org/#installing)
- [SVN](https://tortoisesvn.net/downloads.html) hỗ trợ command line `svn`
- MySQL hỗ trợ command line `mysqladmin`

## Cài đặt unit test

Đầu tiên mình sẽ viết một plugin cực kỳ đơn giản. Có một vài hàm trong đó để tiến hành test. Code mẫu bạn có thể tham khảo như sau:

```php
<?php
/*
Plugin Name: 12bit Simple Plugin
Plugin URI: http://12bit.vn
Description: Used for testing purpose.
Version: 1.0.0
Author: 12bit.vn
Author URI: http://12bit.vn
License: GPLv2 or later
Text Domain: 12bit
*/
class Simple_Plugin_12Bit
{
	private static $_instance;
	public $author_name = '';
	public static function get_instance() {
		if ( ! is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	public function __construct() {
	}
	public function set_author_name( $author_name ) {
		$this->author_name = $author_name;
	}
	public function get_author_name() {
		return $this->author_name;
	}
}
```

Tiếp theo chúng ta sẽ dùng WP-CLI để khởi tạo những file cần thiết cho việc viết unit test. Các bạn mở terminal, truy cập tới folder plugin cần test và nhập câu lệnh như bên dưới:

```sh
wp scaffold plugin-tests 12bit-simple-plugin
```

`12bit-simple-plugin` là tên của plugin bạn cần test. Nhớ viết đúng tên.

Câu lệnh sau khi chạy xong sẽ tự tạo ra các file cần thiết.

{{<figure src="https://cdn-images-1.medium.com/max/800/1*FCKRe-fpC5zRufwAM_a1Og.png" title="Trước khi scaffold">}}

{{<figure src="https://cdn-images-1.medium.com/max/800/1*Y1sLsRcy2Umk7UJ7FJzRNg.png" title="Sau khi scaffold">}}

Những file được tạo ra gồm có:

```
bin\
  install-wp-tests.sh
tests\
  bootstrap.php
  test-sample.php
phpcs.xml.dist
phpunit.xml.dist
```

Bạn sẽ thấy có một file tên là `install-wp-tests.sh , file này sẽ đảm nhiệm việc cài đặt database, tải về code WordPress, thư viện test cho WordPress. Nói chung là những gì hỗ trợ cho việc test.

Bây giờ bạn chạy file `install-wp-tests.sh` như sau:

```sh
bash bin/install-wp-tests.sh wordpress_test root '' localhost latest
```

- `wordpress_test` là tên database
- `root` là database username
- `''` là database password, nếu không có thì bạn để trống như câu lệnh. Không thì nhập password của bạn vào.
- `localhost` là hostname của database.

Câu lệnh trên sẽ thực hiện các việc sau:

- Download source code WordPress.
- Sử dụng `svn` để tải về thư viện test cho WordPress.
- Sử dụng `mysqladmin` để tạo database với những thông số bạn cung cấp từ câu lệnh.

{{% alert info %}}
Source code WordPress mà câu lệnh này tải về sẽ nằm ở một folder tạm để bạn có thể dùng các functions của WordPress trong quá trình viết test. Nó sẽ không override folder WordPress chứa plugin của bạn. Database cũng vậy, sẽ được tạo một database riêng để test.
{{% /alert %}}

## Chạy thử unit test

Như vậy là việc cài đặt unit test cho WordPress plugin đã hoàn tất. Bây giờ chúng ta sẽ chạy thử unit test thông qua câu lệnh phpunit

```sh
phpunit
```

Mặc định bạn đã có sẵn một file test là `test-sample.php`. Vì vậy, sau khi chạy câu lệnh, bạn sẽ thấy kết quả là 1 assertion (tức là pass).

{{<figure src="https://cdn-images-1.medium.com/max/800/1*Pj93gEL3S26ECcPUICWTsg.png" title="Nếu hiển thị được như vầy là bạn đã cài đặt thành công">}}

Bây giờ chúng ta sẽ test thử function từ plugin đã viết ở trên.

Trong folder `tests` chúng ta tạo một file đặt tên là `test-functions.php` với code như sau:

```php
<?php
/**
 * Class FunctionsTest
 *
 * @package 12bit_Simple_Plugin
 */
/**
 * Sample test case.
 */
class FunctionsTest extends WP_UnitTestCase {
	function setUp() {
		$this->class_instance = new Simple_Plugin_12Bit();
	}
	/**
	 * A single example test.
	 */
	function test_get_author_name() {
		$this->class_instance->set_author_name( '12bit.vn' );
		$author_name = $this->class_instance->get_author_name();

		$this->assertEquals( $author_name, '12bit.vn' );
	}
}
```

Chạy thử `phpunit`

{{<figure src="https://cdn-images-1.medium.com/max/800/1*oiaR_oM3-7-D4nHXLsu7_A.png" title="Lúc này sẽ là 2 assertions. Vì một của test-simple.php, cái còn lại là của mình mới viết.">}}

## Kết luận

Có thể nói việc thực hiện unit test rất quan trọng. Và cách cài đặt unit test cho WordPress plugin cũng không quá khó. Chúc các bạn thành công.
