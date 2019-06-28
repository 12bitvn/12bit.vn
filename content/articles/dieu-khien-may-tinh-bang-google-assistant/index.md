---
title: "Điều khiển máy tính bằng Google Assistant"
description: Hướng dẫn điều khiển máy tính bằng Google Assistant
date: 2019-06-27T16:36:15+07:00
tags: 
  - Google Assistant
  - Golang
images:
  - /articles/dieu-khien-may-tinh-bang-google-assistant/images/thumbnail.png
authors:
  - vominh
---

Bạn có thể sử dụng Google Assistant để điều khiển các thiết bị điện tử trong nhà, đọc báo và xem dự báo thời tiết thì tại sao lại không thể sử dụng nó để điều khiển máy tính nhỉ. Nay chúng ta sẽ cùng viết một công cụ để làm cái chuyện đó.

## Tóm tắt

1. Tạo API handle request và đưa message vào RabbitMQ
1. Client trên mac sẽ consume message và thực hiện các action trên mac
1. Tạo custom voice command cho Google Assistant bằng IFTTT, post message đến API vừa tạo

Công việc cũng khá là đơn giản, chỉ là phải sử dụng tận 3 dịch vụ mà thôi: IFTTT, Integromat và Google Assistant.

## Đăng ký RabbitMQ

