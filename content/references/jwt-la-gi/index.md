---
title: JWT là gì
description: JWT laf moot
date: 2020-02-25T10:40:53+07:00
reference-tags:
  - authentication
authors:
  - vominh
draft: false
---

## Khái niệm

JWT là viết tắt của "JSON Web Tokens". Là một phương thức gọn nhẹ nhằm đảm bảo sự bảo mật trong các giao tiếp giữa hai đối tượng.

 > JSON Web Tokens are an open, industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties.

Nói một cách đơn giản thì JWT là JSON object được mã hoá (signing) và có thể được giải mã bởi server.



## Flow

Khi người dùng login vào hệ thống bằng các phương thức xác thực bất kỳ nào đó và yêu cầu mã JWT, server sẽ tạo ra JWT's claims bằng các thông tin nhằm định danh người dùng ví dụ như userId, sau đó mã hoá (signing) claims này bằng thuật toán có thể giải mã được.

Mã JWT này sẽ được gửi về cho người dùng, những request tiếp theo từ phía client của người dùng sẽ cần phải kèm theo jwt này.

Khi nhận được một request có kèm theo JWT thì server sẽ dùng thuật toán đã biết trước, khoá bí mật để giải mã JWT và lấy được nội dung claims.

## JWT's claims

JWT's claims là một JSON Object có chứa các thông tin nhằm giúp định danh người dùng, thông thường sẽ có các thông tin sau:

* Issuer (iss)
* Subject (sub)
* Audience (aud)
* Expiration time (exp)
* Not before (nbf)
* Issued at (iat)
* JWT ID (jti)

## Nguồn tham khảo

* [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/)
* [Introduction to JSON Web Tokens](https://jwt.io/introduction/)
