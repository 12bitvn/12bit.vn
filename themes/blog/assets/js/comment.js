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
    graphqlEndpoint: 'https://api.graph.cool/simple/v1/cjmgeu7349fgx0199m25vmn1w'
  },
  async mounted () {
    this.slug = this.$el.dataset.slug

    // Make sure that DOM is rendered already then get commetns by the post slug.
    let data = await this.getComments()
    this.comments = data.allComments
  },
  methods: {
    async getComments () {
      let query = `query {allComments(filter: {
        slug: "${this.slug}"
      }) {id, author, email, content, createdAt, slug}}`
      let data = await this.request(query)
      return data
    },
    async postComment () {
      if (this.content === '') {
        return
      }

      if (!this.isAnonymous && this.author === '') {
        return
      }

      this.author = this.isAnonymous ? 'Anonymous' : this.author

      let query = `mutation {
        createComment(
          author: "${this.author}"
          email: "${this.email}"
          content: "${this.content}"
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
      let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
      let date = new Date(dateStr)
      let day = date.getDate()
      let monthIndex = date.getMonth()
      let year = date.getFullYear()
      return monthNames[monthIndex] + ' ' + day + ', ' + year
    }
  },
  filters: {
    avatar (email) {
      if (email === '') {
        return '/img/icon/default-avatar.png';
      }
      return `https://www.gravatar.com/avatar/${md5(email)}?s=60`;
    }
  }
})
