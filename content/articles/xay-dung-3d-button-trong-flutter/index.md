---
authors:
  - vominh
date: "2018-12-10T16:24:00+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*RRIkgyR8vHZFB2bX5G9M3g.png
tags:
- flutter
- mobile
- ui
title: Xây dựng 3D button trong Flutter
---

2 ngày trước, phiên bản 1.0 của Flutter được chính thức phát hành trong sự kiện Flutter Live.

{{< youtube kpcjBD1XDwU >}}

Nhưng cộng đồng đã có thể sử dụng Flutter từ khá lâu thông qua các version beta, thậm chí đã nhiều production application được phát hành, như app Google Ads, Alibaba, NOW Live của Tencent , bạn có thể xem thêm tại trang showcase.

Mặc định Flutter hỗ trợ sẵn các style cho widget như Cupertino cho iOS và Material cho Android. Tuy nhiên, Flutter không giống như native app, nó không phụ thuộc vào hệ điều hành, mà Flutter có một UI rending engine riêng, nên bạn có thể làm chủ từng pixel được vẽ trên UI. Việc xây dựng UI dễ và đơn giản hơn.

Trong bài viết này mình sẽ cùng với các bạn xây dựng môt button 3D, button này thường được sử dụng trong game, mình đã xây dựng nó khi build một game nho nhỏ bằng Flutter.

