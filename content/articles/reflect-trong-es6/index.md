---
authors:
  - vominh
date: "2018-03-28T10:33:00+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*NMSSehwvDCy6X9J-xXYH9g.png
tags:
- javascript
- es6
- reflection
- reflect
title: Reflect trong ES6
---

Trước khi tìm hiểu về Proxy thì reflect nghe khá lạ lẫm với mình, nhưng hóa ra thì reflect không phải là API chỉ có trong javascript, sau này mình nghĩ nó chỉ dùng để phối hợp với proxy, nhưng mà mình vẫn sai, hóa ra reflect còn tồn tại ở các ngôn ngữ lập trình động (dynamic language) khác thậm chí nó tồn tại trong ES5 dưới hình thức là static method của class Object.

## Reflect

Lên ES6 nó được giới thiệu thành Refect class. Nhưng không như các class khác, reflect không có phương thức construct, bạn không thể dùng toán tử new để tạo một instance. Mọi phương thức của nó là static.

Các phương thức của reflect tương ứng với các traps của proxy và kết quả trả về của nó cũng chính là kết quả trap cần trả về. Vì vậy nó rất hữu dụng khi viết trap, hãy xem kết quả trả về của nó có khác gì với các phương thức static của Object.

```
try {
  Object.defineProperty(target, 'foo', { value: 'bar' })
  // yay!
} catch (e) {
  // oops.
}
```

và

```
var yay = Reflect.defineProperty(target, 'foo', { value: 'bar' })
if (yay) {
  // yay!
} else {
  // oops.
}
```

Khi thực hiện không thành công, nó trả về giá trị thay vì throw lỗi, giá trị này tương thích với giá trị mà trap của proxy cần trả về, vì vậy thật tiện lợi khi dùng cho với proxy.

Reflect có các phương thức tương ứng với các trap mà bạn đã biết trong bài về Proxy.

Bạn có thể sử dụng reflect như sau:

{{% runkit example-1 %}}
```
const object1 = {};
Reflect.set(object1, 'property1', 42);

console.log(object1.property1);
// expected output: 42

const array1 = ['duck', 'duck', 'duck'];
Reflect.set(array1, 2, 'goose');

console.log(array1[2]);
// expected output: "goose"
```
{{% /runkit %}}

Có thể làm tương tự với các phương thức khác.

## Proxy và Reflect

Ta có ví dụ nhự sau:

{{% runkit example-2 %}}
```
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log('getting ${key}!');
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log('setting ${key}!');
    return Reflect.set(target, key, value, receiver);
  }
});
obj.count+2
```
{{% /runkit %}}

Như đã nói, Reflect có các phương thức tương ứng với các trap, vì vậy bạn chỉ cần return trực tiếp là được.

Bài viết ngắn gọn này nhằm sử dụng làm tham khảo cho các bài viết khác, cũng như cung cấp thông tin ngắn gọn về reflect và cách dùng nó với proxy.

{{% caniuse features="proxy" %}}
