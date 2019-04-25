---
title: "npx là gì"
description: A short description for the post.
date: 2019-04-15T10:06:34+07:00
reference-tags: 
  - nodejs
images:
  - /articles/npx/thumbnail.png
authors:
  - vominh
draft: false
---

npx
: là một công cụ giúp bạn execute các package từ npm registry một cách đơn giản và nhanh chóng.

![](https://cdn-images-1.medium.com/max/1600/1*OlIRsvVO5aK7ja9HmwXz_Q.gif)

## Cài đặt

```
npm install -g npx
```

## Ví dụ

### Run package của riêng project

```
$ npm i -D webpack
$ npx webpack ...
```

### Run package mà không cần cài

```
$ npm rm webpack
$ npx webpack -- ...
$ cat package.json
...webpack not in "devDependencies"...
```

### Run package từ GitHub

```
$ npx github:piuccio/cowsay
...or...
$ npx git+ssh://my.hosted.git:cowsay.git#semver:^1
...etc...
```

## Tham khảo

1. [On GitHub](https://github.com/zkat/npx)
1. [Introducing npx: an npm package runner](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner)
1. [How to use npx: the npm package runner](https://blog.scottlogic.com/2018/04/05/npx-the-npm-package-runner.html)
1. [An introduction to npx, the npm package runner](https://hackernoon.com/npx-npm-package-runner-7f6683e4304a)
