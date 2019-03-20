---
authors:
  - tatthien
date: "2018-08-13T22:14:45+07:00"
description: A short description for the post.
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*wyEFyJkOy7IrrivMUhwvPg.png
tags:
- javascript
title: Tìm hiểu về Immediately-invoked function expression (IIFE) trong Javascript
---

Trong bài viết này chúng ta cùng tìm hiểu một cách khai báo function rất quen thuộc trong Javascript. Tuy nó quen thuộc nhưng có thể chúng ta chưa biết tên gọi hoặc cách thức hoạt động của nó nhứ thế nào?

Trước khi tìm hiểu về IIFE, chúng ta cùng sơ lược qua các cách khai báo function trong Javscript.

## Function declaration

Định nghĩa một named function, có thể sử dụng trước khi được khai báo [^1].

```javascript
function hello(name) {
    console.log(`Hello ${name}`)
}
hello('12bit.vn') // Hello 12bit.vn
```

[^1]: Các bạn có thể tìm hiểu về khái niệm Hoisting trong Javascript: https://developer.mozilla.org/en-US/docs/Glossary/Hoisting

## Function expression

Định nghĩa một named function hoặc anonymous function, không thể sử dụng nếu chưa được khai báo [^1].

```javascript
const hello = function(name) {
    console.log(`Hello ${name}`)
}
hello('12bit.vn') // Hello 12bit.vn
```

## Immediately-invoked function expression

IIFE là một dạng function expression định nghĩa một anonymous function được thực thi ngay sau khi nó được tạo ra.

```javascript
(function(name) {
    console.log(`Hello ${name}`)
})('12bit.vn')
// Hello 12bit.vn
```
Cách khai báo này sẽ chứa hai phần chính:

- Phần thứ nhất là (function(){}) , bạn sẽ khai báo function trong đây.
- Phần thứ hai là () , có nhiệm vụ thực thi function ngay sau khi nó được khai báo.

### Truyền params như thế nào

```javascript
(function(a, b) {
    console.log(a + b)
})(1, 2)
// 3
```

### Dùng IIFE trong trường hợp nào

Bạn có thể dùng cách khai báo này trong trường hợp viết thư viện và cần nó thực thi một cách tự động.

Ngoài ra để giảm thiểu [memory leak do global variables](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/) gây ra, bạn cũng nên dùng cách khai báo này. Bởi vì những biến được khai báo trong IIFE sẽ không thể sử dụng bên ngoài scope của nó.

```javascript
(function() {
    var a = 1
    console.log(a)
    // 1
})()
console.log(a)
// ReferenceError: a is not defined
```

> Bạn có thể tham khảo thêm bài viết của anh HuyTD về vấn đề Garbage Collection trong Javascript: https://thefullsnack.com/articles/javascript-v8-notes.html

## Lời kết

Mình viết bài này như một dạng TIL, ngắn gọn nhưng đủ để hiểu IIFE là gì và nó hoạt động ra sao. Hi vọng các bạn sẽ có những góp ý để 12bit hoàn thiện hơn mỗi ngày.
