---
authors:
  - vominh
date: "2018-08-15T10:46:30+07:00"
draft: false
images:
- /articles/javascript-in-vs-has-own/images/thumbnail.png
tags:
- hasOwn
- JavaScript
title: 'JavaScript: in VS hasOwnProperty'
---

Trong lúc đọc change log của Vuejs thì thấy một commit thay đổi từ dùng in qua hasOwn nên mình cũng tìm hiểu xem nó gây ra lỗi gì và vì sao cần phải thay đổi:

{{< oembed url="https://github.com/vuejs/vue/commit/733c1be7f5983cdd9e8089a8088b235ba21a4dee" >}}

Hàm hasOwn mà commit sử dụng chính là TypeScript Wrapper của phương thức hasOwnProperty:

![](/articles/javascript-in-vs-has-own/images/01.png)

Trước tiên chúng ta thử tìm hiểu document của toán tử in và phương thức hasOwnProperty.

{{< scrimba "https://scrimba.com/c/cdJzKpsr">}}

## Toán tử "in"

> The in operator returns true if the specified property is in the specified object or its prototype chain.

Toán tử in sẽ trả về giá trị true nếu nó tìm thấy tên thuộc tính cần tìm trong danh sách thuộc tính của object hoặc trong prototype chain của object đó.

{{% runkit in-01 %}}
```
const car = {
    name: "My car",
    brand: "nokia"
};
console.log("name" in car)
```
{{% /runkit %}}

Toán tử này không những kiểm tra property của object hiện tại mà còn cả prototype chain của nó nữa. Ví dụ như sau:

{{% runkit 1546487574789%}}
```
const car = {
    name: "My car",
    brand: "nokia"
};
console.log("constructor" in car)
```
{{% /runkit %}}

Mọi object trong JavaScrip đều extend Object và sẽ kế thừa mọi property của Object.prototype, trong đó có constructor. Trong trường hợp này toán tử in đã kiểm tra trong prototype chain của car và tìm ra constructor.

Sẽ như thế nào nếu đối tượng car có thêm thuộc tính tùy chỉnh tên là constructor, dùng để chưa tên của nhà chế tạo ra chiếc xe đó, tuy nhiên thì thuộc tính này là không bắt buộc, bạn muốn kiểm tra xem car có constructor hay không:

{{% runkit 1546487595553%}}
```
const cars = [
    {
        name: "My car",
        brand: "nokia",
        constructor: "Nokia china"
    },
    {
        name: "Your car",
        brand: "nokia"
    }
]
cars.forEach(car => {
    if ("constructor" in car) {
        console.log(`${car.name} was made by ${car.constructor}`)
    }
})
```
{{% /runkit %}}

Tương tự như vậy, nếu chúng ta define method cho object, thì phương thức in cũng sẽ kiểm tra nó:

{{% runkit 1546487607793%}}
```
function Car () {}
Car.prototype.start = () => {}
const car = new Car()
if ("start" in car) {
    console.log(`Car can start`)
}
```
{{% /runkit %}}

## Phương thức hasOwnProperty

Khác với toán tử in, phương thức hasOwnProperty là một thuộc tính của Object.prototype, mọi object đều sẽ kế thừa phương thức này. Và phương thức này sẽ chỉ kiểm tra property của object hiện tại mà thôi, bỏ qua các thuộc tính trong prototype chain:

{{% runkit 1546487626887%}}
```
const car = {
    name: "My car",
    brand: "nokia"
};
console.log(car.hasOwnProperty("name"))
```
{{% /runkit %}}

và

{{% runkit 1546487641396%}}
```
const object1 = new Object();
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
console.log(object1.hasOwnProperty('hasOwnProperty'));
```
{{% /runkit %}}

Tuy nhiên có một cách để tạo ra object hoàn toàn trống rỗng, không kế thừa các thuộc tính của Object.prototype là:

```
const emptyObject = Object.create(null);
```

Với cách này thì emptyObject sẽ không kế thừa các thuộc tính từ Object.prototype, nghĩa là đoạn code này sẽ có lỗi:

{{% runkit 1546487689911%}}
```
const object1 = Object.create(null);
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
console.log(object1.hasOwnProperty('hasOwnProperty'));
```
{{% /runkit %}}

Vậy nên cách an toàn là sử dụng phương thức này từ chính Object.prototype như sau:

```javascript
Object.prototype.hasOwnProperty.call(car, 'name')
```

## Lời kết

Toán tử in có tập kết quả bao trùm lên tập kết quả của hasOwnProerty. Nên tùy theo scope mà chúng ta sẽ sử dụng hàm hợp lý.
