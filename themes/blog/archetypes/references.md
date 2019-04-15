---
title: "{{ replace .Name "-" " " | title }}"
description: A short description for the post.
date: {{ .Date }}
reference-tags: 
  - max
  - three
  - tags
images:
  - /articles/{{.Name}}/thumbnail.png
authors:
  - username
draft: true
---

