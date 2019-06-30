---
title: "Giới thiệu về Openlayers"
description: Bài viết này mình xin giới thiệu về một thư viện frontend mã nguồn mở dùng để vẽ map.
date: 2019-06-23T02:43:20+09:00
tags:
  - openlayers
  - map
  - javascript
images:
authors:
  - loclv
---

Bài viết này mình xin giới thiệu về một thư viện frontend mã nguồn mở dùng để vẽ map.

## Mở đầu

Bài toán: bạn muốn mô tả vị trí của cửa hàng hay cơ sở kinh doanh của mình lên trang web.

Giải pháp phổ biến nhất hiện nay là dùng [google map jsAPI](https://developers.google.com/maps/documentation/javascript/tutorial) do api này có UI/UX tương đối đẹp, map data khá đầy đủ.

Ngoài ra có một số map library mã nguồn mở khác trong đó có [openlayers](https://openlayers.org/)

Theo như quảng cáo thì thư viện này miễn phí, có hiệu năng cao, được đóng gói theo từng chức năng(tối ưu được băng thông mạng), hiển thị được nhiều dạng dữ liệu như ảnh, vector.

Theo như [npm của thư viện này](https://www.npmjs.com/package/ol) thì số lượng tải hàng tuần là ~46k lần tại thời điểm viết bài.

Theo như [github cuả thư viện](https://github.com/openlayers/openlayers) thì số lượng "star" chỉ là ~5k, khá khiêm tốn so với [leaflet](https://github.com/Leaflet/Leaflet) (leaflet cũng là 1 thư viện js open-source về map).

## Cách sử dụng

Thông thường có 2 cách để sử dụng js library, đó là:

- Cách 1:
Dùng CDN (Content Delivery Network - mạng phân phối nội dung) tức là dùng thẻ <script src=""></script> trong file html để lấy sourcecode của library về. Tuy nhiên, trên [cdnjs của openlayers](https://cdnjs.com/libraries/openlayers) chưa được update các phiên bản mới.

Nếu bạn dùng srcURL như [quickstart](https://openlayers.org/en/latest/doc/quickstart.html) tại thời điểm viết bài này, thì chú ý là [RawGit](https://cdn.rawgit.com/) chỉ phục vụ đến tháng 10 2019.

codepen demo cách 1:

{{< codepen loclv YoeVmW >}}

- Cách 2:
Dùng ol package thông qua npm. Cách này được openlayers khuyến khích dùng, có lẽ là vì dễ dàng debug, quản lý các phiên bản openlayers. Ngoài ra, bạn có thể dùng bản beta của phiên bản thứ 6 (thời điểm hiện tại phiên bản hoạt động ổn định là 5.3.3)



Với cách 2, các bạn làm như [hướng dẫn này](https://openlayers.org/en/latest/doc/tutorials/bundle.html).

Cụ thể là sử dụng [Parcel](https://parceljs.org/) - 1 web-app bundler cũng tính năng như [webpack](https://webpack.js.org/)

Tạo thư mục chứa project:

```sh
mkdir new-project && cd new-project
```

Sử dụng npm:

```sh
npm init
```

Cài gói ol:

```sh
npm install ol
```

Cài gói parcel để dev:

```sh
npm install --save-dev parcel-bundler
```

Tạo file index.js với nội dung:

```js
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 0
  })
});
```

Tạo file index.html với nội dung:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Using Parcel with OpenLayers</title>
    <style>
      #map {
        width: 400px;
        height: 250px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="./index.js"></script>
  </body>
</html>
```

Sửa file package.json phần scripts với nội dung:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "parcel index.html",
  "build": "parcel build --public-url . index.html"
}
```

Khởi động web-app trên local để dev:

```sh
npm start
```

Mở http://localhost:1234/ bằng trình duyệt và bạn sẽ thấy map được hiển thị.

Khi bạn sửa code, thì trang sẽ tự động load lại.

Để release:

```sh
npm run build
```

Sau đó, copy thư mục dist/ lên server.

## Giải thích code

Để chứa và đánh dấu chỗ để vẽ map thì ở file html ta dùng thẻ:

```html
<div id="map"></div>
```

Chính thẻ này quyết định kích thước của map nên có thể set:

```html
<div id="map" style="width: 100%, height: 400px"></div>
```

Đi cùng với đó thì trong file js:

```js
var map = new Map({target: 'map'});
```

target ở đây chính là id của thẻ div bên trên.

Tiếp đến là đối tượng View:

```js
view: new View({
  center: [0, 0],
  zoom: 0
})
```

View quy định các tuỳ biến như tạo độ trung tâm (center), độ zoom của bản đồ, phép chiếu..

Ví dụ sửa file index.js để hiển thị trung tâm Hà Nội

```js
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

const hanoi = [105.804817, 21.028511];

const hanoiWebMercator = fromLonLat(hanoi);

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: hanoiWebMercator,
    zoom: 11
  })
});
```

Tiếp đến là Layer - các lớp của map. Ở đây ta sử dụng kiểu TileLayer - dạng ảnh.

TileLayer được khởi tạo từ Source. Cụ thể Source ở đây ta sử dụng là OpenStreetMap.

Tức là dữ liệu hiển thị trên bản đồ đến từ OpenStreetMap.

Tất nhiên, dữ liệu đến từ các nguồn khác nhau sẽ có độ chính xác và thiết kế UI khác nhau. Ở một số quốc gia sẽ có các công ty về map data. Ví dụ như Nhật thì có công ty Zenrin, Hàn thì có công ty SK telecom.

## Tổng kết

Qua bài viết này các bạn phần nào biết cách dùng map trong các dự án web-app, cụ thể là openlayers.

[sourcecode openlayers](https://github.com/openlayers/openlayers)

[sourcecode dùng webpack, es6, sass](https://github.com/loclv/openlayersSap)

[openlayers workshop](https://openlayers.org/workshop/en/) là nơi hướng dẫn sử dụng thư viện này khá chi tiết theo từng bước thực hành.

Nếu các bạn có ý kiến đóng góp gì xin hãy comment ở bên dưới nhé!
