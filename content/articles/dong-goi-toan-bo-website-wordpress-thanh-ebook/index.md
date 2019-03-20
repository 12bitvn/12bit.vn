---
authors:
  - vominh
date: "2018-04-20T21:51:07+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1000/1*T79HF0FcfTLwRKPjPXx3Cg.jpeg
tags:
- golang
- wordpress
- crawling
- ebook
- epub
title: Đóng gói toàn bộ website WordPress thành Ebook
---

Mình thích đọc, nhưng mình lười đọc bằng điện thoại, tuần trước mình có làm một video chia sẻ cách mình sử dụng [instapaper](https://instapaper.com/) và calibre để đóng gói các trang web thành ebook.

{{<youtube m1CwMHyT9-Q>}}

Hôm rồi mình đăng ký dùng thử trên packtpub. Mình cứ ngỡ là có thể download ebook, nhưng mà mình hiểu nhầm chữ “access”. Họ chỉ cho mình đọc online chứ không cho tải về. Vì vậy mình đã phải viết script để đóng gói nội dung trên website của họ thành ebook để đọc lâu dài. Kết quả khá ổn, nội dung khá rõ và dễ đọc. Rất vừa ý. Nhưng mình sẽ không kể về những gì mình làm ở đó.

Thay vào đó mình sẽ chia sẻ cách để đóng gói nội dung của một website WordPress thành ebook.

Mình chọn WordPress là vì nó có cung cấp API, đỡ phải parse nội dung từ html. Mình cũng sẽ dùng một thư viện có sẵn để giúp đóng gói thành ebook. Script này chỉ đơn giản là lấy nội dung thông qua API và đóng gói lại thành ebook thông qua thư viện có sẵn. Kết quả là ta sẽ có file ebook ở định dạng epub. Bạn có thể dễ dàng convert nó thành các định dạng khác.

Ở đây mình sẽ demo trên website của [Gối Yêu](https://goiyeu.net/) — là một website về truyện ngắn, rất hay, của một anh bạn mà mình quen hồi làm [Mùa Tóc Rối](http://muatocroi.com/). Mình đã xin phép ảnh trước khi viết bài này.

## API

Hãy nói về API. WordPress mặc định enable REST API. Thông tin về API nằm ở địa chỉ sau:

```sh
https://goiyeu.net/wp-json/wp/v2/
```

Giờ để lấy danh sách bài viết thì dùng endpoint:

```sh
https://goiyeu.net/wp-json/wp/v2/posts
```

Bạn có thể đọc tài liệu về endpoint này tại trang [API Handbook](https://developer.wordpress.org/rest-api/reference/posts/). Mình tóm gọi những tham số cần lưu ý như sau:

- `page`: là page hiện tại
- `per_page`: Số lượng post trên một page

Data trả về là có định dạng json kèm theo thông tin về total post và total page trong header:

```
accept-ranges: bytes
access-control-allow-headers: Authorization, Content-Type
access-control-expose-headers: X-WP-Total, X-WP-TotalPages
allow: GET
alt-svc: quic=":443"; ma=2592000; v="35,37,38,39"
content-encoding: gzip
content-type: application/json; charset=UTF-8
date: Thu, 19 Apr 2018 15:34:55 GMT
link: <https://goiyeu.net/wp-json/wp/v2/posts?page=2>; rel="next"
server: LiteSpeed
status: 200
vary: Accept-Encoding
x-content-type-options: nosniff
x-powered-by: PHP/5.6.35
x-robots-tag: noindex
x-wp-total: 631
x-wp-totalpages: 64
```

## Cấu trúc ebook

Trong ebook, chúng ta sẽ cần hai cấu trúc là ebook và section. Chúng ta không có chapter, vì thư viện không có hỗ trợ (ahihi). Như vậy thì mỗi section sẽ tương ứng với một bài post.

Thực ra nếu làm lớn thì chúng ta cần phức tạp hơn nhiều, lúc đó phải tự viết lại thư viện đóng gói. Thư viện go-epub này là cái tốt nhất mình tìm thấy, nhưng nó vẫn còn rất hạn chế.

```golang
type RenderedField struct {
   Rendered string `json:"rendered"`
}

type Section struct {
   Id int `json:"id"`
   DateGmt string `json:"date_gmt"`
   Title RenderedField `json:"title"`
   Content RenderedField `json:"content"`
   Link string `json:"link"`
}
```

Thực ra thì hoàn toàn có thể viết lại thư viện khác, nhưng chắc nó là một câu truyện dài mà chúng ta sẽ nói sau, bạn có thể hình dung file epub thực ra chỉ là một file zip, trong đó chứa các file theo một cấu trúc nhất định.

Về cơ bản ta chỉ cần ngần ấy field mà thôi. Ta sẽ dùng field Date để sort và Link để hiển thị ở phần nguồn trích dẫn.

```golang
type Ebook struct {
   Title string `json:"title"`
   Author string `json:"author"`
   CoverImage string `json:"cover_image"`
   Sections []*Section `json:"sections"`
}
```

## Lấy dữ liệu

Vậy endpoint của chúng ta có cấu trúc như sau:

```sh
https://goiyeu.net/wp-json/wp/v2/posts?page=<int>&per_page=<int>
```

Trong đó giá trị tối đa của `per_page` là 100. Chúng ta sẽ dùng số đó luôn.

Chúng ta cần một struct như sau:

```golang
type Crawler struct {
   SiteUrl     string
   postPerPage int
}

func NewCrawler(siteUrl string) *Crawler {
   return &Crawler{
      SiteUrl:     siteUrl,
      postPerPage: 100,
   }
}
```

Lấy thông tin của website rồi generate thành thông tin sách:

```golang
func (c *Crawler) getBookInfo() (*Ebook, error) {
   response, err := http.Get(fmt.Sprintf(`%s/wp-json`, c.SiteUrl))
   if err != nil {
      return nil, err
   }

   bResponse, err := ioutil.ReadAll(response.Body)
   if err != nil {
      return nil, err
   }

   var ebook Ebook
   if err := json.Unmarshal(bResponse, &ebook); err != nil {
      return nil, err
   }
   return &ebook, nil
}
```

Lấy total post:

```golang
func (c *Crawler) getTotalPost() (int, error) {
   response, err := http.Get(fmt.Sprintf(`%s/wp-json/wp/v2/posts?per_page=%d`, c.SiteUrl, 1))
   if err != nil {
      return 0, err
   }
   return strconv.Atoi(response.Header.Get(`x-wp-total`))
}
```

Hàm lấy tất cả bài viết trên một trang. Chúng ta tạo request sau đó Unmarshal nó ra:

```golang
func (c *Crawler) getPage(page int) ([]*Section, error) {
   response, err := http.Get(fmt.Sprintf(`%s/wp-json/wp/v2/posts?per_page=%d&page=%d`, c.SiteUrl, c.postPerPage, page))
   if err != nil {
      return nil, err
   }
   bResponse, err := ioutil.ReadAll(response.Body)
   if err != nil {
      return nil, err
   }

   var sections []*Section
   if err := json.Unmarshal(bResponse, &sections); err != nil {
      return nil, err
   }
   return sections, nil
}
```

Và đây là nơi quy tụ:

```golang
func (c *Crawler) GetBook() (*Ebook, error) {
   book, err := c.getBookInfo()
   if err != nil {
      return nil, err
   }

   totalPost, err := c.getTotalPost()
   if err != nil {
      return nil, err
   }

   totalPage := int(math.Ceil(float64(totalPost) / float64(c.postPerPage)))
   resultChans := make(chan *ChanResult)

   for page := 1; page <= totalPage; page++ {
      go func(page int) {
         sections, err := c.getPage(page)
         if err != nil {
            resultChans <- &ChanResult{
               Error: err,
            }
         } else {
            resultChans <- &ChanResult{
               Sections: sections,
            }
         }

      }(page)
   }

   for page := 1; page <= totalPage; page++ {
      result := <-resultChans
      if result.Error != nil {
         return nil, result.Error
      }
      book.Sections = append(book.Sections, result.Sections...)
   }
   sort.Slice(book.Sections, func(i, j int) bool {
      timeA, _ := time.Parse("2006-01-02T15:04:05", book.Sections[i].Date)
      timeB, _ := time.Parse("2006-01-02T15:04:05", book.Sections[j].Date)
      log.Println(book.Sections[i].Date)
      return  timeB.Before(timeA)
   })
   return book, nil
}
```

Ta cùng goroutine để xử lý nhanh hơn một tý, nhưng nếu website có thiết lập rate limit thì sẽ dễ bị lỗi.

Vì dùng goroutine nên chúng ta không có thư tự đúng của các section, nên cần phải sort lại theo date. Bài mới ở trước, bài cũ ở sau.

## Đóng gói thành ebook

Đây là phần mất thời gian nhất, ảnh sẽ được kiểm tra và download vào lúc này. Thư viện go-epub lại không dùng goroutine để download nhiều file cùng lúc, vì vậy phải đợi download lần lượt, rất mất thời gian, và thậm chí khi add image, nó còn check link tồn tại hay không nữa, rất chậm.

Giờ ta có hàm pack:

```golang
f unc Pack(data *wp2ebook.Ebook)(string, error){
   book := epub.NewEpub(data.Name)
   book.SetAuthor(data.Author)
   cssPath, err := book.AddCSS("assets/style.css", "")
   if err != nil {
      cssPath = ""
   }
   for _, section := range data.Sections{
      content := cleanInlineStyle(section.Content.Rendered)
      content = progressImage(content, book)
      book.AddSection(content, section.Title.Rendered, "", cssPath)
   }
   log.Println("Start writing...")
   filePath := fmt.Sprintf("dist/%s.epub", slug.Make(data.Name))
   if err = book.Write(filePath); err != nil {
      return "", err
   }
   return filePath, nil
}
```

Đầu tiên tạo thông tin cơ bản của sách, sau đó add css. À, chúng ta add css này để format lại style của quyển sách. Bạn có thể style tuỳ ý.

Sau đó loop qua tất cả các section, làm sạch content, xử lý hình ảnh, sau đó add vào book.

Add ảnh như sau:

```golang
func progressImage(content string, book *epub.Epub) string {
   var srcRegex = regexp.MustCompile(`(?mi)src="([^"]+\.(jpg|png))"`)
   matchs := srcRegex.FindAllStringSubmatch(content, -1)

   type Repacement struct {
      Search string
      Replace string
   }

   for _, match := range matchs {
      path, _ := book.AddImage(match[1], "")
      if path != "" {
         content = strings.Replace(content, match[1], path, -1)
      }
   }
   return content
}

