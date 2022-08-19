---
title: "Marquee - The modern way"
description: A short description for the post.
date: 2022-08-18T17:25:13+07:00
tags:
  - marquee
images:
  - /articles/marquee/thumbnail.png
authors:
  - tatthien
draft: false
---

Trước đây chúng ta biết tới element `<marquee>` dùng để tạo hiệu ứng di chuyển nội dung qua lại. Tuy nhiên, element này đã bị deprecated và được khuyên là không nên tiếp tục sử dụng. Các bạn có thể xem thêm trên [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee).

Vậy ngày nay, nếu chúng ta muốn làm hiệu ứng tương tự như cách `<marquee` thì làm thế nào? Bài viết hôm nay mình xin đi qua cách tiếp cận hiện đại với HTML và CSS.

Trước tiên cùng xem qua demo nhé

{{<codepen tatthien oNqJqrB 400>}}

## Cấu trúc HTML

```html
<div class="marquee">
  <ul class="marquee__content">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <!-- Phần nhân đôi, tương tự phía trên -->
  <ul class="marquee__content" aria-hidden="true">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
```

{{% alert info %}}
Các bạn nhớ set `aria-hidden="true"` cho những phần nhân đôi lên, để ẩn nội dung đó khỏi screen reader.
{{% /alert %}}

## CSS

Dưới đây là full CSS để làm hiệu ứng marquee.

```css
* {
  margin: 0;
  padding: 0;
}

.marquee {
  --gap: 1rem;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
}

.marquee__content {
  list-style: none;
  display: flex;
  flex-shrink: 0;
  min-width: 100%;
  justify-content: space-around;
  animation: scroll 10s infinite linear;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
```

Mình quyết định không break out từng CSS rule ra để giải thích, thay vào đó các bạn có thể tương tác thông qua demo bên dưới để thấy mỗi rule sẽ ảnh hưởng thế nào đến hiệu ứng này.

<iframe src="/sandbox/marquee-the-modern-way.html" class="w-full" frameborder="0" height="450"></iframe>

## Credit

- Mình tham khảo code từ [bài viết này](https://ryanmulligan.dev/blog/css-marquee/)
- Logo trong phần demo được lấy từ [Figma](https://www.figma.com/community/file/776004440443044051)

