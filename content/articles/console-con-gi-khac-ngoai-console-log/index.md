---
title: "Console còn gì khác ngoài console.log()"
description: Hướng dẫn điều khiển máy tính bằng Google Assistant
date: 2019-06-27T16:36:15+07:00
tags:
  - Console
authors:
  - vominh
---

Lập trình javascript có lẽ không ai còn lạ gì `console.log`. Từ những bài helloWorld đầu tiên bạn đã được làm quen với nó như là những hàm `print`, `log` trong các ngôn ngữ khác.

Nhưng liệu `console` chỉ có mỗi phương thức `log` hay còn gì thú vị nữa không? Trong bài viết này chúng ta sẽ cùng tìm hiểu những phương thức khác của `console` và bạn sẽ thấy rằng nó cũng rất thú vị và manh mẽ chứ không phải chỉ mỗi chức năng in text ra console.

## Console Object

Như bạn đã biết, console là object dùng để truy cập giao diện console của browser hoặc cli, được cung cấp bởi browser hoặc Nodejs.

Console có khá nhiều phương thức chứ không chỉ có mỗi phương thức log. Có thể liệt kê ra các phương thức sau đây:

1.  Console.assert()
2.  Console.clear()
3.  Console.count()
4.  Console.debug()
5.  Console.dir()
6.  Console.dirxml()
7.  Console.error()
8.  Console.exception()
9.  Console.group()
10. Console.groupCollapsed()
11. Console.groupEnd()
12. Console.info()
13. Console.log()
14. Console.profile()
15. Console.profileEnd()
16. Console.table()
17. Console.time()
18. Console.timeEnd()
19. Console.timeStamp()
20. Console.trace()
21. Console.warn()

## Hiển thị giá trị ra console

Thao tác này quá quen thuộc rồi, đơn giản là hiển thị giá trị của một hoặc nhiều biến ra console, có thể là text, number, array, object, v.v..

Các phương thức được hỗ trợ là `console.log`, `console.error`, `console.info`, `console.warning.`

Cách sử dụng và chức năng của phương thức không khác nhau nhiều, chỉ là nội dung xuất ra console được style khác nhau, và được browser hỗ trợ filter.

