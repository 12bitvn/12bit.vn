---
authors:
  - tatthien
date: "2018-03-05T17:45:43+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*3sMN6Ni2PRo_LEcrSdGc0g.jpeg
tags:
- vuejs
- javascript
- plugin
title: Viết plugin notification đơn giản cho Vue.js
---

Bài viết hôm nay chúng ta sẽ cùng tìm hiểu cách viết plugin đơn giản cho Vue có chức năng hiển thị notification thông qua việc sử dụng thư viện [notie](https://github.com/jaredreich/notie).

## Giới thiệu sơ lược

{{% alert info %}}
Plugins usually add global-level functionality to Vue.
{{% /alert %}}

Theo như lời giới thiệu trên vuejs.org thì việc sử dụng plugin sẽ giúp chúng ta thêm những tính năng ở tầng global.

Việc dùng plugin cũng trở nên thuận tiện khi chúng ta có thể sử dụng những tính năng bên ngoài mà không cần phải viết trực tiếp vào ứng dụng của mình. Nếu không cần sử dụng nữa, chúng ta có thể gỡ bỏ dễ dàng.

Có những loại plugin chúng ta có thể viết cho Vue như:

- Thêm những phương thức, thuộc tính global
- Thêm directives/filters/transitions global
- Thêm component options global
- …

Xem thêm tại https://vuejs.org/v2/guide/plugins.html

## Bắt đầu

### Cài đặt thư viện notie

```sh
yarn add notie
```

### Viết plugin

Trước tiên ta tạo một file `plugins/vue-notie.js` và khởi tạo code như sau:

```javascript
export default {
  install (Vue, options) {
    Vue.mixin({
      // global assets go here
    })
  }
}
```

Tiếp theo chúng ta sẽ import và gọi plugin.

```javascript
import Vue from 'vue'
import VueNotie from './plugins/vue-notie'
Vue.use(VueNotie)
```

Mục đích của plugin này là tạo ra các hàm hiển thị notification, vì vậy chúng ta chỉ cần khai báo methods trong mixin.

Cứ tiếp tục như vậy, chúng ta viết tiếp các hàm như: `$_vuenotie_warning, $_vuenotie_error, $_vuenotie_infor`

```javascript
import { alert } from 'notie'

export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        $_vuenotie_success (message) {
          alert({
            type: 1,
            text: message
          })
        },
        $_vuenotie_warning (message) {
          alert({
            type: 2,
            text: message
          })
        },
        $_vuenotie_error (message) {
          alert({
            type: 3,
            text: message
          })
        },
        $_vuenotie_infor (message) {
          alert({
            type: 4,
            text: message
          })
        }
      }
    })
  }
}
```

### Sử dụng trong component

Sử dụng inline trong HTML

```html
<template>
  <div class="notifications">
    <button @click="$_vuenotie_success('Success!')">Success</button>
    <button @click="$_vuenotie_warning('Warning!')">Warning</button>
    <button @click="$_vuenotie_error('Error!')">Error</button>
    <button @click="$_vuenotie_infor('Information!')">Information</button>
  </div>
</template>
```

Hoặc:

```javascript
export default {
  methods: {
    success (message) {
      this.$_vuenotie_success(message)
    }
  }
}
```

Kết quả:

![](https://cdn-images-1.medium.com/max/800/1*O--GSiTWg0sQWyVFPMDYCA.gif)

## Kết luận

Bài viết này giúp bạn có những khái niệm cơ bản nhất và tập làm quen với việc viết plugin cho Vuejs. Bạn có thể nghĩ ra nhiều ý tưởng hay cho plugin và áp dụng những kỹ thuật trên.