func cleanInlineStyle(content string) string {
   var re = regexp.MustCompile(`(?mi)(style|srcset|sizes)="([^"]*)"`)
   return re.ReplaceAllString(content, "")
}
```

Tìm mọi chuỗi với regex, sau đó gọi hàm AddImage để check hình và đưa nó vào map của go-epub. Sau đó replace path mới trong content. Và cũng cần loại bỏ inline style nữa.

Mọi thứ có vẻ ổn, bây giờ là về hàm main. Tất cả các file nảy giờ mình code đề đặt trong package `wp2ebook`, nhờ vậy các project khác có thể reuse lại nó, để sử dụng nó trong chính project này thì mình sẽ tạo thư mục main, và tạo hàm main trong đó.

```golang
package main

import (
   "log"
   "wp2ebook"
   "wp2ebook/packer"
)

func main() {
   crawler := wp2ebook.NewCrawler(`http://goiyeu.net`)
   log.Println("Crawling...")
   book, err := crawler.GetBook()
   if err != nil {
      log.Panic(err)
   }
   book.CoverImage = "/Users/duoc/go/src/wp2ebook/assets/goiyeu.png"
   log.Println("Packing...")
   path, err := packer.Pack(book)
   if err != nil {
      log.Panic(err)
   }
   log.Println(path)
}
```

Chạy khá chậm, nhưng kết quả thì cúng ta sẽ có được 631 bài viết từ blog của Gối Yêu.

## Convert qua định dạng khác

File epub khá mở, bạn có thể convert qua rất nhiều định dạng khác, có thể dùng calibre để chuyển, hoặc nếu xác định dùng kindle thì dùng kindlegen.

Và đây là kết quả:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1000/1*T79HF0FcfTLwRKPjPXx3Cg.jpeg">}}
{{<zoom-img src="https://cdn-images-1.medium.com/max/400/1*eRbAL8LHAJMTAP8CBZudtQ.jpeg">}}
{{<zoom-img src="https://cdn-images-1.medium.com/max/400/1*BSDOoN3ky73rGim1un-DDw.jpeg">}}
{{<zoom-img src="https://cdn-images-1.medium.com/max/400/1*9loBHRsQpPVlTz_qUuXjdw.jpeg">}}

Cần 37 giờ để đọc hết 631 bài viết này. Nhưng tất nhiên là không phải tất cả nó đều hay rồi. Dù sao việc này cũng thú vị.

## Lời kết

Hãy nhớ hỏi xin phép trước khi muốn đóng gói website của ai nhé. Có thể họ sẽ không thoải mái đâu. Trừ trường hợp tiếc tiền như mình.

Và xong, hãy bắt đầu code để thấy nó thật thú vị, đầy thử thách, và khi xong việc, hãy tận hưởng cảm giác thoải mái khi đọc trên kindle và chìm đắm trong những trang viết.
