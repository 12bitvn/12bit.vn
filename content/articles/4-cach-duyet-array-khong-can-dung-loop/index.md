---
authors:
  - vominh
date: "2018-11-28T17:12:38+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/0*ESt0_h3F72ZNiqCR
tags:
- javascript
- array
- loop
title: 4 cách duyệt array mà không cần dùng loop
---

JavaScript cũng như nhiều ngôn ngữ khác, có rất nhiều cách để giải quyết vấn đề. Có lẽ ai học lập trình cũng đều phải biết rõ những cấu trúc cơ bản như vòng lặp và rẽ nhánh. Và trong hầu hết các trường hợp cần duyệt array thì các bạn đều có thể sử dụng cấu trúc loop.

Trong bài viết này chúng ta sẽ tìm hiểu vài cách khác nhau để duyệt qua các phần tử của array mà không cần dùng tới vòng lặp for hoặc forEach.

## map()

Giống như cái tên của nó, map giúp chúng ta map lại các phần tử của một array thành một array mới. Chúng ta có ví dụ sau:

{{% runkit demo-1 %}}
```
const evens = [2, 4, 6, 8, 10];
let odds = [];
for (let index = 0; index < evens.length; index++) {
    odds.push(evens[index]+1);
}
console.log(odds);
```
{{% /runkit %}}

Mục đích của chúng ta là map, nhưng chúng ta dùng một vòng lặp, và chúng ta phải comment vào là `//Tui đang map một chuỗi số chẵn thành số lẻ nhé`. Code sẽ dễ hiểu và có nghĩa hơn nếu chúng ta dùng phương thức map như sau:

{{% runkit demo-2 %}}
```
const evens = [2, 4, 6, 8, 10];
let odds = evens.map(number => number + 1)
console.log(odds);
```
{{% /runkit %}}

Code đã gọn hơn rất nhiều mà lại không làm tối nghĩa, khi bạn đọc và bạn sẽ hiểu phương thức map là dùng để map các phần tử của evens thành với số 1 để tạo thành một array các số lẻ chứ không phải động não để hiểu vòng lặp for nữa.

Đôi với map, hàm callback có thể nhận tối đa 3 tham số theo thứ tự là currentElement, Index, originalArray:

```
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
    // Trả về element mới cho new_array
}[, thisArg])
```

Giá trị hoặc reference mà bạn trả về từ hàm callback sẽ được dùng để làm phần tử của mảng mới, vì vậy bạn cần chú ý về giá trị mà bạn return: value hay reference.

{{% runkit 1545992740713%}}
```
const object = {
    prop1: 1
};

let a = [object].map(o => o);

a[0].prop1 = 2;
console.log(object, a);
```
{{% /runkit %}}

## filter()

Filter một array là việc rất thường làm, bạn có thể có ví dụ như sau:

{{% runkit 1545992765617%}}
```
const randoms = [4,6,78,2,34,8,90,34,23,23,5,6,234,435];
let odds = [];
randoms.forEach(number => {
    if (number % 2 != 0) {
        odds.push(number)
    }
})
console.log(odds);
```
{{% /runkit %}}

Nhưng cũng như map, nhìn vào đoạn code này bạn phải đọc logic bên trong vòng lặp for sau đó mới ngộ ra: ồ, thì ra đang filter đây mà. nhưng hãy nhìn đoạn code dưới đây, liệu bạn có cần phải đọc gì nhiều ngoài keyword filter:

{{% runkit 1545992783479%}}
```
const randoms = [4,6,78,2,34,8,90,34,23,23,5,6,234,435];
let odds = randoms.filter(number => number % 2 != 0);
console.log(odds);
```
{{% /runkit %}}

Lại một lần nữa code gọn và dễ hiểu hơn rất nhiều.

Khác với map(), hàm callback của phương thức filter chấp nhận giá trị trả về là boolean, nếu trả về true thì phần tử tương ứng sẽ được add vào array mới, fail thì ngược lại, phần tử đó sẽ bị bỏ qua.

## every() và some()

Chắc các bạn từng gặp vấn đề như sau: Kiểu tra xem có phải tất cả element của một array đều thỏa một điều kiện nào đó hay không?

{{% runkit 1545992803057%}}
```
const numbers = [2, 4, 6, 8, 11];
let isEveryEvens = true;
numbers.forEach(e => {
    if (e % 2 != 0) {
        isEveryEvens = false;
    }
});
console.log(isEveryEvens);
```
{{% /runkit %}}

Phương thức every() sẽ duyệt qua tất cả các phần tử của array và đảm bảo rằng mọi phần tử đều thỏa hàm callback, hàm callback sẽ trả về true hoặc fail.

{{% runkit 1545992824674%}}
```
const numbers = [2, 4, 6, 8, 12];
let isEveryEvens = numbers.every(e => e %2 == 0)
console.log(isEveryEvens);
```
{{% /runkit %}}

Trong trường hợp ngược lại, chúng ta dùng phương thức some() nếu muốn check xem có bất kỳ phần tử nào trong array thỏa điều kiện hay không:

{{% runkit 1545992837038%}}
```
const numbers = [2, 4, 6, 8, 11];
let isSomeOdd = numbers.some(e => e %2 !== 0)
console.log(isSomeOdd);
```
{{% /runkit %}}

## Lời kết

Cũng như các bạn đã thấy trong các ví dụ, việc dùng các phương thức này cũng giúp code gọn hơn và dễ hiểu hơn phần nào. Chính tên của phương thức mà các bạn sử dụng đã nói lên mục đích của bạn, vì vậy không còn cần comment và người đọc cũng không cần phải cố suy nghĩ để biết rằng bạn đang muốn map, filter.

## Tham khảo

1. [You might not need a loop](https://bitsofco.de/you-might-not-need-a-loop/)
