---
authors:
  - vominh
date: "2019-01-04T07:14:35+07:00"
draft: false
images:
- /articles/cac-shortcode-hay-cho-gohugo/thumbnail.png
tags:
- Hugo
- shortcode
title: Các shortcode hay dành cho Hugo
---

Từ ngày 01/01/2019, 12bit.vn đã chuyển qua blog riêng, xây dựng bằng Hugo thay vì sử dụng Medium như trước. Vì vậy chúng mình cũng có cơ hội để tìm hiểu nhiều về Hugo hơn. Chúng mình từng thử custom lại code của Hugo để hỗ trợ hiển thị danh sách contributor của một bài post hoặc lấy commit author để làm author cho bài viết, nhưng nếu dùng cách đó thì các bạn cũng phải sử dụng bản Hugo của tụi mình để build, mà như vậy thì không tiện, cuối cùng chúng mình chọn shortcode, tiện hơn và dễ hơn.

Trong bài viết này mình sẽ giới thiệu cho các bạn những shortcode mà tụi mình đang sử dụng cho 12bit.vn:

## Embed Codepen

Blog về frontend thì không khỏi phải embed demo nào đó, Codepen là một công cụ rất hữu ích. Cú pháp shortcode có thể như sau:

```
{{</* codepen username pen_id height_in_px */>}}
```

Nếu không set giá trị `height` thì `height` mặc định sẽ là 500px. Ví dụ:

```
{{</* codepen tatthien LgMKpm 400 */>}}
```

{{<codepen tatthien LgMKpm 400>}}

### Mã nguồn

shortcodes/codepen.html:

```
{{ $height := 500 }}
{{ if isset .Params 2 }}
  {{ $height = .Get 2 }}
{{ end }}
<p>
  <iframe
    height='{{ $height }}'
    scrolling='no'
    src='//codepen.io/{{ index .Params 0 }}/embed/{{ index .Params 1 }}/?height=265&theme-id=dark&default-tab=result'
    frameborder='no'
    allowtransparency='true'
    allowfullscreen='true'
    style='width: 100%;'
>
  </iframe>
</p>
```

## runkit

Runkit cho phép bạn embed một đoạn code Nodejs vào website và run nó trực tiếp. Cái hay của Runkit là nó không giống như gist, bạn không cần phải truy cập vào website cua Runkit để tạo một file sau đó mới embed, mà chỉ cần load script của họ, sau đó nó sẽ tự động lấy nội dung trên site của bạn và embed thành một iframe có thể run được, trong trường hợp Runkit không hoạt động, thì người đọc vẫn có thể xem code được.

Chúng ta sẽ có cấu trúc như sau:

```markdown
{{%/* runkit unique-id */%}}
your code block with ``` code and ```
{{%/* /runkit */%}}
```

`unique-id` ở đây chỉ là một id bất kỳ nào đó nhằm phân biệt giữa các đoạn code với nhau. Theo document của Runkit thì nó cần id này để sau khi script load xong sẽ dùng id này để lấy code và tạo embed.

{{% runkit abc %}}
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

### Mã nguồn

shortcodes/runkit.html:

```
<div class="runkit" id="{{ .Get 0 }}">{{ .Inner }}</div>
<script src="https://embed.runkit.com" data-element-id="{{ .Get 0 }}"></script>
```

## caniuse

Có nhiều bài viết trên 12bit giới thiệu về các API mới mà không phải mọi browser đều hỗ trợ, sẽ thật tiện nếu các bạn có thể biết được API đó đã hỗ trợ trên những browser nào rồi. caniuse là website cho các bạn biết điều đó, nên sẽ tiện lắm nếu có thể embed vào trực tiếp trên website.

