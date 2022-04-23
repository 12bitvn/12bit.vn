![Deploy](https://github.com/12bitvn/12bit.vn/workflows/Deploy%20Production/badge.svg)

# 12bit.vn

Trên 12bit, tụi mình viết về những công nghệ mà tụi mình đang làm hằng ngày như Golang, Vue.js, PHP, WordPress hoặc [những công nghệ mà bạn biết](#đóng-góp-nội-dung). Mời bạn đọc qua bài [giới thiệu](https://12bit.vn/pages/about/) để hiểu về tinh thần của tụi mình khi xây dựng 12bit.

## Đóng góp nội dung

1. Vì blog phát triển dựa trên Hugo vì vậy các bạn cần phải [cài đặt Hugo](https://gohugo.io/getting-started/installing/).
2. Fork repo này về GitHub của các bạn.
3. Cài đặt các package cần thiết: `pnpm install`
4. Gõ lệnh `hugo new articles/slug-bai-viet/index.md` trên terminal để tạo một bài viết mới. Sau khi gõ lệnh một file markdown sẽ được tạo ở đường dẫn `content/articles/slug-bai-viet/index.md`.

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

Trong lúc viết bài, các bạn có thể sử dụng shortcode của Hugo để bài viết trực quan hơn mà không phải viết HTML. Các bạn truy cập vào [trang shortcode của Hugo](https://gohugo.io/content-management/shortcodes/) để xem những shortcode được hỗ trợ. Ngoài những shortcode mặc định, tụi mình có tạo thêm khá nhiều shotcode. Các bạn có thể xem [tại đây](https://12bit.vn/pages/shortcodes)

**Hình ảnh**

Tất cả hình ảnh cho bài viết các bạn có thể đặt trong `content/articles/slug-bai-viet/images`. Và được gọi ra bài viết như sau:

```
![image title](/articles/slug-bai-viet/images/wonderful-pic.jpg)
```
