---
title: "Viết bash completion với Golang"
description: Viết app hỗ trợ autocomplete cho zsh.
date: 2019-06-17T18:19:38+07:00
tags: 
  - bash
  - bash completion
  - golang
images:
  - /articles/complete-trong-zsh/thumbnail.png
authors:
  - vominh
---

Khi viết một cli tool cho công ty thì mình gặp một vấn đề: command phức tạp mà người dùng thì lại lười đọc doc, dẫu có đọc thì cũng dễ quên, bỏ qua vấn đề về việc tối ưu lại tên các option, flag này nọ vì số lượng command lớn mà không có cách nào để giảm tải được. Nên còn một giải pháp đó là hiện thực autocomplete giống như trong các editor hoặc IDE như PHPStorm, Visual Studio Code, ...

Bash, zsh hay fish đều có hỗ trợ script và interface để viết autocomplete:

1. [Creating a bash completion script](https://iridakos.com/tutorials/2018/03/01/bash-programmable-completion-tutorial.html)
1. [Writing zsh completion scripts](https://mads-hartmann.com/2017/08/06/writing-zsh-completion-scripts.html)
1. [Writing your own completions](http://fishshell.com/docs/current/index.html#completion-own)

Nhưng nhìn chung thì khá là ... không quen thuộc cho lắm. Vì vậy mình tìm tới giải pháp đơn giản hơn, đó là sử dụng golang để build ra một chương trình bằng Golang mà nó sẽ nhận request từ shell và trả về nội dung gợi ý có cấu trúc phù hợp với cấu trúc mà shell quy định. (đọc thêm tại [complete.go](https://github.com/posener/complete/blob/master/complete.go)).

## Thư viện

Mình sẽ sử dụng thư viện [posener/complete](https://github.com/posener/complete):

{{<gh-repos "posener/complete">}}

Thư viện này hỗ trợ bash, zsh và fish. Chúng ta có thể define command, nhiều sub command và flag, ví dụ như sau:

```
import "github.com/posener/complete"

func main() {

	// create a Command object, that represents the command we want
	// to complete.
	run := complete.Command{

		// Sub defines a list of sub commands of the program,
		// this is recursive, since every command is of type command also.
		Sub: complete.Commands{

			// add a build sub command
			"build": complete.Command {

				// define flags of the build sub command
				Flags: complete.Flags{
					// build sub command has a flag '-cpus', which
					// expects number of cpus after it. in that case
					// anything could complete this flag.
					"-cpus": complete.PredictAnything,
				},
			},
		},

		// define flags of the 'run' main command
		Flags: complete.Flags{
			// a flag -o, which expects a file ending with .out after
			// it, the tab completion will auto complete for files matching
			// the given pattern.
			"-o": complete.PredictFiles("*.out"),
		},

		// define global flags of the 'run' main command
		// those will show up also when a sub command was entered in the
		// command line
		GlobalFlags: complete.Flags{

			// a flag '-h' which does not expects anything after it
			"-h": complete.PredictNothing,
		},
	}

	// run the command completion, as part of the main() function.
	// this triggers the autocompletion when needed.
	// name must be exactly as the binary that we want to complete.
	complete.New("run", run).Run()
}
```

Ví dụ trên này là để khi bạn gõ `run <tab>` thì nó sẽ show ra các gợi ý bao gôm một subcommand là `build` và global flag là `-h`. Nếu gõ `run build <tab>` thì sẽ gợi ý thêm tag `-g` kèm theo global flag `-h`.

## Hiện thực

À mà cái ví dụ phía trên là coi như xong cái tool của mình rồi đó nên khỏi phải viết chi tiết về cái tool của mình làm gì, chỉ chỉ khác ở chỗ số lượng command trong chương trình của mình lớn hơn khá nhiều, vì vậy mình sử dụng map, array và một số hàm hỗ trợ này nọ.

Chương trình này không nên quá nặng, chạy quá lâu, bởi vì mỗi khi người dùng bấm phí tab thì shell sẽ excute function này để generate các option, nếu chương trình của bạn chưa chạy xong mà người dùng ấn `<tab>` thì nó sẽ tiếp tục gọi thêm một lần nữa. Vậy đó. Giả sử chương trình của bạn cần gọi API, quét thư mục, đọc file thì hơi phiền phức.

## Usage

Giờ sau khi đã viết code xong, bạn có thể build nó và install bằng cách di chuyển tới thư mục chưa file `main.go` và gọi lệnh `go install`:

```
go installl ./
```

Hãy đảm bảo là thư mục `$GOHOME/bin` đã được nối vào `$PATH`, có như vậy thì bạn mới có thể gọi các file thực thi trong thư mục này ở bất cứ đâu.

Ví dụ app của bạn là `true-complete`.

Bạn cần cài chạy command cài đặt để chương trình tự động add những config cần thiết vào file config của shell:

```
true-complete -install
```

Giờ khởi động lại shell để nó cập nhật file config và sau đó bạn có thể gõ `run <tab>`, chú ý là có `<space>` ở ngay sau `run` nhé, thì bạn sẽ thấy các tùy chọn hiện ra ở ngay phía dưới dòng mà bạn đang gõ, nếu tiếp tục gõ `<tab>` thì bạn sẽ thấy con trỏ nhảy vào các gợi ý này.

Nếu không muốn autocomplete nữa thì:

```
true-complete -uninstall
```

Nhưng bạn lưu ý rằng với cách chúng ta vừa hiện thực, thì program dùng để tạo ra completion sẽ nằm riêng và program thực sự sẽ nằm riêng, như trong ví dụ này thì ta sẽ có hai file là:

1. `run`: file này có thể là bất cứ gì khác, là chương trình chính của bạn.
1. `true-complete`: file dùng để cài đặt completion

Thế thì làm sao để tích hợp hai cái này vào một, chỉ cần một file `run` thôi, code cài đặt complete nằm trong file đó luôn, hãy xem ví dụ sau:

```
// Package self
// a program that complete itself
package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/posener/complete"
)

func main() {

	// add a variable to the program
	var name string
	flag.StringVar(&name, "name", "", "Give your name")

	// create the complete command
	cmp := complete.New(
		"self",
		complete.Command{Flags: complete.Flags{"-name": complete.PredictAnything}},
	)

	// AddFlags adds the completion flags to the program flags,
	// in case of using non-default flag set, it is possible to pass
	// it as an argument.
	// it is possible to set custom flags name
	// so when one will type 'self -h', he will see '-complete' to install the
	// completion and -uncomplete to uninstall it.
	cmp.CLI.InstallName = "complete"
	cmp.CLI.UninstallName = "uncomplete"
	cmp.AddFlags(nil)

	// parse the flags - both the program's flags and the completion flags
	flag.Parse()

	// run the completion, in case that the completion was invoked
	// and ran as a completion script or handled a flag that passed
	// as argument, the Run method will return true,
	// in that case, our program have nothing to do and should return.
	if cmp.Complete() {
		return
	}

	// if the completion did not do anything, we can run our program logic here.
	if name == "" {
		fmt.Println("Your name is missing")
		os.Exit(1)
	}

	fmt.Println("Hi,", name)
}
```

lưu ý rằng giờ thì bạn có thể tùy chỉnh được tên của command dùng để install và uninstall cái complete này thông qua việc set giá trị cho hai thuộc tính `cmp.CLI.InstallName` và `cmp.CLI.UninstallName`.

Theo ví dụ trên thì sử dụng như sau:

```
# sử dụng mà không install complete
run -name vominh

# install complete
run -complete

# uninstall complete
run -uncomplete
```

## Lời kết

Tuy nhiên thì ... để cuối cùng mình đã chọn một cách khác để hiện thực completion này cho tool của công ty, bởi vì như đã nói lúc đầu thì app complete này nên gọn nhẹn thôi, mà tool của mình thì lại hơi phức tạp, nên mình đã sa đà vào việc scan thư mục, đọc config file này nọ nên nó chạy nặng lắm.
