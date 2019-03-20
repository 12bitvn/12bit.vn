---
authors:
  - vominh
date: "2018-03-24T07:01:27+07:00"
draft: false
images:
- /articles/di-chuyen-tu-wordpress-qua-medium/thumbnail.png
tags:
- WordPress
- API
title: Di chuyển blog từ WordPress.com qua Medium
---

Mình có một blog bên WordPress.com, đã lâu không viết và cũng quên tài khoản đăng nhập. Dù cũng không còn viết gì nữa nhưng ở trong tình trạng vô chủ đó thì ai biết được nó sẽ đi về đâu. Nên mình muốn di chuyển nó qua một nơi chính chủ hơn --- Medium.

![](https://cdn-images-1.medium.com/max/1600/1*WCnuCvSv0Cs6PSCngHPuOA.png)

## API

Rất may là cả Medium và WordPress.com đều hỗ trợ API rất tốt. Mình cần API để lấy post từ WordPress sau đó cần API để đăng lại lên Medium.

### WordPress.com API

Để lấy posts từ WordPress có thể sử dụng api [/sites/$site/posts/](https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/), Request như sau:

```
GET [https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts](https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=2%27)
```

Json trả về có nhiều property nhưng mình chỉ quan tâm đến một vài property như sau:

```
{
  "found": "<number>",
  "posts": [
    {
      "ID": "<number>",
      "content": "<string>",
      "title": "<string>",
      "date": "<string>"
    }
  ]
}
```

Bởi vì API của medium cũng không cho bạn đăng nhiều thông tin hơn như vậy.

### Medium API

Request API của Medium như sau:

```
POST [https://api.medium.com/v1/users/{{authorId}}/posts](https://api.medium.com/v1/users/%7B%7BauthorId%7D%7D/posts)
```

Ví dụ:

```
POST /v1/users/5303d74c64f66366f00cb9b2a94f3251bf5/posts HTTP/1.1
Host: api.medium.com
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "title": "Liverpool FC",
  "contentFormat": "html",
  "content": "<h1>Liverpool FC</h1><p>You'll never walk alone.</p>",
  "canonicalUrl": "<http://jamietalbot.com/posts/liverpool-fc>",
  "tags": ["football", "sport", "Liverpool"],
  "publishStatus": "public"
}
```

Bạn đọc thêm tài liệu tại [trang API doc](https://github.com/Medium/medium-api-docs).

Bạn có để ý rằng chúng ta không thể set ngày đăng được. Cũng nhưng không thể tùy chọn slug.

Medium chỉ cho user đăng 10 bài một ngày, vì vậy trước khi bắt đầu, hãy tạo account, sau đó gửi email cho Medium và nhờ họ tăng giới hạn lên. Địa chỉ email hỗ trợ là "<yourfriends@medium.com>" thường thì sẽ mất một đến hai ngày làm việc.

## Define cấu trúc

Giờ chúng ta sẽ viết một ít code. Mình sẽ dùng Go, bạn có thể dùng bất cứ ngôn ngữ nào bạn thích. Tuy nhiên, Medium có cung cấp một vài SDK cho [Go](https://github.com/Medium/medium-sdk-go), [Nodejs](https://github.com/Medium/medium-sdk-nodejs) và [Python](https://github.com/Medium/medium-sdk-python), bạn nên dùng nó để tiết kiệm thời gian.

Hãy define hai cấu trúc như sau:

```
type ApiResponse struct {
   Found int `json:"found"`
   Posts []*Post `json:"posts"`
}

type Post struct {
   Date string `json:"date"`
   Title string `json:"title"`
   Content string `json:"content"`
}
```

Một cái để decode json trả về từ API của WordPress, một để chưa data sẽ submit lên API của Medium.

Giờ define một cấu trúc nữa, dùng để chứa các hàm và thuộc tính cần dùng:

```
type Converter struct {
   MediumToken string
   WordPressDomain string
   MediumClient *Medium.Medium
}
```

Và hàm new như sau:

```
func NewConverter(mediumToken string, wordPressDomain string (*Converter){
   return &Converter{
      MediumToken: mediumToken,
      WordPressDomain: wordPressDomain,
      MediumClient: Medium.NewClientWithAccessToken(mediumToken),
   }
}
```

## Lấy bài viết từ WordPress

Đầu tiên ta cần lấy danh sách các bài viết trong 1 page:

```
func (converter *Converter)GetPage(page int)(*ApiResponse, error){
	url := "https://public-api.wordpress.com/rest/v1.1/sites/" + converter.WordPressDomain + "/posts/?number=100&page=" + strconv.Itoa(page) + "&order=ASC"
	httpClient := &http.Client{}
	response, err := httpClient.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()
	var responseData ApiResponse
	err = json.NewDecoder(response.Body).Decode(&responseData)
	if err != nil {
		return nil, err
	}
	return &responseData, nil
}
```

Sau đó là hàm lấy bài của tất cả các page:

```
func (converter *Converter)GetPosts()([]*Post){
	var posts []*Post
	page := 1
	for {
		respondedPage, err := converter.GetPage(page)
		if err != nil {
			break
		}
		posts = append(posts, respondedPage.Posts...)
		if len(respondedPage.Posts) < 100 {
			break
		}
		page++
	}
	return posts
}
```

Hàm này cũng đơn giản, kiểm tra xem số lượng bài viết trả về có nhỏ hơn số lượng bài trong 1 page hay không, nếu nhỏ hơn nghĩa là đã hết bài, trường hợp xấu nhất là trường hợp mà số lượng bài viết chia hết cho số lượng page, khi đó sẽ cần phải tốn 1 request nữa, nhưng thôi kệ vậy.

Ở đây có thể dùng nhiều request đồng thời để lấy cho nhanh, nhưng mà thôi, vì số lượng bài cũng không nhiều gì.

## Đăng bài lên Medium

Đơn giản là tạo request lên api của medium mà thôi:

```
func (converter *Converter)NewPost(data *Post, targetIdFieldName string, targetId string)(*Medium.Post, error){
	postOptions := Medium.CreatePostOptions{
		Title:         data.Title,
		Content:       "<h1>" + data.Title + "</h1>" + data.Content + "<p>----" + data.Date + "</p>",
		ContentFormat: Medium.ContentFormatHTML,
		PublishStatus: Medium.PublishStatusPublic,
	}
	if targetIdFieldName == "user" {
		postOptions.UserID = targetId
	} else {
		postOptions.PublicationId = targetId
	}
	// Create a draft post.
	post, err := converter.MediumClient.CreatePost(postOptions)
	if err != nil {
		return nil, err
	}
	return post, err
}
```

Như bạn thấy thì medium không cho phép đặt thời gian đăng bài, vì vậy chúng ta không thể dùng concurrency để tạo nhiều request đồng thời. Đành phải đăng theo thứ tự, và chèn ngày đăng bài nội dung bài viết.

Hình ảnh có sử dụng trong nội dung bài viết sẽ được medium tự động tải xử lý.

Và cuối cùng ta có hàm convert, hàm này sẽ gọi hai hàm trên:

```
func (converter *Converter)Convert(targetId string){
	targetType := "publication"
	if targetId == "me" {
		targetType = "user"
		user, err := converter.MediumClient.GetUser("")
		if err != nil {
			log.Panic(err)
		}
		targetId = user.ID
	}
	posts := converter.GetPosts()
	log.Println("Total: ", len(posts))
	for _, post := range posts {
		post, err := converter.NewPost(post, targetType, targetId)
		if err != nil {
			log.Println(err)
		} else {
			log.Printf("%s:%s\n", post.Title, post.URL)
		}
	}
}
```

TargetId có thể là “me” hoặc id của publication.

Code của cả script như sau:

```
package main

import (
	Medium "github.com/Medium/medium-sdk-go"
	"log"
	"net/http"
	"encoding/json"
	"strconv"
)

type ApiResponse struct {
	Found int `json:"found"`
	Posts []*Post `json:"posts"`
}

type Post struct {
	Date string `json:"date"`
	Title string `json:"title"`
	Content string `json:"content"`
}

type Converter struct {
	MediumToken string
	WordPressDomain string
	MediumClient *Medium.Medium
}

func (converter *Converter)Convert(targetId string){
	targetType := "publication"
	if targetId == "me" {
		targetType = "user"
		user, err := converter.MediumClient.GetUser("")
		if err != nil {
			log.Panic(err)
		}
		targetId = user.ID
	}
	posts := converter.GetPosts()
	log.Println("Total: ", len(posts))
	for _, post := range posts {
		post, err := converter.NewPost(post, targetType, targetId)
		if err != nil {
			log.Println(err)
		} else {
			log.Printf("%s:%s\n", post.Title, post.URL)
		}
	}
}

func (converter *Converter)GetPage(page int)(*ApiResponse, error){
	url := "https://public-api.wordpress.com/rest/v1.1/sites/" + converter.WordPressDomain + "/posts/?number=100&page=" + strconv.Itoa(page) + "&order=ASC"
	httpClient := &http.Client{}
	response, err := httpClient.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()
	var responseData ApiResponse
	err = json.NewDecoder(response.Body).Decode(&responseData)
	if err != nil {
		return nil, err
	}
	return &responseData, nil
}

func (converter *Converter)GetPosts()([]*Post){
	var posts []*Post
	page := 1
	for {
		respondedPage, err := converter.GetPage(page)
		if err != nil {
			break
		}
		posts = append(posts, respondedPage.Posts...)
		if len(respondedPage.Posts) < 100 {
			break
		}
		page++
	}
	return posts
}

func (converter *Converter)NewPost(data *Post, targetIdFieldName string, targetId string)(*Medium.Post, error){
	postOptions := Medium.CreatePostOptions{
		Title:         data.Title,
		Content:       "<h1>" + data.Title + "</h1>" + data.Content + "<p>----" + data.Date + "</p>",
		ContentFormat: Medium.ContentFormatHTML,
		PublishStatus: Medium.PublishStatusPublic,
	}
	if targetIdFieldName == "user" {
		postOptions.UserID = targetId
	} else {
		postOptions.PublicationId = targetId
	}
	// Create a draft post.
	post, err := converter.MediumClient.CreatePost(postOptions)
	if err != nil {
		return nil, err
	}
	return post, err
}

func NewConverter(mediumToken string, wordPressDomain string)(*Converter){
	return &Converter{
		MediumToken: mediumToken,
		WordPressDomain: wordPressDomain,
		MediumClient: Medium.NewClientWithAccessToken(mediumToken),
	}
}

func main(){
	converter := NewConverter("", "")
	converter.Convert("")
}
```

Tại thời điểm mình viết bài này thì SDK dành cho Go chưa hỗ trợ đăng bài lên publication, mình có sửa lại và tạo request, chờ đến khi bên Medium cập nhật lại SDK thì các bạn mới có thể dùng được. Còn hiện tại bạn có thể sửa code lại theo như PR của mình: [Post to publication](https://github.com/Medium/medium-sdk-go/pull/20)

Đây chỉ là một đoạn script nhỏ, đơn giản mình dùng tức thời thôi, hy vọng một lúc nào đó nó có thể giúp được bạn.
