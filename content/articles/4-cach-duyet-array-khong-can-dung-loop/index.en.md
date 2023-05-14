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
title: 4 ways to traverse an array without using a loop
slug: 4-way-to-traverse-an-array-without-using-a-loop
---

Like many other languages, JavaScript has many ways to solve problems. Perhaps anyone learning to program needs to understand basic structures such as loops and branches. And in most cases where you need to traverse an array, you can use a loop structure.

In this article, we will explore a few different ways to traverse the elements of an array without needing to use a for or forEach loop.

## map()

As the name suggests, map helps us map the elements of an array to a new array. We have the following example:

{{< runkit demo-1  >}}
const evens = [2, 4, 6, 8, 10];
let odds = [];
for (let index = 0; index < evens.length; index++) {
    odds.push(evens[index]+1);
}
console.log(odds);
{{< /runkit >}}

Our goal is to map, but we are using a loop, and we have to comment, //I am mapping an even number string to odd numbers. The code would be more understandable and meaningful if we used the map method as follows:

{{< runkit demo-2  >}}
const evens = [2, 4, 6, 8, 10];
let odds = evens.map(number => number + 1)
console.log(odds);
{{< /runkit >}}

The code is much more streamlined without obscuring the meaning. When you read it, you understand that the map method is used to map the elements of 'evens' with the number 1 to create an array of odd numbers, rather than having to strain your brain to understand the for loop.

For map, the callback function can take up to three arguments in the following order: currentElement, Index, originalArray:

```
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
    // Trả về element mới cho new_array
}[, thisArg])
```

The value or reference you return from the callback function will be used as an element of the new array, so you need to pay attention to what you return: value or reference.

{{< runkit 1545992740713 >}}
const object = {
    prop1: 1
};

let a = [object].map(o => o);

a[0].prop1 = 2;
console.log(object, a);
{{< /runkit >}}

## filter()

Filtering an array is a very common task, you might have an example like this::

{{< runkit 1545992765617 >}}
const randoms = [4,6,78,2,34,8,90,34,23,23,5,6,234,435];
let odds = [];
randoms.forEach(number => {
    if (number % 2 != 0) {
        odds.push(number)
    }
})
console.log(odds);
{{< /runkit >}}

But like map, looking at this code you have to read the logic inside the for loop before you realize: oh, so it's filtering. But look at the code below, do you need to read much beyond the keyword filter:

{{< runkit 1545992783479 >}}
const randoms = [4,6,78,2,34,8,90,34,23,23,5,6,234,435];
let odds = randoms.filter(number => number % 2 != 0);
console.log(odds);
{{< /runkit >}}

Once again, the code is more concise and easier to understand.

Unlike map(), the callback function of the filter method accepts a boolean return value. If it returns true, the corresponding element will be added to a new array. If it returns false, the element will be skipped.

## every() and some()

Sure, you may have encountered a problem like this before: How to check if all elements of an array satisfy a certain condition?

{{< runkit 1545992803057 >}}
const numbers = [2, 4, 6, 8, 11];
let isEveryEvens = true;
numbers.forEach(e => {
    if (e % 2 != 0) {
        isEveryEvens = false;
    }
});
console.log(isEveryEvens);
{{< /runkit >}}

The every() method iterates over all elements of an array and ensures that every element satisfies the callback function. The callback function should return either true or false.

{{< runkit 1545992824674 >}}
const numbers = [2, 4, 6, 8, 12];
let isEveryEvens = numbers.every(e => e %2 == 0)
console.log(isEveryEvens);
{{< /runkit >}}

In the opposite case, we use the some() method to check if any element in the array satisfies a given condition or not:

{{< runkit 1545992837038 >}}
const numbers = [2, 4, 6, 8, 11];
let isSomeOdd = numbers.some(e => e %2 !== 0)
console.log(isSomeOdd);
{{< /runkit >}}

## Conclusion

As you have seen in the examples, using these methods helps make the code more concise and easier to understand to some extent. The names of the methods you use already indicate your intentions, so there is no need for comments, and readers don't have to struggle to figure out whether you want to map, filter, or perform other operations.

## References

1. [You might not need a loop](https://bitsofco.de/you-might-not-need-a-loop/)