![Image for post](https://miro.medium.com/max/1592/1*qqVPcHZE0psKs7ouNwstCA.png)

### Hiển giá trị đơn giản

```
console.log('Hello console');
console.error({msg: 'Hello console'});
console.info(['Hello', 'console']);
```

Kết quả

```
Hello console
{msg: "Hello console"}
["Hello", "console"]
```

### Hiển thị nhiều giá trị

```
console.log('Hello', 'world');
console.log('Hello', ['w', 'o', 'r', 'l', 'd']);
```

Kết quả cũng tương tự như ở trên, nhưng thay vì mỗi biểu thức trên một dòng thì giờ nó sẽ hiển thị các kết quả của các biểu thức trên cùng một dòng. Đối với object, array thì vẫn giống như gọi riêng, vẫn sẽ có chức năng thu gọn, mở rộng.

### Sử dụng string format

Tương tự như hàm printf trong c++, các hàm log cũng hỗ trợ format với cú pháp tương tự:

```
for (var i=0; i<5; i++) {
  console.log("Hello, %s. You've called me %d times.", "Bob", i+1);
}
```

Kết quả

```
Hello, Bob. You've called me 1 times.
Hello, Bob. You've called me 2 times.
Hello, Bob. You've called me 3 times.
Hello, Bob. You've called me 4 times.
Hello, Bob. You've called me 5 times.
```

### Style text bằng css

Nếu bạn mở console ở facebook.com thì bạn sẽ thấy thông báo của họ có màu đỏ, không giống như các ví dụ nảy giờ chúng ta đã làm. Để làm được điều đó thì cẩn sử dụng `%c` trong chuỗi và sử dụng code css ở tham số thứ hai để định nghĩa style:

```
console.log("%cStop!", "color: red; font-size: 50px; font-weight: bold; text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);");
```

Kết quả sẽ như sau, nhưng bạn cũng có thể thử nó ngay trong này:


![Image for post](https://miro.medium.com/max/618/1*xuXn6AdsQnU3gke934vzfg.png)

Thật tuyệt đúng không. Nhưng vẫn chưa hết đâu, hãy tiếp tục đọc về những hàm hỗ trợ nhiều hơn về debug, phân tích perfomance nào.

### Group các dòng

Phương thức `console.group` và `console.groupEnd` dùng để gom nhóm các dòng lại với nhau. Hãy tưởng tượng nếu bạn đang debug các hàm lồng lên nhau và nếu các dòng thông tin không được group lại thì chúng sẽ rất khó nhìn, khó phân biệt. Ngày xưa mình debug bằng cách log ra các dòng `---------------------------` để phân biệt, nhưng vẫn rất rối. Phương thức group không chỉ giúp phân biệt mà còn hỗ trợ thu gọn các group.

Hãy thử chạy các dòng sau đây trong console:

```
console.log("This is the outer level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.debug("Back to the outer level");
```

Kết quả

![Image for post](https://miro.medium.com/max/846/1*zowcT58xIi9s3aOZWFTygQ.png)

### Tính thời gian

Vậy còn nếu bạn muốn đếm thời gian giữa hai dòng code thì sao? Có thể ứng dụng để tính thời gian chạy của code, thời gian để hoàn thành một thao tác nào đó, ví dụ như tính thời gian trung bình cần có để nhập một cái form nào đó. Phương thức `console.time` và `console.timeEnd` sẽ giúp bạn.

Hai phương thức nhận vào một tham số duy nhất là `label` gọi `console.time([label])` để bắt đầu tính thời gian cho `[label]` và gọi `console.time([label])` để ngưng đếm và hiển thị thời gian đã trải qua, thời gian tính bằng `ms`.

```
console.time("answer time");
alert("Click to continue");
console.timeEnd("answer time");
```

Lưu ý là nếu bạn sử dụng phương thức này để tính thời gian load tài nguyên từ server, ví dụ như ajax, lazy load image thì thời gian đếm của hàm này là từ lúc request cho đến thời gian hoàn tất nhận body. Còn thời gian trong thẻ `Network` chỉ là thời gian browser nhận được header mà thôi.

### Stack traces

Stack trace để biết stack khai báo của hàm thì sử dụng phương thức `console.trace`

```
function foo() {
  function  bar() {
    console.trace();
  }
  bar();
}
foo();
```

kết quả

```
bar
foo
<anonymous>
```

### Counter

Phương thức này nhận vào một tham số là label, và chỉ đếm riêng cho từng label đó, nhờ vậy bạn có thể đếm cùng lúc nhiều label khác nhau:

```
var user = "";function greet() {
  console.count();
  return "hi " + user;
}

user = "bob";
greet();
user = "alice";
greet();
greet();
console.count();
```

Kết quả

```
1
2
3
1
```

Hoặc sử dụng label:

```
var user = "";function greet() {
  console.count(user);
  return "hi " + user;
}
user = "bob";
greet();
user = "alice";
greet();
greet();
console.count("alice");
```

Kết quả

```
"bob: 1"
"alice: 1"
"alice: 2"
"alice: 3"
```

### Ghi lại CPU profile

Kiểm tra profile có thể giúp bạn tối ưu hóa code dễ hơn ... một chút. Mình thì chưa rành về mục này, nên chỉ viết sơ qua thôi. Nếu bạn có kinh nghiệm, xin nhờ bạn viết một bài và chúng ta sẽ thêm vào 12bits.

```
function animationUI() {
    console.profile('Animating');// Animate something...console.profileEnd();
}
```

### Hiển thị array object dạng table

Nếu `console.log` và `console.dir` giúp hiển thị object dạng collapse thì `console.table` như cái tên của nó, hiển thị dữ liệu dạng table. Giúp bạn đọc dữ liệu dễ hơn. Nó nhận hai tham số, tham số thứ nhất là dữ liệu cần hiển thị và tham số thứ hai là array chứa danh sách các thuộc tính sẽ được hiển thị thành các cột.

```
var data = [
    {first_name: 'Matt', last_name: 'West', occupation: 'Programmer'},
    {first_name: 'Vince', last_name: 'Vaughn', occupation: 'Actor'},
    {first_name: 'Larry', last_name: 'Page', occupation: 'CEO'}
];
console.table(data, ['first_name']);
```

kết quả

![Image for post](https://miro.medium.com/max/941/1*cGEGXq6OwYKtEGoorEZ9pg.png)

## Lời kết

Như vậy, qua bài viết đơn giản này chúng ta đã hiểu thêm nhiều phương thức rất hữu ích của console. Nó sẽ giúp việc debug của chúng ta đơn giản và an toàn hơn. Thử tượng tượng xem sẽ ra sao nếu chúng ta dùng cách count như mình kể ở phần trên và sau đó lại quên xóa những chỗ debug đi.

Cũng như vậy, nó có thể giúp chúng ta debug hiệu quả hơn bằng các phương thức `trace` , `time` và `profile`.

Mình cũng không biết nhiều về việc tối ưu, vì vậy nếu bạn có kinh nghiệm tối ưu code bằng các phương thức console này thì hãy viết và gửi về cho 12bits nhé.

## Bonus

Developer thường thích dark theme. Và bạn có thể chỉnh dark theme cho Chrome Devtools. Hãy vào setting trong devtools và ở phần theme, bạn chỉnh là thành dark:

![Image for post](https://miro.medium.com/max/60/1*qGkEQJncv9GbREKfNSQMMA.png?q=20)

![Image for post](https://miro.medium.com/max/1151/1*qGkEQJncv9GbREKfNSQMMA.png)