![](https://cdn-images-1.medium.com/max/800/1*cm7XzQ3Hc3eNJ8Eae7V4bQ.png)

## Tạo Project

Bạn follow theo hướng dẫn trên Flutter để tạo một project: [create project in android studio](https://flutter.io/docs/development/tools/android-studio)

![](https://cdn-images-1.medium.com/max/1000/1*RRIkgyR8vHZFB2bX5G9M3g.png)

Mình đặt tên app là _button_3d_ để làm demo.

## Tạo button widget

Tạo file button3d.dart nằm cùng cấp với file main.dart cho đơn giản.

Vì chúng ta cần phải update UI dựa trên trạng thái là button được tap hay không, nên vậy widget của chúng ta sẽ phải kế thừa class StatefulWidget:

```
class GameButton extends StatefulWidget {
  final VoidCallback onPressed;
  final Widget child;
  final ButtonStyle style;
  final double width;
  final double height;
GameButton({@required this.onPressed, @required this.child, this.style = ButtonStyle.WHITE, this.width = 100.0, this.height = 90.0});
@override
  State<StatefulWidget> createState() => GameButtonState();
}
```

Để tiện lợi cho người sử dụng, chúng ta sẽ define sẵn một số button style như sau:

```
class ButtonStyle {
  final Color topColor;
  final Color backColor;
  const ButtonStyle({@required this.topColor, @required this.backColor});
  static const DEFAULT = const ButtonStyle(
      topColor: const Color(0xFF45484c),
      backColor: const Color(0xFF191a1c)
  );
  static const RED = const ButtonStyle(
      topColor: const Color(0xFFc62f2f),
      backColor: const Color(0xFF922525)
  );
  static const BLUE = const ButtonStyle(
      topColor: const Color(0xFF25a09c),
      backColor: const Color(0xFF197572)
  );
  static const WHITE = const ButtonStyle(
      topColor: const Color(0xFFffffff),
      backColor: const Color(0xFFCFD8DC)
  );
}
```

Button sẽ có hai phần màu sắc, là màu ở trên top và màu trên thân của button.

## Tạo state

```
class GameButtonState extends State<GameButton> {}
```

Ta cần một số hằng số:

```
// để xác định radius
static const BORDER_RADIUS = 7.0;
// chiều cao
static const BUTTON_Z = 5.0;
// ở trạng thái pushed, thì button cao bao nhiêu
static const DOWN_PADDING = 4.0;
```

và cuối cùng là property lưu trạng thái push:

```
bool isTapped = false;
```

Trong phương thức build, chúng ta sẽ dùng GestureDetector để detect tác động của người dùng lên button:

1. Khi tap down: phát âm thanh click.
1. Khi tap up: chạy hàm callback

```
@override
Widget build(BuildContext context) {
  return GestureDetector(
      child: Stack(
        alignment: AlignmentDirectional.topCenter,
        children: <Widget>[
          _buildBackLayout(),
          _buildTopLayout()
        ],
      ),
      onTapDown: (TapDownDetails event) {
        setState(() {
          isTapped = true;
          //Flame.audio.play('click.mp3', volume: 100.0);
        });
      },
      onTapUp: (TapUpDetails event) {
        setState(() {
          isTapped = false;
        });
        widget.onPressed();
      }
  );
}
```

Stack widget sẽ cho phép chung ta build nhiều widget chồng lên nhau. Bạn có thể hình dung như sau:

1. Chúng ta vẽ layer đầu tiên là phần nền màu sậm, phần này sẽ có kích thước bằng button height trừ đi phần chiều cao (BUTTON_Z) của button và margin top bằng BUTTON_Z, margin top nhằm tạo ra một khoản trống, để khi layer 2 dịch chuyển, sẽ không bị lộ phần màu đen này ra.
1. Layer thứ hai là phần mặt trên của button, kích thước bằng layer 1nhưng không có margin top.

Khi người dùng tap vào button, thì ta tăng margin top của layer 2 lên bằng với BUTTON_Z, thì layer 2 sẽ chạy xuống, tạo cảm giác như chiều cao của button thay đổi.

### Layer 1

```
Widget _buildBackLayout() {
  return Padding(
    padding: EdgeInsets.only(top: BUTTON_Z),
    child: DecoratedBox(
      position: DecorationPosition.background,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(BORDER_RADIUS)),
          boxShadow:[
            BoxShadow(
                color: widget.style.backColor
            )
          ]
      ),
      child: ConstrainedBox(
        constraints: BoxConstraints.expand(width: widget.width, height: widget.height - BUTTON_Z),
      ),
    ),
  );
}
```

### Layer 2

```
Widget _buildTopLayout() {
  return Padding(
    padding: EdgeInsets.only(top: isTapped ? BUTTON_Z - DOWN_PADDING : 0.0),
    child: DecoratedBox(
      position: DecorationPosition.background,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(BORDER_RADIUS)),
          boxShadow:[
            BoxShadow(
                color: widget.style.topColor
            )
          ]
      ),
      child: ConstrainedBox(
        constraints: BoxConstraints.expand(width: widget.width, height: widget.height - BUTTON_Z),
        child: Container(
          padding: EdgeInsets.zero,
          alignment: Alignment.center,
          child: widget.child,
        ),
      ),
    ),
  );
}
```

Đối với đoạn phát âm thanh, thì bạn cần phải cài thêm thư viện Flame, đây là một game engine đơn giản và rất gọn nhẹ: [Flame](https://github.com/luanpotter/flame)

Toàn bộ code của button này như sau:

{{< gist nguyenvanduocit 3c38daebead0044365728501f2b30527>}}

## Sử dụng

Cách sử dụng không khác gì các widget khác:

```
GameButton(
  onPressed: _incrementCounter,
  style: ButtonStyle.BLUE,
  width: 100.0,
  height: 70.0,
  child: Text("INCREASE", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),),
)
```

và kết quả giống như trong hình ở đầu bài. Nếu không muốn dùng text, bạn cũng có thể dùng widget icon, image hoặc một button khác.

## Đóng gói

Trong trường hợp bạn thích button này và muốn nhận update từ mình, thì mình đã public button này lên pub.dartlang.org: [button3d](https://pub.dartlang.org/packages/button3d)

Bạn có thể cài đặt bằng cách thêm:

```
button3d: ^0.0.8
```

vào phần dependencies trong file pubspec.yaml:

```
dependencies:
  button3d: ^0.0.8
```

## Lời kết

Trước khi làm button này thì mình nghĩ tạo một button tùy chỉnh có lẽ không đơn giản, nên mình thử IconButton, Button có background, …Nhưng nếu nhìn vấn đề một cách đơn giản hơn, chúng ta sẽ thấy rằng button thực ra cũng chỉ là một hình vẽ, có thể xác định được tương tác của người dùng và hồi đáp lại nó.

Nghĩ như vậy thì chỉ việc dùng một widget nào đó có thể detect được gesture và làm các hiệu ứng khác tùy theo ý mình.
