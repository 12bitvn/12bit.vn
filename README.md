# 12bit.vn

## Contribute

1. Make sure you have [Hugo installed](https://gohugo.io/getting-started/installing/).
2. Fork this repo.
3. Execute `hugo new posts/your-post.md` in your terminal. A `content/posts/your-post.md` file will be created with some placeholder content, like this:
    ```yaml
    ---
    title: "Test"
    description: A short description for the post.
    date: 2018-12-27T09:55:11+07:00
    tags: [max, three, tags]
    thumbnail: /img/posts/default-thumb-1200-630.jpg
    author:
        name: Your Name
        github: github_username
    draft: true
    ---
    ```

4. Update your file. The post can be previewed with `hugo serve`.
5. Once you're happy with your post, commit the file and create a PR.

## Post format

Before creating a post, make sure you know how to use Markdown.

### Front matter

| Variable        | Description           |
| ------------- |:-------------:|
| `title`      | The post title. |
| `description`      | The post description.      |
| `date` | The post date, it will be generated automatically. A date is specified in the format `YYYY-MM-DD HH:MM:SS +/-TTTT`.    |
| `tags` | One or multiple tags can be added to a post. We recommend you to add maximum 3 tags per post.|
| `thumbnail` | The featured image. It should be placed in `/static/img/posts/`|
| `author` | Please provide your `name` and your `github_username`. We'll use them to generate the author information for each post.|
| `draft` | Set to `true` if you don't want a specific post to show up when the site is generated. |

### Content

We use Markdown for the post content, there are some conventions you should know when writing your posts.

**Shortcodes**

If you want to embed things such as Codepen, Gist, Youtube, please use ![Hugo Shortcode](https://gohugo.io/content-management/shortcodes/) instead of insert the raw HTML. 

Beside the built-in shortcodes that Hugo supports, we also add custom shortcodes:

**1. CodePen**

```markdown
{{<codepen your_user_name pen_id>}}

# example
{{<codepen tathien XEeZjV>}}
```

Don't find your shortcodes? create a pull request now!