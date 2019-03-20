---
authors:
  - vominh
date: "2018-11-13T00:07:47+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/800/1*TUt8lSXrOAZMIDyNMx14wQ.png
tags:
- flexbox
- css
- html
title: Tạo top navigation bar bằng flex box
---

Nhìn qua nhiều website, chúng ta cũng dễ nhận ra rằng có rất nhiều website chia sẻ một layout giống nhau, trong đo header và footer là giống nhau nhiều nhất:Trong bài viết này mình sẽ cùng nhau hiện thực một menu giống như vậy bằng flex box. Cụ thể là sẽ dựa vào thiết kế của Bevy để xây dựng lại một menu tương tự.

![](https://cdn-images-1.medium.com/max/1600/1*TUt8lSXrOAZMIDyNMx14wQ.png)

## Layout

![](https://cdn-images-1.medium.com/max/1600/1*38SKxdszPG-fb-7lSzEErw.png)

Nhìn vào layout này, chúng ta thấy bao gồm một container chính, chứa toàn bộ nội dung của menu, bên trong chứa hai container con bên phải và bên trái. Container bên phải chưa các action button. Container bên trái lại chứa hai con là logo và menu.

Mình đã design lại menu này, bạn có thể tải về tại đây: [menu.sketch](https://www.dropbox.com/s/687t3nu8q6zq162/menu.sketch?dl=0)

## Cấu trúc HTML

Từ phân tích ở trên, chúng ta có cấu trúc html như sau:

```
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <header class="header">
      <div class="header__left">
        <a class="header__logo"
          ><img src="https://www.bevylabs.com/static/assets/bevy/logo.png"
        /></a>
        <nav class="header__nav">
          <ul class="header__nav-item-list">
            <li class="header__nav-item"><a href="#">Customers</a></li>
            <li class="header__nav-item"><a href="#">Blog</a></li>
            <li class="header__nav-item"><a href="#">Pricing</a></li>
            <li class="header__nav-item"><a href="#">Jobs</a></li>
            <li class="header__nav-item"><a href="#">About</a></li>
          </ul>
        </nav>
      </div>
      <div class="header__right">
        <a class="header__cta" href="#">Schedule a Demo</a>
      </div>
    </header>
    <script src="src/index.js"></script>
  </body>
</html>
```

Chúng ta đặt tên class theo quy ước BEM, bạn có thể đọc tại trang này: [BEM](http://getbem.com/introduction/)

### kết quả

![](https://cdn-images-1.medium.com/max/1600/1*3pde6mvsm1KyAi8bUFAtfg.png)

Ta cần làm nhỏ logo lại:

```
img
  max-width 100%
  height auto
.header
  &__logo
    display block;
    width 105px;
```

sau đó đưa các element lên cùng một hàng:

```
.header
  display flex
```

Khi đặt giá trị của display thành flex, thì mặc định flex-direction sẽ là theo chiều horizontal, nên các children của nó sẽ được xếp lại horizontal.

### Kết quả:

![](https://cdn-images-1.medium.com/max/1200/1*hdAShTPPpxLjpiF_4X7qGw.png)

```
img
  max-width 100%
  height auto
.header
  display flex
  align-items center
  width 100%
  margin 0 30px 0
  padding 20px
  &__logo
    display block
    width 105px
  &__left
    display flex
    justify-content flex-start
    align-items center
  &__nav-item-list
    list-style none
    margin 0 0 0 50px
    padding 0
    display flex
```

Bạn đọc thêm về align-items tại đây: [CSS align-items Property](https://www.w3schools.com/cssref/css3_pr_align-items.asp)

và justify-content tại đây: [CSS justify-content Property](https://www.w3schools.com/cssref/css3_pr_justify-content.asp)

### Kết quả

![](https://cdn-images-1.medium.com/max/1600/1*04BKJsWN_KI-b5nRDA3pLg.png)

Style lại các menu item, bỏ đường gạch chân, tăng padding, margin, …:

```
a
    font-size 16px
    color rgba(0, 0, 0, 0.38)
    text-decoration none
&__nav-item-list
    list-style none
    margin 0 0 0 50px
    padding 0
    display flex
  &__nav-item
    margin-left 25px
    &:hover a
      color rgba(0, 0, 0, 1)
```

Kết quả như sau:

![](https://cdn-images-1.medium.com/max/1600/1*85a1V-AD5o6MskaJAONrJA.png)

Style button:

```
&__cta
    background-color #8B6CFF
    display block
    height 50px
    color #ffffff !important
    padding 15px 20px
    border-radius 30px
    &:hover
      box-shadow 0px 0px 24px 0px #00000059
```

Ta có kết quả cuối cùng như sau:

{{< codesandbox mop1n3wxp8 >}}

## Lời kết

Flex giúp ích rất nhiều trong việc tạo layout, không còn cần phải sự dụng float hoặc table nữa. CSS Grid cũng là một tính năng vô cùng mạnh mẽ mà chúng ta sẽ tìm hiểu ở những bài tiếp theo với cùng một ví dụ.

{{% caniuse features="flexbox" %}}
