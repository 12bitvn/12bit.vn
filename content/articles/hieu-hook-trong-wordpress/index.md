---
authors:
  - vominh
date: "2018-06-24T06:54:18+07:00"
draft: false
images:
- https://cdn-images-1.medium.com/max/1600/1*c4p2qOb4wiOwi2ICqG7r4g.jpeg
tags:
- WordPress Hook
- WordPress
title: Hiểu sâu về hook trong WordPress
---

Nếu đã từng code với WordPress thì bạn sẽ ít nhất một lần nghe nói hoặc đã sử dụng hook (`add_action()`, `add_filter()`), nó là thứ rất quen thuộc trong WordPress. Chính nó đã đem lại cho theme, plugin và chính WordPress khả năng tùy biến mạnh mẽ mà không phải hack. Và cũng chính nhờ nó mà việc debug của dev chúng ta trở nên ... không lường.

## Hook là gì?

{{<figure src="https://cdn-images-1.medium.com/max/1600/1*c4p2qOb4wiOwi2ICqG7r4g.jpeg" title="Nguồn: Google">}}

Hook trong tiếng Việt nghĩa là móc. Hook trong WordPress cũng mang ý nghĩa tương tự, cho phép "móc" code của bạn vào code của người khác mà không phải hack vào code của họ. Hoặc tạo ra một điểm cho người khác móc code của họ vào.

Hook là một cách hiện thực của event-driven pattern. Chúng ta sẽ nói về nó một chút ở phần sau.

Có hai loại hook trong WordPress đó là Actions và Filters. Hai loại hook này không khác biệt nhau quá nhiều, chỉ là filter dùng để thay đổi giá trị, còn action thì không.

## Event-driven

Theo Wiki:

> "Event-driven architecture (EDA), also known as message-driven architecture, is a software architecture pattern promoting the production, detection, consumption of, and reaction to events."

Ưu điểm lớn nhất của event-driven pattern là đem lại khả năng mở rộng cho code, bạn không cần phải dùng config để cho phép developer khác tùy chỉnh chức năng trong code của bạn. Họ cũng không cần phải kế thừa cả một class chỉ để thay đổi một giá trị.

Trước khi hook và plugin được đem vào WordPress, muốn custom WordPress bạn sẽ phải hack vào core, mỗi lần có bản update, bạn phải so sánh nó với những thay đổi mà bạn tạo ra. Việc này đòi hỏi người dùng phải biết code, mà kể cả khi bạn biết code thì nó cũng mất nhiều thời gian và dễ gây ra sai lầm.

Pattern này rất hữu ích với WordPress, giờ thì việc update sẽ đơn giản hơn, vì nó không đè lên những customize của bạn, vì các customize này được đặt riêng trong các plugin, và hook vào core để thay đổi giá trị hoặc thực thi một hành động nào đó.

Và việc code với hook cũng khá đơn giản, kể cả với những người mới. chỉ có 4 hàm dễ nhớ và danh sách dài những hook mà khi nào bạn cần thì có thể tra cứu.

Tuy nhiên cũng có những mặt trái của nó.

Đối với event-driven sẽ có hai đối tượng là subscriber và publisher.

Subscriber sẽ chỉ nhận được những giá trị định nào đó mà phía publisher cung cấp mà thôi. Publisher sẽ luôn cố cung cấp các giá trị thích hợp nhất có thể, nhưng nhu cầu của người dùng thì rất nhiều. Đôi khi bạn cần những giá trị mà publisher không cung cấp. Khi đó hoặc là phải liên hệ để thay đổi code bên publisher để đưa thêm dữ liệu vào, mà việc đó thì đòi hỏi phải thay đổi code. Có thể là thay đổi giá trị của tham số hoặc phải thêm tham số, việc thêm tham số sẽ không gây ảnh hưởng lớn, nhưng lâu dài, nó làm code xấu hơn và rối rắm, cũng như sẽ nặng nề hơn. Thay đổi giá trị của tham số thì khác, nếu nó vốn là object hoặc array, publisher chỉ cần thêm thuộc tính hoặc phần tử mới vào, nhưng nếu nó là biến đơn giản như int, string, thì việc thay đổi có thể dẫn tới break change. Nên đối với event-driven cần phải có sự đồng thuận cao giữa publisher và subscriber.

Một vấn đề nữa là khó debug. Bạn có thể hình dung một mô hình với một node ở trung tâm và có cả chục node khác được nối vào nó, trong từng node đó có thể nối với cả chục node khác, và một lỗi làm break cả website có thể do một dấu chấm phẩy ở bất kỳ một node nào, hoặc không node nào có lỗi, thậm chí chạy riêng từ node không có lỗi gì, nhưng kết quả trong hàm của bạn lại cho ra kết quả sai. Listing từ hàm `get_posts `rất đơn giản mà bạn chép lại từ internet hoặc từ file `home.php` qua file `index.php` lại cho ra kết quả sai. Và bạn rất khó để biết nó sai ở chỗ nào.

