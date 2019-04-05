---
author:
  github: 12bitvn
  name: 12bit Team
date: "2018-12-28T13:15:32+07:00"
description: Danh sách custom shortcodes.
draft: false
thumbnail: /img/articles/default-thumb-1200-630.png
title: Shortcodes
---

Bên cạnh những [shortcode đã được tích hợp sẵn](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes) trong Hugo, tụi mình còn build thêm một số shortcode để phục vụ cho việc thể hiện nội dung bài viết được rõ ràng và sinh động hơn.

## contributers

```markdown
{{</*contributors "12bitvn/12bit.vn"*/>}}
```

{{<contributors "12bitvn/12bit.vn">}}

## codepen

```
{{</* codepen username pen_id height_in_px */>}}
```

Nếu không set giá trị `height` thì `height` mặc định sẽ là 500px. Ví dụ:

```
{{</* codepen tatthien LgMKpm 400 */>}}
```

{{<codepen tatthien LgMKpm 400>}}

## alert

Thay vì dùng `{{</* */>}}` chúng ta sẽ dùng `{{%/* */%}}` để có thể sử dụng Markdown bên trong shortcode.

```markdown
{{%/* alert type */%}}
Nội dung bên trong. **Tự tin dùng markdown đi các bạn!**
{{%/* /alert */%}}
```

### success

```markdown
{{%/* alert success */%}}
Chúc mừng! **bạn đã được tăng lương**.
{{%/* /alert */%}}
```

{{% alert success %}}
Chúc mừng! **bạn đã được tăng lương**.
{{% /alert %}}

### warning

```markdown
{{%/* alert warning */%}}
Chú ý ngã 4
{{%/* /alert */%}}
```

{{% alert warning %}}
Chú ý ngã 4
{{% /alert %}}

### danger

```markdown
{{%/* alert danger */%}}
Xin đừng hút thuốc
{{%/* /alert */%}}
```

{{% alert danger %}}
Xin đừng hút thuốc
{{% /alert %}}

### info

```markdown
{{%/* alert info */%}}
https://12bit.vn là nơi chia sẻ kiến thức lập trình web.
{{%/* /alert */%}}
```

{{% alert info %}}
https://12bit.vn là nơi chia sẻ kiến thức lập trình web.
{{% /alert %}}

## runkit

```markdown
{{%/* runkit */%}}
your code block with ``` code and ```
{{%/* /runkit */%}}
```

{{% runkit %}}
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

## caniuse

```markdown
{{</* caniuse features="proxy" */>}}
```

{{< caniuse "proxy" >}}

## mermaid

```markdown
{{</* mermaid */>}}
graph TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
{{</* /mermaid */>}}
```

{{< mermaid >}}
graph TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
{{< /mermaid >}}

## image-zoom

```markdown
{{</* zoom-img src="/img/articles/default-thumb-1200-630.png" */>}}
```

{{< zoom-img src="/img/articles/default-thumb-1200-630.png" >}}

## oembed

```markdown
{{</* oembed url="https://open.spotify.com/playlist/37i9dQZEVXbc3uyDjJcA7l" title="ahhi" */>}}
```

{{< oembed url="https://open.spotify.com/playlist/37i9dQZEVXbc3uyDjJcA7l">}}

{{< oembed url="https://www.facebook.com/12bit.vn/photos/a.204143553518059/341131916485888/?type=3&theater">}}

## gh-repos

```markdown
{{</*gh-repos "vuejs/vue"*/>}}
```

{{<gh-repos "vuejs/vue">}}
