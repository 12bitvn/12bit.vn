---
title: "Spread operator (…) trong ES6"
description: Spread là trây trét, API giúp bạn trây trét những kiểu dữ liệu có thể trây trét được. Giống như bạn trây trét bơ lên bánh mì hoặc trây trét kem vậy.
date: 2018-03-05T17:31:49+07:00
tags: 
  - spread
  - javascript
  - es6
images:
  - /articles/spread-operator-trong-es6/thumbnail.png
authors:
  - vominh
draft: false
---

ES6 có nhiều API mới rất tiện lợi và thú vị. Chúng ta sẽ từ từ tìm hiểu tất cả những API này, nhưng trước hết hãy thử qua một API giúp chúng ta làm việc hiệu quả hơn với các dạng dữ liệu có tính lặp đi lặp lại như string, array, set, v.v..

Cú pháp thì cực kỳ đơn giản:

```
...<biến có kiểu dữ liệu lặp đi lặp lại>
```

Khi sử dụng cú pháp này thì giá trị của biến sẽ được phân rã ra thành các phần tử và tùy theo trường hợp sử dụng mà nó sẽ được xử lý theo các khác nha. Hãy cũng tìm hiểu nó thông qua các ví dụ.

## Thay thế cho phương thức apply

Ngày xưa, khi hàm có nhiều tham số và chúng ta muốn dùng các phần tử trong mảng để lần lượt làm giá trị cho các tham số thì sẽ code như sau:

```
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args);
```

Đối với cú pháp spread thì sẽ đơn giản hơn rất nhiều

```
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction(...args);
```

Hoặc thậm chí là

```
function myFunction(v, w, x, y, z) { }
var args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);
```

Thú vị là có thể dùng với các phương thức có sẵn như Max:

{{% runkit 1 %}}
```
let numbers = [1, 4, 11, 6, 2, 4, 7, 0]
console.log(Math.max(...numbers))
```
{{% /runkit %}}

## Giúp thao tác với mảng tiện lợi hơn

Để nối array ngày xưa cũng không phức tạp, có thể dùng phương thức `concat`.

{{% runkit 2 %}}
```$xslt
let a1 = [1, 2];
let a2 = [3, 4];
let a3 = [...a1, ...a2]
console.log(a3)
```
{{% /runkit %}}

Nhưng còn muốn chèn array vào giữa hoặc tệ hơn là vào vị trí bất kỳ nào đó thì sao? Với spread thì đơn giản hơn nhiều:

{{% runkit 3 %}}
```
let a1 = [1, 2];
let a2 = [3, 4];
let a3 = [5, 6, ...a1, 7, 8, ...a2, 9, 10]
console.log(a3)
```
{{% /runkit %}}

## Merge object

Merge object cũng đơn giản và ngắn gọn hơn:

{{% runkit 4 %}}
```
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
```
{{% /runkit %}}

## Copy array

Hãy xem cách copy sau đây:

{{% runkit 5 %}}
```
var arr = ['a', 'b', 'c'];
var arr2 = arr;

console.log(arr2);
```
{{% /runkit %}}

Nhìn nó có vẻ ổn nhỉ. nhưng thực ra nó không đúng. Vì đây chỉ là copy preference thôi chứ không phải thực sự copy giá trị:

{{% runkit 6 %}}
```
var arr = ['a', 'b', 'c'];
var arr2 = arr;
arr2.push('should not be pushed to arr')
console.log(arr);
```
{{% /runkit %}}

Nhưng với spread thì hoạt động hoàn hảo:

{{% runkit 7 %}}
```
var arr = ['a', 'b', 'c'];
var arr2 = [...arr];
arr2.push('should not be pushed to arr')
console.log(arr);
```
{{% /runkit %}}

## Chuyển string thành array

Chỉ cần xem string như là một kiểu dữ liệu lặp đi lặp lại các ký tự, thì chúng ta có thể sử dụng spread như sau:

{{% runkit 8 %}}
```
let senviet = 'senviet'
console.log(...senviet)
```
{{% /runkit %}}

## Lời kết

API mới với chỉ ba dấu chấm nhưng giúp chúng ta tiết kiệm khá nhiều thời gian mà đáng lý phải mất vào những thứ vặt vảnh, lặp đi lặp lại, thay vào đó ta có thể làm những việc quan trọng hơn ví dụ như tìm cái gì đó có thể trây trét thực sự.
