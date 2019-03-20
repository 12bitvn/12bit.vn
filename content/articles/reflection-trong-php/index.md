---
authors:
  - vominh
date: "2018-03-19T13:49:07+07:00"
draft: false
images:
- /articles/reflection-trong-php/images/thumbnail.png
tags:
- reflection
- php
title: Reflection trong PHP
---

Hôm trước mình có thử tìm hiểu về reflection trong ES6, và ngày hôm sau mình gặp một case có thể sử dụng reflection trong php. Nên mình viết bài này để chung ta cùng thảo luận.

Trước khi viết bài mình đã tham khảo một vài bài viết dưới đây, bạn có thể đọc nó trước để giúp mình trong trường hợp mình viết thiếu, viết sai: 

1. [What is Reflection in PHP?](https://www.culttt.com/2014/07/02/reflection-php/)
1. [Reflection in PHP](https://code.tutsplus.com/tutorials/reflection-in-php--net-31408)
1. [Introduction to PHP Reflection API](https://medium.com/tech-tajawal/introduction-to-php-reflection-api-4af07cc17db4)
1. [Dependency Injection (DI) Container in PHP](https://medium.com/tech-tajawal/dependency-injection-di-container-in-php-a7e5d309ccc6)

Với các ngôn ngữ lập trình thuộc loại dynamic-type thì kiểu của dữ liệu (biến, hàm, object, v.v..) là động, nghĩa là kiểu của dữ liệu được xác định khi code được chạy. Vậy nếu bạn viết một hàm nhận vào một tham số không định kiểu trước thì làm sao bạn biết được kiểu của nó là gì để xử lý cho phù hợp, nếu không xử lý thì có thể code sẽ sinh ra lỗi. Và bạn cũng không thể kiểm tra lỗi từ trước như static type, do đó sinh ra TypeScript cho JavaScript.

Một ví dụ gần gũi là các hàm của WordPress, có rất nhiều hàm nhận vào tham số $post, bạn có thể truyền vào một instance của WP_Post hoặc một số nguyên int hoặc một object bất kỳ dùng để chứa những thông tin cần thiết, thường là stdClass.

{{< gist nguyenvanduocit 091ccb0a189c10bf190a67be176c6393  >}}

Đó là bạn đã sử dụng reflection. toán tử instanceof là một phần của reflection.

Chúng ta vẫn thường xuyên sử dụng reflection nhưng không để ý. Ví dụ như kiểm tra sự tồn tại của phương thức và hàm: function_exists, method_exists hoặc kiểm tra kiểu dữ liệu bằng toán tử instanceof. Hãy tiếp tục tìm hiểu xem Reflection trong php còn gì thú vị và ứng dụng như thế nào nhé.

## PHP Reflection Classes

Nếu bạn nhìn qua trang tài liệu về Reflection thì sẽ thấy có rất nhiều class và method. Ở đây mình sẽ chỉ nói về một vài cái và ứng dụng đơn giản của nó mà thôi.

### Lấy các interface mà class implement 

Lấy tên class của instance thì quá bình thường, vậy lấy các inerface mà class implement thì sao?

{{< oembed url="https://repl.it/@nguyenvanduocit/reflectGetInterfaceNames" title="" >}}

Tương tự như vậy, ta có thể lấy cái trait bằng phương thức getTraits.

Giờ hãy làm cái gì đó khó hơn một chút, ví dụ như truy cập vào các phương thức, thuộc tính không public.

### Truy cập các thuộc tính, phương thức không public

Vẫn là class Car mà chúng ta có lúc nãy, nhưng chỉnh lại một chút nhé, giờ sẽ không có các phương thức getPeople nữa. Nhưng vì lý do gì đó mà bạn cần truy cập $people, có thể là mục đích testing chẳng hạn. Nhờ có cách này mà chúng ta có PHPUnit và đặt biệt là mock data để test. Nhưng mình không chắc là nó có tốt trong các trường hợp khác hay không.

Chúng ta sẽ tạo một class ReflectionProperty với tham số là class cần can thiệp và tên của property cần truy cập, sau đó thay đổi accessibility của nó thành true bằng phương thức setAccessible. Cuối cùng là getValue():

{{< oembed url="https://repl.it/@nguyenvanduocit/reflectAccessPrivateProperty" title="" >}}

Bạn có thể làm tương tự với các phương thức không public bằng ReflectionMethod.

### Dependency injection

Nếu bạn từng làm qua Laravel thì sẽ biết dependency injection. Bạn chỉ cần khai báo tên của dependency cần dùng trong tham số của hàm hoặc của constructor thì Laravel sẽ tự động cung cấp cho bạn.
    
Laravel sử dụng ReflectionClass để cung cấp tính năng rất tiện lợi này. Hãy tìm hiểu thử nhé.
    
Hãy nhìn vào phương thức build của class Illuminate\Container:

{{< gist nguyenvanduocit 60be3240fe1c11b92371bda046e09218 >}}

Đầu tiên, kiểm tra xem có phải Closure hay không. Sau đó tạo một reflector là instance của ReflectionClass. Sử dụng phương thức isInstantiable để kiểm tra xem class có cho phép tạo instance hay không.

Tiếp theo lấy constructor bằng phương thức getConstructor. phương thức này trả về một instance của ReflectionMethod, và lấy ra danh sách tham số bằng phương thức getParameters.

Xử lý các tham số này bằng phương thức resolveDependencies để lấy ra instance tương ứng rồi tạo instance với các instance này bằng phương thức newInstanceArgs. Phương thức này sẽ gọi constructor với các tham số được truyền vào và trả về instance của class.

Một phần quan trọng nằm trong phương thức resolveDependencies. Phương thức này sẽ nhận vào danh sách các tham số, xử lý nó và trả về các instance phù hợp. Nhưng chúng ta không nói về nó, chỉ nói về cách phân tích ra các tham số và inject dependency và lại.

Hãy thử xem chúng ta có thể làm một ví dụ nho nhỏ, giống như vậy nhưng đơn giản hơn và thay vì inject vào class chúng ta sẽ inject vào function nhé.

### Dependency injection với function

Tương tự như laravel, nhưng chúng ta dùng ReflectionFunction. Nó cũng có các phương thức tương tự. Chúng ta không có dependency container và resolver vì vậy sẽ viết phần resolver ngay trong hàm và dùng biến global $user để chứa dữ liệu.

{{< oembed url="https://repl.it/@nguyenvanduocit/reflectionFunction" title="" >}}

Cũng như laravel, chúng ta lấy các tham số, phân tích nó và trả về instance cần inject, và cuối cùng là inject và return kết quả.

## Lời kết

Hy vọng qua bài viết này chúng ta có thể hiểu hơn một chút về reflection và tầm quan trọng của nó trong trong PHP cũng như có ý tưởng để tìm hiểu ở các ngôn ngữ khác hoặc những ứng dụng khác của reflection.
   
Bài viết sơ khai mong các bạn dành chút thời gian góp ý thảo luận.
