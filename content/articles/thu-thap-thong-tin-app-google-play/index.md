---
authors:
  - vominh
date: "2018-03-08T14:06:27+07:00"
draft: false
images:
- /articles/thu-thap-thong-tin-app-google-play/images/thumbnail.png
tags:
- scraping
- JavaScript
- NodeJs
title: Lấy thông tin app trên Play Store với Javascript
---

Google không cho phép lấy thông tin của các application trên Play Store vì vậy chúng ta sẽ phải dùng cách rất thông dụng là parse và lấy thông tin từ HTML của nó.

Bài viết này sẽ sử dụng Nodejs và một vài thư viện cần thiết mà mình sẽ đề cập trong từng đoạn code.

Bạn có thể thực thi code trong bài này ở local của bạn hoặc trên chính website này. Dưới các đoạn code có nút run, click vào nút run để thực thi code, bạn cũng có thể sửa code trực tiếp.

## Yêu cầu trước khi đọc bài

1. Biết JavaScript cơ bản
1. Đã cài NPM, Node.js và biết cái cài package bằng NPM
1. Biết element selector

## Request HTML

Link trang detail của một ứng dụng có cấu trúc như sau:

```
https://play.google.com/store/apps/details?id=<appID>
```

Mình có thể sử dụng thư viện request, nếu muốn promise thì dùng thêm request-promise-native.

```javascript
require('request')
const request = require('request-promise-native')
```

Sử dụng như sau:

```javascript
function getHTML(appID) {
    return request(`https://play.google.com/store/apps/details?id=${appID}`)
}
```

Hàm này sẽ trả về promise, khi success thì chúng ta sẽ có HTML cần thiết.

## Parse fields

Sau khi có nội dung HTML của trang web, chúng ta cần parse nó ra thành dạng có cấu trúc thì mới query được, ở đây ta dùng thư viện cheerio, thư viện này cho phép chung ta query bằng element selector giống như trong jQuery vậy:

```javascript
function parseFields($) {
    const detailsInfo = $('.details-info')
    const title = detailsInfo.find('.document-title').text().trim()
    return {
        title
    }
}
```

Các selector này có thể thay đổi bất cứ lúc nào, để biết các selector ở thời điểm hiện tại, bạn cần truy cập website trên Google Play và inspect element để biết selector của nó.

_Update ngày 11/06/2018: Google đã không dùng class có tên dễ hiểu nữa mà đổi qua auto-generated-class, muốn query giờ phải tính toán nhiều hơn, xem mã nguồn của [google-play-scraper](https://github.com/facundoolano/google-play-scraper) để biết thêm_

Gộp tất cả lại chúng ta có đoạn code như sau:

{{% runkit 1546499442715%}}
```
require('request')
const request = require('request-promise-native')
const cheerio = require('cheerio')

function getHTML(appID) {
    return request(`https://play.google.com/store/apps/details?id=${appID}`)
}

function parseFields($) {
    const title = $('h1[itemprop=name]').text().trim()
    return {
        title
    }
}

function getAppInfo(appId) {
    return getHTML(appID)
        .then(cheerio.load)
        .then(parseFields)
        .catch(error => {
            console.log(error)
        })
}

const appID = 'com.orangenose.riskyrider'
const appInfo = await getAppInfo(appID)
console.log(appInfo)
```
{{% /runkit %}}

Bạn có thể chạy thử để thấy kế quả. Như vậy coi như là đã xong, không có gì quá phức tạp cả.

## Thư viện

Nhưng nếu bạn không muốn tự code thì cũng có thể sử dụng thư viện có sẵn của facundoolano: google-play-scraper. Những gì mình hướng dẫn bạn ở phía trên là mình học được khi đọc thư viện này.

Thư viện google-play-scraper chung cấp nhiều chức năng tiện dụng hơn:

1. app: Lấy tất cả thông tin của app.
1. list: Lấy danh sách app từ collection trên Google Play.
1. search: Tìm kiếm app.
1. developer: Lấy danh sách app của developer.
1. suggest: Lấy kết quả auto suggest từ chuỗi bạn truyền vào.
1. reviews: Lấy review của một app.
1. similar: lấy danh sách các app tương tự.
1. permissions: Lấy dánh sách permission của app.

Bạn đọc đầy đủ tài liệu tại repo của thư viện.

## Cài đặt

```
npm install google-play-scraper
```

hoặc

```
yarn add google-play-scraper
```

## Sử dụng

Khá đơn giản:

```
let gplay = require('google-play-scraper');
let appInfo = await gplay.app({appId: 'org.senviet.nentangdaoduc'})
console.log(appInfo)
```

## Lời kết

Ngoài ra thì tác giả này cũng làm thêm thư viện để lấy thông tin của app trên App: [App Store Scraper](https://github.com/facundoolano/app-store-scraper). Bạn cũng có thể viết ứng dụng để lấy tên nhạc trên Zing theo cách tương tự.

