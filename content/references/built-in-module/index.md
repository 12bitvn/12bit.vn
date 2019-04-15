---
title: "Built-in Module"
description: A short description for the post.
date: 2019-04-15T09:44:48+07:00
reference-tags: 
  - JavaScript
images:
  - /articles/built-in-module/thumbnail.png
authors:
  - vominh
draft: false
---

Built-in modules are just like regular JavaScript modules, except that they don’t have to be downloaded because they ship with the browser.

Like traditional web APIs, built-in modules must go through a standardization process — each will have its own specification that requires a design review and positive signs of support from both web developers and other browser vendors before it can ship. (In Chrome, built-in modules will follow the same launch process we use to implement and ship all new APIs.)

Unlike traditional web APIs, built-in modules are not exposed on the global scope — they’re only available via imports.

Not exposing built-in modules globally has a lot of advantages: they won’t add any overhead to starting up a new JavaScript runtime context (e.g. a new tab, worker, or service worker), and they won’t consume any memory or CPU unless they’re actually imported. Furthermore, they don’t run the risk of naming collisions with other variables defined in your code.

To import a built-in module you use the prefix std: followed by the built-in module’s identifier. For example, in supported browsers, you could import the KV Storage module with the following code (see below for how to use a KV Storage polyfill in unsupported browsers):

## Ví dụ

```
import {storage, StorageArea} from 'std:kv-storage';
```
