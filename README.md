![](https://github.com/12bitvn/12bit.vn/workflows/deploy/badge.svg)

# 12bit.vn

12bit.vn là blog chuyên về phát triển web. Tụi mình viết về những công nghệ mà tụi mình đang làm hằng ngày như Golang, Vue.js, PHP, WordPress hoặc [những công nghệ mà bạn biết](#đóng-góp-nội-dung). Mời các bạn đọc qua bài [giới thiệu](https://12bit.vn/pages/about/) để hiểu về tinh thần của tụi mình khi xây dựng 12bit

## Đóng góp nội dung

1. Vì blog phát triển dựa trên Hugo vì vậy các bạn cần phải [cài đặt Hugo](https://github.com/12bitvn/hugo). **Vì tụi mình đã tùy chỉnh lại Hugo để thêm những tính năng mà Hugo mặc định không có, vì vậy các bạn hãy cài đặt Hugo theo bản custom của tụi mình nhé.**
2. Fork repo này về GitHub của các bạn.
3. Cài đặt các package cần thiết: `yarn install`
4. Gõ lệnh `hugo new articles/your-post-slug/index.md` trên terminal để tạo một bài viết mới. Sau khi gõ lệnh một file markdown sẽ được tạo ở đường dẫn `content/articles/your-post-slug/index.md`.

  Các bạn có thể tham khảo phần front matter bên dưới để định dạng cho bài viết của mình:

    ```
    ---
    title: Widget hiển thị số order trên Touchbar với BetterTouchTool
    description: Hướng dẫn tạo widget hiển thị số lượng order từ shopfiy lên touchbar
    date: 2019-03-08T14:13:39+07:00
    tags:
      - touchbar
      - golang
      - shopify
    images:
      - /articles/tao-widget-tren-touchbar/thumbnail.png
    authors:
      - vominh
    draft: false
    ---
    ```

  Phần authors sẽ liên kết bài viết tới tài khoản github của bạn. Với ví dụ trên thì tài khoản github sẽ là:
```
https://github.com/vominh
```

5. Trong lúc viết bài các bạn hãy dùng `hugo serve` để xem những thay đổi.
6. Sau khi viết bài xong, các bạn hãy tạo Pull Request. Tụi mình sẽ review bài viết và có những feedback ngược lại nếu cần.

**Shortcodes**

Trong lúc viết bài, các bạn có thể sử dụng shortcode của Hugo để bài viết trực quan hơn mà không phải viết HTML. Các bạn truy cập vào [trang shortcode của Hugo](https://gohugo.io/content-management/shortcodes/) để xem những shortcode được hỗ trợ. Ngoài những shortcode mặc định, tụi mình có tạo thêm khá nhiều shotcode. Các bạn có thể xem [tại đây](https://12bit.vn/pages/shortcodes.html)

**Hình ảnh**

Tất cả hình ảnh cho bài viết các bạn có thể đặt trong `content/articles/your-post-slug/images`. Và được gọi ra bài viết như sau:

```
![image title](/articles/your-post-slug/images/wonderful-pic.jpg)
```

**Hình đại diện cho bài viết**

Hình đại diện này được sử dụng cho việc hiển thị bài viết được share trên mạng xã hội. Nếu bạn tự thiết kế được thì quá tốt, nếu không thì có thể dùng tool [social-image-gen](https://github.com/12bitvn/social-image-gen) để tự generate ra hình dựa theo nội dung bài viết, ví dụ như hình bên dưới tụi mình đã dùng tool để tự tạo.

![thumbnail](https://user-images.githubusercontent.com/3280351/56181308-1c8d4980-6037-11e9-959b-fa59e91aaba6.png)
