---
authors:
  - vominh
date: "2018-12-26T09:36:03+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/800/1*0kYnh-CVbxaqnu8blSwyUg.png
tags:
- javascript
title: Xử lý khi không load được ảnh bằng cách sử dụng service worker
---

Có nhiều lý đo dể một website không load được ảnh, ví dụ như file ảnh đã bị xóa, ảnh quá nặng và bị timeout, … Trong những trường hợp đó thì tùy browser mà lỗi sẽ hiển thị khác nhau, có thể xấu có thể đẹp.

Bạn có handle nó hay không thì cũng không có gì lớn lao lắm, nhưng nếu có thời gian và công sức thì cứ handle cho vui và tập cái tính cẩn thận và hiện thực cái câu “deliver more than expected”. Nhưng đừng dại làm những việc nay khi project đang trong lúc nước sôi lửa bỏng nhé.

Năm nay chúng ta đã nghe khác nhiều về service worker rồi, là trái tim của PWA. Nó cho phép script của bạn chạy trong một thread riêng biệt so với thread chính, theo dõi và cang thiệp vào các network request của trang web. Bạn có thể hiện thực cache, hoặc push message bằng service worker.

Nhưng đợi đã, nếu bạn có thể can thiệp vào network request, thì bạn sẽ biết được browser đang request cái gì và có thành công hay không, bạn cũng có thể return lại một result khác cho browser. Vậy tại sao lại không dùng nó để:

1. Kiểm tra xem có phải đang request ảnh hay không
2. Kiểm tra xem kết quả thành công hay không
3. Nếu không thành công thì return về một tấm ảnh placeholder nào đó.

## Register service worker

Bạn phải đăng ký với browser file mà bạn sẽ dùng để chạy như là một service worker, việc này được thực hiệnbằng JavaScript. Giả sự bạn có file main.js được load trong trang, và bạn sẽ cần viết code đăng ký file service worker trong file đó như sau:

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}
```

Trong ví dụ này, file service worker của chúng ta có tên là service-worker.js. Bạn lưu ý một vài yêu cầu như sau:

1. File service-worker.js phải nằm ở root level, không được nằm trong thư mục.
2. Website phải sử dụng SSL (HTTPS)

## Handle fetch event

Service work hoạt động dựa vào event, nghĩa là browser sẽ gọi các event, bạn lắng nghe và hồi đáp.

Event fetch được gọi khi browser cần request resource. Chúng ta sẽ lắng nghe event này file trong file service-worker.js:

```js
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
        .then((response) => {
            if (response.ok) return response;
            // User is online, but response was not ok
        })
        .catch((err) => {
            // User is probably offline
        })
  )
});
```

Thuộc tính ok cho chúng ta biết việc request này có nhận được kết quả ok hay không. Nếu nó ok, thì không có gì phải nói, cứ return lại response là được, trong trường hợp không ok thì request tới một tấm ảnh khác và return lại response:

```js
function isImage (fetchRequest) {
  return fetchRequest.method === 'GET' && fetchRequest.destination === 'image'
}

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
        .then((response) => {
            if (response.ok) return response
            if (!isImage(e.request)) return response
            return fetch('/broken.png')
        })
        .catch((err) => {
            if (isImage(e.request)) {
                return fetch('/broken.png')
            }
        })
    )
})
```

## Precache image

Chúng ta không thể cứ mãi fetch lên server để lấy file broken.png mãi đúng không, chúng ta đang ở trong service worker, và chúng ta có quyền cache. Có thể cache file này khi service worker được install, sau đó lấy từ trong cache ra để hồi đáp lại browser:

```js
self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open("precache").then((cache) => {
            // Add /broken.png to "precache"
            cache.add("/broken.png");
        })
    );
});
```

Giờ quay lại event fetch và thay `fetch('/broken.png')` bằng `caches.match('/broken.png')`

Đoạn code đầy đủ sẽ như sau:

{{< gist nguyenvanduocit 2b8cc058f5c097436a6ecb2bb4dd523e >}}

## Demo

Bạn xem demo tại đây: [Handling Broken Images With Serice Worker](https://relaxed-panini-d5b8df.netlify.com/). — demo của athlonUA.
