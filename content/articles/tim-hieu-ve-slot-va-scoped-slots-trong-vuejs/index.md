---
authors:
  - tatthien
date: "2018-03-26T10:10:50+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*qgwDRRz5olTU0BitXlSmVQ.jpeg
tags:
- vuejs
- slot
- javascript
title: Tìm hiểu về slot và scoped slots trong Vue.js
---

Trong quá trình phát triển ứng dụng với Vue.js, chắc hẳn các bạn sẽ gặp những trường hợp muốn chèn nội dụng HTML vào bên trong component con giống như cách chúng ta viết HTML thông thường thay vì dùng `prop`. Ví dụ như:

```html
<div class="parent">
  <child>
    <p>Hello from parent</p>
  </child>
</div>
```

Để làm được việc này, Vue.js cung cấp `<slot></slot>` giúp chúng ta có thể chèn nội dung từ component cha vào component con.

## Các loại slot

### Căn bản

Cùng tìm hiểu cách dùng căn bản của slot. Chúng ta có component con childsử dụng slot như sau:

```html
<div class="children">
  <h2>This is children component</h2>
  <slot></slot>
</div>
```

Component cha chèn nội dung vào bên trong child

```html
<div class="parent">
  <h2>This is parent component</h2>
  <child>
    <p>Hello from parent</p>
  </child>
</div>
```

Nội dung sau khi render ra như sau:

```html
<div class="parent">
  <h2>This is parent component</h2>
  <div class="children">
    <h2>This is children component</h2>
    <p>Hello from parent</p>
  </div>
</div>
```

{{<codepen tatthien rdGJeG>}}

### Fallback content

Tất cả nội dung bên trong `<slot></slot>` sẽ được dùng làm fallback content khi component cha không chèn bất kì thứ gì vào component con. Ví dụ:

```html
<div class="children">
  <h2>This is children component</h2>
  <slot><p>This is the fallback content</p></slot>
</div>
```

Component cha gọi tới `child` nhưng không chèn nội dung vào:

```html
<div class="parent">
  <h2>This is parent component</h2>
  <child></child>
</div>
```

Kết quả khi render ra sẽ hiển thị nội dung fallback:

```html
<div class="parent">
  <h2>This is parent component</h2>
  <div class="children">
    <h2>This is children component</h2>
    <p>This is the fallback content</p>
  </div>
</div>
```

{{<codepen tatthien XEeZjV>}}

### Slot được đặt tên

`slot` có một thuộc tính đặc biệt là `name` giúp chúng ta có thể đặt tên cho `slot` đó. Trong một component có thể chứa nhiều `slot` với tên khác nhau và Vue.js cũng cho phép có một `slot` không được đặt tên để chứa những nội dung không trùng khớp với bất kì slot name nào trong component. Chúng ta cùng xem qua ví dụ cho dễ hiểu.

Ta có một componet `card` gồm 3 phần `header`, `content`, `footer` Ta sẽ đặt vào 3 slot như sau:

```html
<!-- Component card -->
<div class="card">
  <header class="card-header">
    <slot name="header"></slot>
  </header>

  <div class="card-content">
    <slot></slot>
  </div>

  <footer class="card-footer">
    <slot name="footer"></slot>
  </footer>
</div>
```

Component cha sử dụng và truyền nội dung:

```html
<div class="parent">
 <card>
   <h2 slot="header">Vue.js is awesome</h2>
   <p>The Progressive JavaScript Framework</p>
   <p>Another paragraph</p>
   <p slot="footer">Created by Evan You</p>
 </card>
</div>
```

Kết quả render:

```html
<div class="card">
  <header class="card-header">
    <h2>Vue.js is awesome</h2>
  </header>

  <div class="card-content">
    <p>The Progressive JavaScript Framework</p>
  </div>

  <footer class="card-footer">
    <p>Created by Evan You</p>
  </footer>
</div>
```

{{<codepen tatthien WzZMjG>}}

### Scoped slots

Scoped slots là một loại đặt biệt của slot giúp bạn có thể truyền dữ liệu từ component con lên component cha thông qua việc gán dữ liệu thông qua thuộc tính (nó cũng tương tự việc đưa dữ liệu vào props của component). Chúng ta cùng xem qua ví dụ:

Mình có một `child` như sau:

```html
<div class="children">
  <slot text="Hello from child!"></slot>
</div>
```

Như các bạn thấy, mình truyền vào slot một attribute là `text` kiểu như prop bạn thường thấy khi truyền vào component.

Tiếp theo đến component cha. Chúng ta sẽ lấy nội dung từ `text` thông qua thuộc tính `slot-scope`

```html
<div class="parent">
  <p>Hello from parent</p>
  <child>
    <p slot-scope="props" v-text="props.text"></p>
  </child>
</div>
<!-- Hoặc có thể dùng tính năng destructuring syntax của ES2015 -->
<p slot-scope="{ text }" v-text="text"></p>
```

> Những kiểu dữ liệu có thể sử dụng trong scoped slots có thể là string, number, object, array thậm chí bạn có thể truyền method.

## Lời kết

Bài viết đã đi qua sơ lượt về slot trong Vue.js. Hiện tại bản dịch tiếng Việt của phần này đã có, bạn có thể tìm hiểu thêm.

## Tham khảo

https://vi.vuejs.org/v2/guide/components.html#Scoped-slot
https://vuejs.org/v2/api/#vm-scopedSlots
https://adamwathan.me/renderless-components-in-vuejs/
