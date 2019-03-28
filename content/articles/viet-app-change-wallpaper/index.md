---
title: "Viết app change wallpaper"
description: Cùng viết application change wallpaper định kỳ theo schedule
date: 2019-03-28T09:55:07+07:00
tags: 
  - golang
  - schedule
images:
  - /articles/viet-app-change-wallpaper/images/preview.jpg
authors:
  - vominh
draft: false
---

Làm gì trong những cơn trầm cảm, lúc mà những nổi buồn-không-lý-do cứ mọc như cỏ-sau-mưa từ khắp hư không mà chẳn có một lý do nào cả. Cả công việc và hưởng thụ đều không đem lại chút cảm giác nào nữa, ngoài sự mệt mỏi. Kể cả những project cá nhân đã từng rất thú vị. Chỉ trong những khoảnh khắc hiếm hoi ở giữa những cơm trầm cảm này, bạn lại tìm thẫy chút thú vị trong những project thật ngắn ngủi.

Và mình thì chán ngấy màn hình desktop chỉ có một đồi cát, ban ngày thì có năng, đến đêm thì tự đổi hành trời đêm, vẫn đồi cát đó. Ok, mình muốn wallpaper thay đổi mỗi phút, với các chủ đề thay đổi theo giờ: Buổi sáng mình muốn ảnh về bình minh, buổi trưa là đồ ăn, và chiều là ảnh về gia đình, còn buổi tối thì là galaxy.

## Script đổi wallpaper

Đối với macOS, thì có thể sử dụng osascript sau đây để đổi:

```
tell application "System Events" to tell every desktop to set picture to "absolute path to image file"
```

Có thể thử bằng cách chạy lệnh sau trong terminal:

```
osascript -e 'tell application "System Events" to tell every desktop to set picture to "/Users/duocnguyen/wallpaper.jpg"'
```

Đối với Windows thì phải sử dụng hàm `SystemParametersInfoA` được cung cấp trong thư viện user32.dll, tham số đầu tiên của hàm này là `UI_action`, quy định action về UI, action `SPI_SETDESKWALLPAPER (0x0014)` cho phép thay đổi wallpaper. Bạn đọc thêm tại [SystemParametersInfoA function](https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-systemparametersinfoa) đồng thời tìm hiểu cách call thư viện DLL tại [Calling a Sindows DLL](https://github.com/golang/go/wiki/WindowsDLLs)

Đối với Linux thì hơi phức tạp, vì có nhiều desktop environment khác nhau, tùy theo DE nào thì chúng ta phải thay đổi config path hoặc config command tương ứng:

**GNOME**

```
gsettings set org.gnome.desktop.background picture-uri "file://background.jpg"
```

**X-Cinnamon:**

```
dconf write /org/cinnamon/desktop/background/picture-uri "file://background.jpg"
```

**MATE:**

```
dconf write /org/mate/desktop/background/picture-filename <absolute_path_to_file>
```

## Hiện thực bằng Golang

Nói thì vậy chứ chúng ta sẽ sử dụng thư viện cho khỏe người: [wallpaper](https://github.com/reujab/wallpaper) của reujab.

Thư viện cung cấp hai hàm mà chúng ta cần là `SetFromFile` và `SetFromURL`. Lẽ ra có thể sử dụng hàm `SetFromURL`, tuy nhiên hàm này có cache, nhưng mà mình dùng API của Unsplash và khi cache thì nó lưu lại trùng tên file, mà trùng tên file thì sẽ bị lỗi vì thư mục cache không cho phép edit file. Vì vậy mình phải hiện thực lại hàm download file, sau đó dùng hàm `SetFromFile`.

### Download file

```go
func downloadImage(url string) (string, error) {
	tmpFile, err := openTempFile()
	if err != nil {
		return "", err
	}
	defer tmpFile.Close()

	res, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()
	if res.StatusCode < 200 || res.StatusCode >= 300 {
		return "", errors.New("non-200 status code")
	}

	_, err = io.Copy(tmpFile, res.Body)
	if err != nil {
		return "", err
	}

	return tmpFile.Name(), nil
}
```

### Change wallpaper

```go
func changeWallpaper(schedule Schedule) error {
	sig := time.Now().Unix()
	url := fmt.Sprintf("%s?sig=%d", baseURL, sig)
	if schedule.Keywords != "" {
		url = fmt.Sprintf("%s&%s", url, schedule.Keywords)
	}
	imagePath, err := downloadImage(url)
	if err != nil {
		log.Println(err)
		return err
	}
	if err := wallpaper.SetFromFile(imagePath); err != nil {
		log.Println(err)
		return err
	}
	return nil
}
```

## Schedule

Để thực hiện schedule mình dùng thư viện [crontab](https://github.com/mileusna/crontab) của [mileusna](https://github.com/mileusna/crontab), thư viện này hỗ trợ cú pháp schedule giống như crontab, nên cũng rất tiện so với việc phải đi hiện thực lại.

Trong quá trình parse file config.json - file chứa config schedule. Mình sử dụng tiếp thư viện [tablewriter](https://github.com/olekukonko/tablewriter) của [olekukonko](https://github.com/olekukonko/) để hiên thị thông tin dạng table cho dễ nhìn:

```go
var err error
if schedules, err = parseScheduleConfig(configFilePath); err != nil {
    log.Fatalln(err)
}
table := tablewriter.NewWriter(os.Stdout)
table.SetHeader([]string{"Schedule", "Keyword", "Description"})

ctab := crontab.New()
for _, job := range schedules {
    ctab.MustAddJob(job.Schedule, changeWallpaper, job)
    table.Append([]string{job.Schedule, job.Keywords, job.Description})
}
table.Render()
```

## Chạy dưới dạng service

Một vấn đề cuối cùng, là chúng ta đâu muốn phải tự chạy cái app này mỗi lần mở máy, đúng không? Vậy hãy đăng ký nó dưới dạng service. Mỗi khi hệ thống chạy thì nó cũng sẽ chạy ngầm bên dưới, và tự khởi động lại nếu bị lỗi =))))