### Under the hood

Chúng ta sẽ tìm hiểu về filter là chủ yếu, action thì cũng giống như filter mà thôi.

### Biến global

Hãy mò vào source code của WordPress, và xem file wp-includes/plugin.php:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1600/1*ua53YRcKxOB8uN8l87YNuQ.png">}}

Vậy các hook được lưu lại thành những biến global, là các array mà phần tử là instance của class `WP_Hook`.

### Add filter

Đây là hàm `add_filter`:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1600/1*VP_CKlJhfKh7amTmnJm34g.png">}}

Cách đây khá lâu, mình cũng viết một bài về hook như vầy, hồi đó nó đơn giản hơn nhiều, `$wp_filter` là một array hai chiều, mỗi tag là một array với priority là key, giá trị là callable, khi filter được gọi, nó sẽ gọi các callbable này.

Bây giờ thì nó đã thay đổi nhiều, hàm `add_filter` đóng vai trò quản lý, các logic chính của filter đã được đóng gói vào class `WP_Hook`.

Nhưng tên của hàm và phương thức lại trùng nhau, vì vậy khi mình nói hàm nghĩa là các hàm trong file plugins.php, còn phương thức nghĩa là phương thức trong class `WP_Hook`.

Hãy xem phương thức `add_filter `có gì:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1600/1*uyk-hIQmF7mIeVCe1jC7xA.png">}}

Không có gì phức tạp, nhưng `nesting_level` là gì? Liệu nó có nghĩa là sẽ có các filter lồng vào nhau? Chúng ta sẽ tìm hiểu về nó sau khi hiểu hàm `apply_filters`.

### Phương thức apply_filters

{{<zoom-img src="https://cdn-images-1.medium.com/max/1600/1*2VHhC38J3P0a_CDwZDC4ag.png">}}

Có một hook đặc biệt tên là `all`, nó sẽ luôn được chạy khi bất kỳ hook nào được gọi. Và tham số của nó là reference của $args, nghĩa là bạn có thể thay đổi giá trị của `$args`.

Biến global `$wp_current_filter` dùng để chưa danh sách các hook đang được thực thi, sau khi thực thi xong thì nó sẽ được loại bỏ, mục đích là để track lại danh sách các hook đang thực thi thôi, vì trường hợp các hook lồng nhau là rất hay xảy ra.

Còn đây là phương thức để gọi tới hook `all`.

{{<zoom-img src="https://cdn-images-1.medium.com/max/1600/1*wid3Xdr5GpEEKo2_QZ2iKw.png">}}

Nó khá giống với `apply_filters` nên thôi ta sẽ bỏ qua. Giờ hãy xem phương thức `apply_filters`:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1600/1*6XcCDLVsGdIqVwfOW5I9Aw.png">}}

Giờ là lúc quay lại với `nesting_level`.

Ở đầu phương thức, `nesting_level` được tăng lên, rồi dùng nó làm key cho array `iterations`, đây là array chứa danh sách các callback của level hiện tại.

Nhìn lại những đoạn code khác, sẽ thấy thuộc tính này thay đổi giá trị ở các phương thức `apply_filters` và `do_all_hook`.

Như vậy có thể biết được là thuộc tính `nesting_level` sẽ được tăng lên mỗi khi chúng ta gọi hàm` apply_filters`.

Vì sao lại cần nó? Vì có một trường hợp, là khi `apply_filters('a')`, trong hàm callback lại gọi tới `add_fitler('a', __callback)` và `apply_filter('a')`. Nghe hơi rắc rối, nhưng cũng dễ gặp, đó là `recursive filtering`.

Khi `add_filter` thì thuộc tính callbacks sẽ thay đổi, và làm cho mọi vòng lặp dựa trên thuộc tính này thay đổi, làm sao để bảo toàn nó?

WordPress đã hiện thực bằng cách: mỗi khi phương thức `apply_filters` được gọi thì nó sẽ tạo ra một phần tử trong thuộc tính `iterations` để lưu lại các giá trị hiện tại.

### Do action

Như đã nói lúc đầu, action là filter mà thôi:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1600/1*iGpN18gxQ-Lite-UqGB7Kg.png">}}

Và đây là phương thức `do_action`:

{{<zoom-img src="https://cdn-images-1.medium.com/max/1600/1*uI8oDw8wb8n8hkJKYTjPow.png">}}

## Lời kết

Như vậy chúng ta đã tìm hiểu xong về hook bằng cách mò mẫm vào mã nguồn của WordPress. Hiểu được nó chính là hiện thực của even-driver pattern. Điểm mạnh và điểm yếu mà nó đem lại. Và cũng thấy được rằng core của WordPress cũng thường thay đổi để đáp ứng nhu cầu phát triển ngày càng lớn, ta cũng yên tâm hơn rằng project này vẫn rất sôi động và vòng đời có lẽ còn dài.
