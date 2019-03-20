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

Năm 2016 Apple giới thiệu Touchbar trên các dòng MacBook Pro. Thực ra lúc mới sử dụng nó thì mình cảm thấy nó không có ý nghĩa lắm, vì ít có phần mềm nào tích hợp, các nút có trên nó thì đều có thể dùng chuột được. Sau đó thì mình tìm ra phần mềm BetterTouchTool và khám phá ra nhiều việc có thể làm với touchbar, ví dụ như các shortcut hoặc app switcher, nhưng một thời gian thì cũng không có thói quen sử dụng, vị trí của nó không tiện dụng với mình lắm. Nên rồi mình cũng quên nó mất.

Tình cờ xem được repo [tomato](https://github.com/ng-vu/tomato) của bạn [Vũ](https://github.com/ng-vu) nên tìm hiểu thử cách mà bạn sử dụng. Mình không biết code cho touchbar một cách native. Cách mà bạn sử dụng ở đây là dựa vào các chức năng do BetterTouchTool hỗ trợ.

BetterTouchTool hỗ trợ tạo ra các widget và hiển thị trên touchbar và cho phép điều khiển widget đó thông qua HTTP API. Bạn có thể đọc tại đây: [Integrated Webserver](https://docs.bettertouchtool.net/docs/webserver.html).

## Shopify Widget

Chúng ta sẽ làm một widget trên touchbar có chức năng hiển thị số lượng order mà shop có trong một khoản thời gian nhất định. Đơn giản là gọi API của Shopify để lấy số lượng order sau đó hiển thị lên touchbar.

## Tạo Widget bằng BetterTouchTool

Như đã nói ở phần đầu, chúng ta cần phải tạo một widget trong BetterTouchTool:

Bước 1: Mở app BetterTouchTool lên

Bước 2: Click vào tab `Touchbar`

Bước 3: Click vào nút `+widget/Gesture`

Bước 4: Chọn widget `Run Apple Script and show Return value`

{{< zoom-img src="/articles/tao-widget-tren-touchbar/images/1.png" >}}

Bước 5: Đặt tên của widget, đặt icon và xóa nội dung trong phần script đi:

{{< zoom-img src="/articles/tao-widget-tren-touchbar/images/2.png" >}}

 Bước 6: Copy UUID của widget bằng cách bấm chuột phải lên widget và chọn `Copy UUID`.

 {{< zoom-img src="/articles/tao-widget-tren-touchbar/images/3.png" >}}

## Enable webserver

Webserver cung cấp API để bạn update widget đã tạo ở bước vừa rồi

Bước 1: Mở BetterTouchToll

Bước 2: Bấm vào thẻ `Advanced Settings` > `Webserver`:

{{< zoom-img src="/articles/tao-widget-tren-touchbar/images/4.png" >}}

Chọn `Enable BetterTouchTool webserver`. Nhớ lưu lại address và port.

## API Update webserver

Đọc tài liệu về webserver tại trang [tài liệu](https://docs.bettertouchtool.net/docs/webserver.html) thì thấy có method `update_touch_bar_widget` giúp update widget:

> This method will update the contents of a Touch Bar Script Widget (identified by its uuid). You can provide a new text to show, a new icon and a new background color.

Chấp nhận các tham số sau đây:

| Tham số | Ý nghĩa | Ví dụ |
|---------|---------|-------|
| uuid | UUID của widget | CC46E199-B07D-4BF7-AC36-48AAE558540B|
|text| Text hiển thị | sampel text |
| icon_path | relative path đến file icon hoặc base64 code | /Users/andi/Desktop/test.png |
| background_color| màu background | 200,200,100,255 |

Bây giờ theo như vậy, chúng ta sẽ có được URL như sau:

```
http://127.0.0.1:56234/update_touch_bar_widget/?uuid=DD5ED90F-78CE-42E1-97B1-763688005A5F&text=ahihi&background_color=200,200,100,255
```

chúng ta có kết quả như sau:

![](/articles/tao-widget-tren-touchbar/images/5.png)

## Lấy dữ liệu từ Shopify

Shopify có cung cấp API để lấy tổng số lượng order dựa vào một số tiêu chí mà bạn có thể đọc được tại: [Order count](https://help.shopify.com/en/api/reference/orders/order#count)

Ta sẽ sử dụng tham số `created_at_min` và `created_at_max` để giới hạn thời gian cần đếm.

### Khai báo các flag như sau:

```
var (
	httpClient                             = http.Client{}
	UUID                                   string
	port, ip                               string
	apiKey, apiSecret, domain, accessToken string
	logoPath                               string
)

flag.StringVar(&apiKey, "api_key", "", "Shopify API Key")
flag.StringVar(&apiSecret, "api_secret", "", "Shopify API Secret")
flag.StringVar(&domain, "domain", "", "Shopify domain")
flag.StringVar(&accessToken, "access_token", "", "Shopify accesstoken")
flag.StringVar(&port, "port", "56234", "BTT Port")
flag.StringVar(&ip, "ip", "127.0.0.1", "BTT IP")
flag.StringVar(&UUID, "uuid", "", "BTT widget's UUID")
```

### Tạo shopify client

Chúng ta có package hỗ trợ là `go-shopify`:

```
go get github.com/bold-commerce/go-shopify
```

```
app := goshopify.App{
	ApiKey:    apiKey,
	ApiSecret: apiSecret,
}
client := goshopify.NewClient(app, domain, accessToken)
```

### Lấy sô lượng order:

```
func getOrderCount(client *goshopify.Client)(int, error){
	today := time.Now()
	return client.Order.Count(goshopify.OrderListOptions{
		CreatedAtMin: time.Date(today.Year(), today.Month(), today.Day(), 0, 0, 0, 0, today.Location()),
		CreatedAtMax: today,
	})
}
```

### Download logo

```
func downloadLogo(domain string) (string, error) {
	iconUrl, err := getFavicon(domain)
	if err != nil {
		return "", err
	}
	ext := filepath.Ext(iconUrl)
	filePath, err := filepath.Abs(fmt.Sprintf("./%s%s", domain, ext))
	if err != nil {
		return "", err
	}
	out, err := os.Create(filePath)
	defer out.Close()

	resp, err := http.Get(iconUrl)
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("bad status: %s", resp.Status)
	}
	if _, err := io.Copy(out, resp.Body); err != nil {
		return "", err
	}
	return filePath, nil
}

func getFavicon(domain string) (string, error) {
	response, err := httpClient.Get(fmt.Sprintf("http://favicongrabber.com/api/grab/%s", domain))
	if err != nil {
		return "", err
	}
	body, readErr := ioutil.ReadAll(response.Body)
	if readErr != nil {
		return "", err
	}
	result := struct {
		Icons []*struct {
			Src string `json:"src"`
		} `json:"icons"`
	}{}
	if err := json.Unmarshal(body, &result); err != nil {
		return "", err
	}
	if len(result.Icons) == 0 {
		return "", errors.New("Icon not found")
	}
	return result.Icons[0].Src, nil
}
```

### Request tới webserver

```
func doRequest(text string) error {
	url := fmt.Sprintf("http://%s:%s/update_touch_bar_widget/?uuid=%s&text=%s&icon_path=%s", ip, port, UUID, text, logoPath)
	resp, err := httpClient.Get(url)
	if err != nil {
		return err
	}
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("Response status: %v, %s", resp.Status, url)
	}
	return nil
}
```

### Tổng hợp

```
func updateData(client *goshopify.Client) {
	todayOrders, err := getOrderCount(client)
	if err != nil {
		log.Panicln(err)
		return
	}
	if err := doRequest(fmt.Sprintf("Orders today: %d", todayOrders)); err != nil {
		log.Panicln(err)
	}
}
```

Bạn có thể xem full code tại repo của mình:

{{<gh-repos "nguyenvanduocit/shopifyTouchbar">}}

### Test

Bạn có thể test bằng cách run

```
go run ./main.go [<các tham số>]
```

Kết quả sẽ như sau:

{{< zoom-img src="/articles/tao-widget-tren-touchbar/images/6.png" >}}

## Lời kết

Thực ra việc này có thể được thực hiện đơn giản hơn bằng cách sử dụng Apple Script, chức năng này được chính BetterTouchTool cung cấp.
