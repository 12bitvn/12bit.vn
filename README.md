# 12bit.vn

## Contribute

1. Make sure you have [Hugo installed](https://gohugo.io/getting-started/installing/).
2. Fork this repo.
3. Execute `hugo new articles/your-post.md` in your terminal. A `content/articles/your-post.md` file will be created with some placeholder content, like this:
    ```yaml
    ---
    title: "Test"
    description: A short description for the post.
    date: 2018-12-27T09:55:11+07:00
    tags: [max, three, tags]
    images: [/img/articles/default-thumb-1200-630.jpg]
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

### Header

| Variable        | Description           |
| ------------- |-------------|
| `title`      | The post title. |
| `description`      | The post description.      |
| `date` | The post date, it will be generated automatically. A date is specified in the format `YYYY-MM-DD HH:MM:SS +/-TTTT`.    |
| `tags` | One or multiple tags can be added to a post. We recommend you to add maximum 3 tags per post.|
| `images` | The featured image. Although it's defined as an array (YAML array), you just need to add one image. It should be placed in the same folder with post content. Eg `/articles/my-awesome-post/images/`|
| `author` | Please provide your `name` and your `github_username`. We'll use them to generate the author information for each post.|
| `draft` | Set to `true` if you don't want a specific post to show up when the site is generated. |

### Conventions

**Shortcodes**

If you want to embed things such as Codepen, Gist, Youtube, please use [Hugo Shortcode](https://gohugo.io/content-management/shortcodes/) instead of insert the raw HTML. Beside the built-in shortcodes that Hugo're supporting, we also add a list of custom shortcodes [here](https://12bit.vn/pages/shortcodes.html)

Don't find your shortcodes? create a pull request now!
