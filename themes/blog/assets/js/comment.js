var app = new Vue({
  el: '#js_comment',
  data: {
    isAnonymous: false,
    isFocusOnContent: false,
    content: '',
    author: '',
    email: '',
    slug: '',
    comments: [],
    graphqlEndpoint: 'https://api.graph.cool/simple/v1/cjq6ekfc67g5w0179c5v9205a'
  },
  async mounted () {
    this.slug = this.$el.dataset.slug

    // Make sure that DOM is rendered already then get commetns by the article slug.
    let data = await this.getComments()
    this.comments = data.allComments
  },
  methods: {
    async getComments () {
      let query = `query {allComments(filter: {
        slug: "${this.slug}"
      }, orderBy: createdAt_DESC) {id, author, email, content, createdAt, slug}}`
      let data = await this.request(query)
      return data
    },
    async postComment () {
      if (this.content === '') {
        return
      }

      if (!this.isAnonymous && (this.author === '' || this.email === '')) {
        return
      }

      this.author = this.isAnonymous ? 'Ẩn danh' : this.author

      let query = `mutation {
        createComment(
          author: "${this.author}"
          email: "${this.email}"
          content: "${encodeURI(this.content)}"
          slug: "${this.slug}"
        ) {
            id
            content
            author
            email
            slug
            createdAt
          }
        }`
      let data = await this.request(query)
      this.comments.push(data.createComment)
      this.cleanForm()
    },
    async request (query, method = 'GET') {
      let res = await fetch(this.graphqlEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query })
      })
      let json = await res.json()
      return json.data
    },
    cleanForm () {
      this.content = ''
    },
    formatDate (dateStr) {
      let date = new Date(dateStr)
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let hour = date.getHours()
      let min = date.getMinutes()
      let sec = date.getSeconds()
      return `lúc ${hour}:${min}:${sec} ngày ${day}-${month}-${year}`
    },
    getRandomHexColor (color = '#') {
      let hex = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
      color += hex[Math.floor(Math.random() * 16)]
      return color.length === 7 ? color : this.getRandomHexColor(color)
    }
  },
  filters: {
    avatar (email, name, color) {
      color = color.substr(1)
      if (email === '') {
        return '/img/icon/default-avatar.png';
      }
      return `https://www.gravatar.com/avatar/${md5(email)}?s=60`;
    }
  }
})
