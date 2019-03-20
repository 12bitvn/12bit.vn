---
title: "{{ replace .Name "-" " " | title }}"
description: A short description for the post.
date: {{ .Date }}
tags: 
  - max
  - three
  - tags
images:
  - /articles/{{.Name}}/thumbnail.png
author:
    name: Your Name
    github: github_username
draft: true
---