Bạn [@IreAderinokun](https://twitter.com/ireaderinokun) đã xây dựng thư viện [Can I Use Embed](https://caniuse.bitsofco.de/) để hỗ trợ việc này, những gì chúng ta cần bây giờ chỉ là load script của thư viện này thôi, nhưng sẽ chia ra làm hai phần.

Chúng ta cần làm hai việc:

1. Render div kèm theo attribute chứa tên các feature cần check.
1. Load thư viện ở footer

### Mã nguồn

shortcodes/caniuse.html:

```
{{ .Page.Scratch.Set "include_caniuse" true }}
{{ $periods := .Get "periods" | default "future_1,current,past_1,past_2" }}
{{ $features := default (.Get "features") (.Get 0) }}
<div class="ciu_embed" data-feature="{{ $features }}" data-periods="{{ $periods }}">
  <a href="http://caniuse.com/#feat={{ $features }}">Can I Use {{ $features }}?</a>
</div>
```

Chúng ta lưu giá trị `include_caniuse` vào Scratch, và check giá trị này ở footer để chỉ load script khi cần thiết:

footer.html

```
{{ if ($.Page.Scratch.Get "include_caniuse") "true" }}
<script async src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js"></script>
{{ end }}
```

### cách dùng

```markdown
{{</* caniuse features="proxy" */>}}
```

{{< caniuse features="proxy" >}}

## image-zoom

Không phải hiếm gặp các trường hợp phải đăng ảnh chụp một form hoặc ảnh gif với những chi tiết nhỏ. Nên nhu cầu zoom ảnh cũng thường gặp, Medium có chức năng rất hay là khi bạn click vào ảnh thì ảnh sẽ zoom lên full-screen. Mình thích chức năng này và đã tạo một shortcode cho nó:

```markdown
{{</* zoom-img src="/img/articles/default-thumb-1200-630.png" */>}}
```

{{< zoom-img src="/img/articles/default-thumb-1200-630.png" >}}

### Mã nguồn

shortcodes/zoom-img.html

```
{{ .Page.Scratch.Set "include_image_zoom" true }}
{{- $title := .Get "url" | default "" -}}
{{- $src := .Get "src" | default "" -}}
<p>
  <img
    data-zoomable
    src="{{ $src }}"
    data-zoom-src="{{ $src }}"
    title="{{ $title }}"
    alt="{{ $title }}"
  >
</p>
```

Tương tự như shortcode caniuse, chúng ta cũng set giá trị cho `include_image_zoom` để có thể load script ở dưới footer, vì chúng ta không muốn load script ngay tại đây đúng không.

footer.html

```
{{ if ($.Page.Scratch.Get "include_image_zoom") "true" }}
<script src="https://unpkg.com/medium-zoom@1.0.2/dist/medium-zoom.min.js" async defer onload="mediumZoom('[data-zoomable]');"></script>
{{ end }}
```

## mermaid

Mình cũng thường gặp các trường hợp phải dùng diagram, như khi mô tả data flow, sequence diagram, thuật toán, ... Và viết bài trong hugo thì cần sử dụng markdown, sẽ tiện lợi nếu có thể vẽ diagram bằng chính markdown và thư viện mermaidjs chính là thứ làm được điều đó.

### Cách dùng

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

### Mã nguồn

shortcodes/mermaid.html

```
{{ .Page.Scratch.Set "include_mermaid" true }}
<div class="mermaid">
  {{ .Inner }}
</div>
```

tương tự như các shortcode cần load thêm script, chúng ta cũng set giá trị cho `include_mermaid` và check trong footer.html

```
{{ if ($.Page.Scratch.Get "include_mermaid") "true" }}
<script async src="https://unpkg.com/mermaid@8.0.0/dist/mermaid.min.js"></script>
{{ end }}
```

## oembed thần thánh

Và cuối cùng, khi bạn cảm thấy mệt mỏi và "ngốc ngếch" vì phải support đủ loại website mà vốn chính website đó đã có hỗ trợ oembed. Thì hãy implement một shortcode hỗ trợ oembed. Oembedly là dịch vụ chuyên về oembed, họ có API và thư viện JavaScript để giúp chúng ta embed bất kỳ website nào mà họ có hỗ trợ. Medium sử dụng dịch vụ của họ để làm tính năng oembed.

Cú pháp sẽ giống như sau:

```markdown
{{</* oembed url="https://open.spotify.com/playlist/37i9dQZEVXbc3uyDjJcA7l" title="ahhi" */>}}
```

Kết quả:

{{< oembed url="https://open.spotify.com/playlist/37i9dQZEVXbc3uyDjJcA7l">}}

### Mã nguồn

shortcodes/oembed.html

```
{{ .Page.Scratch.Set "include_embedly" true }}
{{- $url := .Get "url" -}}
{{- $title := .Get "url" | default "" -}}

<div class="oembed-card">
  <a data-card-controls="0" class="embedly-card" href="{{ $url }}">{{ $title }}</a>
</div>

```

footer.html

```
{{ if ($.Page.Scratch.Get "include_embedly") "true" }}
<style class="embedly-css">
.pair-bd .art-bd{
  padding: 0;
}
.card .hdr {
  display:none;
}
.card .brd {
  display:none;
}
</style>
<script src="//cdn.embedly.com/widgets/platform.js" async defer></script>
{{ end }}
```

Oembedly hỗ trợ chúng ta custom style của card bằng cách thêm style có class `embedly-css`. Nên mình dùng nó để ẩn header và footer của card đi.

## Danh sách contributor của một repo

Trong trang [giới thiệu]({{<ref "/pages/about.md">}}) mình có liệt kê ra danh sách các bạn đã có đóng góp vào 12bit.vn bằng cách lấy danh sách contributor từ API của Github, lẽ ra lấy từ chính thư mục .git thì tốt hơn, nhưng như vậy thì phải build Hugo. Nên cuối cùng vẫn nên dùng API.

Cú pháp như sau:


```markdown
{{</*contributors "12bitvn/12bit.vn"*/>}}
```

{{<contributors "12bitvn/12bit.vn">}}

### Mã nguồn

```
{{ $repoName := .Get 0 }}
{{ $url := print "https://api.github.com/repos/" $repoName "/stats/contributors?access_token=" $.Site.Data.auth.github_access_token}}
{{ $contributes := getJSON $url }}
<div class="contributors">
  {{ range sort $contributes "total" "desc" }}
  <div class="contributor">
    <img class="contributor__avatar" src="{{.author.avatar_url}}" alt="">
    <a href="{{.author.html_url}}" target="_blank" class="contributor__name">{{ .author.login }}</a>
    <div class="contributor__metas">
      <span>{{ .total }} commits</span>
    </div>
  </div>
  {{ end }}
</div>
```

Chúng ta dùng hàm getJSON do Hugo cung cấp để gọi tới API. Để tăng ratelimit thì mình có dùng access token, để tránh commit cái token này thì mình đặt nó trong file `data/auth.yaml`. File này có chưa key `githu_access_token`, chính là Personal Access Token của Github.

## Kết
Còn nhiều shortcode khác trong repos của 12bit.vn mà bạn có thể xem tại đây: [github](https://github.com/12bitvn/12bit.vn/tree/master/themes/blog/layouts/shortcodes).

Các bạn có thể xem thêm các shortcode khác tại trang [shortcode]({{< ref "/pages/shortcodes.md" >}})
