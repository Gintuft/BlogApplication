
class Posts {
  constructor (containerElement) {
    this.containerElement = containerElement
    this.currentPost = null
    this.init()
  }

  init () {
    this.render()
    this.handlePostsNeedsRender = this.handlePostsNeedsRender.bind(this)
    this.handleClickPost = this.handleClickPost.bind(this)
    window.addEventListener('posts:needsRender', this.handlePostsNeedsRender)
    this.containerElement.addEventListener('click', this.handleClickPost)
  }

  handlePostsNeedsRender () {
    this.render()
  }

  handleClickPost (event) {
    event.preventDefault()
    const { target } = event
    if (target.tagName === 'A') {
      this.activatePost(target)
      const event = new CustomEvent('post:click', {
        detail: { id: target.id }
      })
      window.dispatchEvent(event)
    }
  }

  activatePost (element) {
    if (this.currentPost) {
      this.currentPost.classList.remove('active')
    }
    element.classList.add('active')
    this.currentPost = element
  }

  getTemplatePost ({ title, createdAt, id }) {
    return `
      <div class="island__item">
        <h6><a href = "#${id}" id="${id}" class = "stretched-link" style = "text-decoration:none"><i>${title}</i></a></h6>
        <div class="text-muted"><time>${createdAt}</time></div>
      </div>
    `
  }

  createPosts (posts) {
    const result = posts.map((post) => {
      return this.getTemplatePost(post)
    })

    return result.join(' ')
  }

  async getPosts () {
    const response = await fetch('/api/posts')
    const data = await response.json()
    return data.list
  }

  async render () {
    const posts = await this.getPosts()
    const postsHTML = this.createPosts(posts)
    this.containerElement.innerHTML = postsHTML
  }
}

export { Posts }
