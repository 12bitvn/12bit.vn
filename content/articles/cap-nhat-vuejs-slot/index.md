---
title: "Cập nhật tất cả về slot trong Vue.js"
description: A short description for the post.
date: 2020-03-06T09:41:00+07:00
tags: 
  - slot
  - vuejs
  - javascript
  - scoped-slot
images:
  - /articles/cap-nhat-vuejs-slot/images/thumbnail.png
authors:
  - tatthien
draft: false
---

Dạo gần đây 12bit nhận thấy số lượng bạn đọc về slot trong Vue.js rất nhiều. Vì vậy tụi mình quyết định cập nhật lại bài viết [Tìm hiểu về slot và scoped slots trong Vue.js](/articles/tim-hieu-ve-slot-va-scoped-slots-trong-vuejs) đã khá là mốc meo 2 năm về trước.

Trong phiên bản **2.6.0** `v-slot` được giới thiệu để thay thế cho `slot` và `scope-slot`. 

{{% alert info %}}
Tuy nhiên bạn vẫn có thể sử dụng `slot` và `slot-scope` trong các phiên bản release `2.x`, đến phiên bản Vue 3 thì chúng sẽ bị xóa.
{{% /alert %}}

## Cập nhật 1: Slot được đặt tên (Named slots)

Giả sử chúng ta có 1 component là `Cart.vue` với nội dung như sau:

<div class="filename">Cart.vue</div>

```html
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

Để truyền nội dung vào phần title và description chúng ta sẽ viết như sau:

Cách mới:

<div class="filename">App.vue</div>

```html
<div class="parent">
 <card>
   <template v-slot:header>
     <h2>Vue.js is awesome</h2>
   </template>

   <p>The Progressive JavaScript Framework</p>
   <p>Another paragraph</p>

   <template v-slot:footer>
     <p>Created by Evan You</p>
   </template>
 </card>
</div>
```

Các bạn chú ý rằng `v-slot` chỉ có thể sử dụng trong `<template>`. Ngoài trừ một trường hợp mà mình sẽ nói ở phần scoped slot.

<div class="expand-width">
  <iframe
    src="https://codesandbox.io/embed/lucid-surf-g8r9x?autoresize=1&fontsize=14&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="12bit.vn - [Demo] Named Slot"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
</div>

Cách cũ:

<div class="filename">App.vue</div>

```html
<div id="app">
 <card>
   <h2 slot="header">Vue.js is awesome</h2>

   <p>The Progressive JavaScript Framework</p>
   <p>Another paragraph</p>

   <p slot="footer">Created by Evan You</p>
 </card>
</div>
```

## Cập nhật 2: Scoped slots