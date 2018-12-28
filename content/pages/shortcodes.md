---
title: "Shortcodes"
description: Danh sách custom shortcodes.
date: 2018-12-28T13:15:32+07:00
thumbnail: /img/posts/default-thumb-1200-630.png
author:
    name: 12bit Team
    github: 12bitvn
draft: false
---

Bên cạnh những [shortcode đã được tích hợp sẵn](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes) trong Hugo, tụi mình còn build thêm một số shortcode để phục vụ cho việc thể hiện nội dung bài viết được rõ ràng và sinh động hơn.

## CodePen

```
{{</*codepen username pen_id*/>}}
```

Ví dụ

```
{{</*codepen tatthien LgMKpm*/>}}
```

{{<codepen tatthien LgMKpm>}}

## Alert box

Thay vì dùng `{{</* */>}}` chúng ta sẽ dùng `{{%/* */%}}` để có thể sử dụng Markdown bên trong shortcode.

```markdown
{{%/* alert type */%}}
Nội dung bên trong.
{{%/* /alert */%}}
```

### Success

```markdown
{{%/* alert success */%}}
Chúc mừng! **bạn đã được tăng lương**.
{{%/* /alert */%}}
```

{{% alert success %}}
Chúc mừng! **bạn đã được tăng lương**.
{{% /alert %}}

### Warning

```markdown
{{%/* alert warning */%}}
Chú ý ngã 4
{{%/* /alert */%}}
```

{{% alert warning %}}
Chú ý ngã 4
{{% /alert %}}

### Danger

```markdown
{{%/* alert danger */%}}
Xin đừng hút thuốc
{{%/* /alert */%}}
```

{{% alert danger %}}
Xin đừng hút thuốc
{{% /alert %}}

### Info

```markdown
{{%/* alert info */%}}
https://12bit.vn là nơi chia sẻ kiến thức lập trình web.
{{%/* /alert */%}}
```

{{% alert info %}}
https://12bit.vn là nơi chia sẻ kiến thức lập trình web.
{{% /alert %}}