RabbitMQ là một message-broker nguồn mở. Bạn có thể cài đặt trên server riêng hoặc sử dụng dịch vụ trên cloud của [CloudAMQP](https://www.cloudamqp.com/). Rất may là ứng dụng mà chúng ta đang làm không đòi hỏi nhiều, nên có thể sử dụng plan free của CloudAMQP.

Sau khi có tài khoản của CloudAMQP bạn truy cập vào [Create New Instance](https://customer.cloudamqp.com/instance/create) và tạo một instance mới, cứ tuần tự làm theo các chỉ dẫn trên page.

Khi đã tạo xong, bạn quay lại trang [Instances](https://customer.cloudamqp.com/instance) sẽ thấy instance vừa tạo, click vào edit để xem detail của instance, hãy lưu lại `AMQP URL`, chúng ta sẽ cần nó để kết nối. Bạn cũng có thể click vào "RabbitMQ Manager" để đến trang quản lý RabbitMQ và xem qua một chút.

## Tiếp nhận request

Giờ bạn cần phải có một nơi nào đó để tiếp nhận request và chuyển message vào RabbitMQ. Có nhiều cách để hiện thực, bạn có thể viết một server hoặc sử dụng dụng dịch vụ của bên thứ ba mà ở đây chính là Integromat. Nó cũng khá giống với IFTTT, nhưng có hỗ trợ chuyển dữ liệu từ webhook vào RabbitMQ. 

Bạn cần đăng ký một account tại integromat.com. Sau đó vào trang [Create scenario](https://www.integromat.com/scenario/add) vào tạo một scenario mới. Gõ vào khung search `webhook` và click vào item Webhook.

![](/articles/dieu-khien-may-tinh-bang-google-assistant/images/1.jpg)

Sau đó chọn `custom webhook`

![](/articles/dieu-khien-may-tinh-bang-google-assistant/images/2.jpg)

Ấn button `add` và nhập tên của webhook, tên này để gợi nhớ thôi.  Sau cùng bạn sẽ nhận được url để post dữ liệu vào:

![](/articles/dieu-khien-may-tinh-bang-google-assistant/images/3.jpg)

Lưu ý link này nhé, chúng ta sẽ sử dụng nó khi tạo applet bên IFTTT.

Bấm vào dấu cộng ở cạnh module webhook vào add thêm module RabbitMQ, và chọn `send to queue`:

![](/articles/dieu-khien-may-tinh-bang-google-assistant/images/4.jpg)

Nhập vào những thông tin mà bạn có được từ bên details của RabbitMQ instance mà chúng ta đã tạo lúc nảy.

![](/articles/dieu-khien-may-tinh-bang-google-assistant/images/5.jpg)

Bạn vẫn chưa thể điền được nội dung vào field `content` được, muốn nhập được chỗ này thì Integromat phải detect được cấu trúc database mà bạn sẽ gửi qua. Muốn làm được điều này thì phải tạo applet bên IFTTT trước. Chúng ta sẽ quay lại bước này sau.

## Tạo Custom Voice Command Cho Google Assistant Bằng IFTTT

Google Assistant không hỗ trợ custom command mà phải tích hợp thông qua dịch vụ của IFTTT. Vì vậy bạn cần phải có account của IFTTT, liên kết nó với account Google, và tạo applet như sau:

Cần truy cập vào [trang tạo applet](https://ifttt.com/create), Click tạo một applet handle event từ Google Assistant đến webhook:

Ở phần Google Assistant

1. **What do you want to say?**: lock my mac
1. **What do you want the Assistant to say in response?**: I'm locking your mac

Ở mục Make a web request:

1. **URL**: là url bạn lấy được bên Integromat
1. **Method**: POST
1. **Content Type (optional)**: text/plain
1. **Body (optional)**: lock

Giờ quay lại Integromat, edit scenario, chọn module webhook và bấm vào `determine data struct`, mở Google Assistant lên và nói "lock my mac". Lúc này Google Assistant sẽ request đến bên IFTTT, và IFTTT sẽ post `lock` vào webhook của Integromat. Integromat sẽ detect được data struct.

![](/articles/dieu-khien-may-tinh-bang-google-assistant/images/6.jpg)

Sau đó chọn module RabbitMQ, ở mục content, bạn chọn `value`:

![](/articles/dieu-khien-may-tinh-bang-google-assistant/images/7.jpg)

Đến bước này, khi bạn ra lệnh trên Google Assistant thì sẽ có một message được đưa vào RabbitMQ. Tiếp theo chúng ta sẽ viết tool trên Mac để consume các message này và thực thi các lệnh tương ứng trên mac.

## Rabbit Assistant

Cái tên RabbitMQ làm nỗi nhớ chị Thỏ Ngọc ngày nào trổi dậy và càng thêm da diết, thế nên mình đặt tên project này là Rabbit  Assistant. Mà thôi, dẫu sao giờ chị Thỏ Ngọc hay kể chuyện đêm khuya cũng không còn nữa mà thay vào đó là những anh khoai tây, anh khoai lang, ngày ngày quảng cáo đồ chơi rồi.

Để dễ hiểu thì mình sẽ chỉ nói những phần chính trong code này thôi, Bạn có thể sử dụng thêm cobra để hỗ trợ làm cli tiện hơn hoặc viết thêm deamon để chương trình chạy dưới dạng service - cái này quan trọng, mình sẽ nói ở một bài khác.

```
func main() {
	conn, err := amqp.Dial("amqp url")
	util.FatalIfError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	util.FatalIfError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"mac-command", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	util.FatalIfError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	util.FatalIfError(err, "Failed to register a consumer")

	forever := make(chan bool)

	go func() {
		for msg := range msgs {
			body := string(msg.Body)
			notify(body)
			handleMessage(body)
			notify("Success!")
		}
	}()
	log.Printf(" [*] Waiting for messages.")
	<-forever
}

func handleMessage(request string){
	messageParts := strings.Split(request, " ")
	command := messageParts[0]
	switch command {
	case "sleep":
		util.RunCommand("./", "pmset", []string{"sleepnow"}, nil, nil)
	case "wakeup":
		util.RunCommand("./", "caffeinate", []string{"-u", "-t", "2"}, nil, nil)
	case "unlock":
		unlock()
	case "notify":
		message := messageParts[1]
		notify(message)
	case "truekit":
		args := messageParts[1:]
		util.RunCommand("./", "true-kit", args, nil, nil)
	}
}

func unlock(){
	script := `do shell script "caffeinate -u -t 2"
delay 1
tell application "System Events"
    keystroke "password mac"
    delay 1
    keystroke return
end tell
`
	util.RunCommand("./", "/usr/bin/osascript", []string{"-e", script}, nil, nil)

}

func notify(message string){
	script := `display notification "` + message + `" sound name "default" with title "Rabbit Assistant"`
	util.RunCommand("./", "/usr/bin/osascript", []string{"-e", script}, nil, nil)

}
```

Chương trình trên sẽ subscribe vào queue tên là `mac-command`, đây là queue mà chúng ta đã thiết lập cho Integromat push message vào.

Khi nhận được message, chúng ta sẽ thử parse nó ra, sau đó tùy theo command mà sẽ thực hiện các tác vụ như khóa máy, mơer máy, hiển thị thông báo hoặc chạy một ứng dụng khác.

Một điều thú vị mình biết được khi làm cái này đó là bạn có thể dùng applescript để unlock máy từ bên trong.

## Lời kết

Qua bài viết này mong rằng có thể đem những ký ức về chị Thỏ Ngọc quay trở lại với những năng tháng mệt mỏi, nặng nề khi nhìn đâu cũng thấy bug này.  