Thư viện [daemon](https://github.com/takama/daemon) của [takama](https://github.com/takama) hỗ trợ rất tốt việc này.

Hàm dưới đây sẽ xử lý các command liên quan tới service

```go
func handleServiceAction(serviceAction string) {
	if serviceAction != "" {
		srv, err := daemon.New(name, description)
		if err != nil {
			log.Println("Error: ", err)
			os.Exit(1)
		}
		service := &Service{srv}
		var status string

		switch serviceAction {
		case "install":
			args := []string{
				"--deamon",
			}
			for _, arg := range os.Args[1:] {
				if strings.Index(arg, "--service=") == -1 {
					args = append(args, arg)
				}
			}
			status, err = service.Install(args...)
		case "remove":
			status, err = service.Remove()
		case "start":
			status, err = service.Start()
		case "stop":
			status, err = service.Stop()
		case "status":
			status, err = service.Status()
		default:
			status = "Usage: awesome-wallpaper service install | remove | start | stop | status"
			os.Exit(0)
		}
		if err != nil {
			log.Fatalln(err)
		}
		log.Println(status)
		os.Exit(0)
	}
}
```

Giờ hãy lắng nghe tín hiệu ngắt (interrupt) hệ thống để biết khi nào thì có lệnh stop service:

```go
interrupt := make(chan os.Signal, 1)
signal.Notify(interrupt, os.Interrupt, os.Kill, syscall.SIGTERM)
killSignal := <-interrupt
log.Println("Got signal:", killSignal)
if killSignal == os.Interrupt {
    log.Println("Interruped by system signal ")
}
log.Println("Bye...")

```

Đến đây đã hoàn tất hàm main của chương trình:

```go
func main() {
	var (
		schedule       string
		keywords       string
		configFilePath string
		serviceAction  string
		showVersion    bool
		showHelp       bool
		isDeamon       bool
	)

	flag.BoolVar(&showVersion, "version", false, fmt.Sprintf("Current version: %s", version))
	flag.BoolVar(&showHelp, "help", false, "View help message")
	flag.StringVar(&schedule, "schedule", "30 * * * *", "(optional) A crontab-like syntax schedule")
	flag.StringVar(&keywords, "keywords", "", "(optional) Keyword to search for image")
	flag.StringVar(&configFilePath, "conf", "", "(optional) Config file path")
	flag.StringVar(&serviceAction, "service", "", "(optional) Action about services: install, uninstall, remove, stop, status")
	flag.BoolVar(&isDeamon, "deamon", false, "(optional) Indicate if program is running as deamon")
	flag.Parse()

	if showHelp {
		flag.PrintDefaults()
		os.Exit(0)
	}

	if showVersion {
		log.Printf("awesome-wallpaper %s\n", version)
		os.Exit(0)
	}

	handleServiceAction(serviceAction)
	setupLogger(isDeamon)

	var schedules []Schedule
	if configFilePath != "" {
		var err error
		if schedules, err = parseScheduleConfig(configFilePath); err != nil {
			log.Fatalln(err)
		}
	} else {
		schedules = []Schedule{
			{
				Schedule: schedule,
				Keywords: keywords,
			},
		}
	}

	table := tablewriter.NewWriter(os.Stdout)
	table.SetHeader([]string{"Schedule", "Keyword", "Description"})

	ctab := crontab.New()
	for _, job := range schedules {
		ctab.MustAddJob(job.Schedule, changeWallpaper, job)
		table.Append([]string{job.Schedule, job.Keywords, job.Description})
	}
	table.Render()

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, os.Kill, syscall.SIGTERM)

	log.Println("Running...")

	killSignal := <-interrupt
	log.Println("Got signal:", killSignal)
	if killSignal == os.Interrupt {
		log.Println("Interruped by system signal ")
	}
	log.Println("Bye...")
}
```

## Lời kết

Bài viết ngắn gọn, chủ yếu là code, mong bạn thông cảm và hỗ trợ update nếu có gì sai sót. Về phần code đầy đủ, mình đã push lên GitHub, các bạn có thể xem tại:

{{<gh-repos "nguyenvanduocit/awesome-wallpaper">}}

Phần service hiện tại không hoạt động được trên Windows.
