import { nanoid } from 'nanoid'

class Form {
  constructor (formElement) {
    this.formElement = formElement
    this.init()
  }

  init () {
    this.handleSubmitForm = this.handleSubmitForm.bind(this)

    this.formElement.addEventListener('submit', this.handleSubmitForm)
  }

  handleSubmitForm (event) {
    event.preventDefault()
    const post = {
      id: nanoid(),
      createdAt: new Date()
    }

    const formData = new FormData(this.formElement)

    for (const [name, value] of formData.entries()) {
      post[name] = value
    }

    this.sendPost(post)
    this.formElement.reset()
  }

  async sendPost (data) {
    const dataJson = JSON.stringify(data)
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataJson
    }

    const response = await fetch('/api/posts', opts)
    const dataPosts = await response.json()
    console.log(dataPosts)
    const event = new Event('posts:needsRender')
    window.dispatchEvent(event)
  }
}

export { Form }
