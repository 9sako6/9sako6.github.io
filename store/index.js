import client from '~/plugins/contentful'
import defaultEyeCatch from '~/assets/img/defaultEyeCatch.jpg'

export const state = () => ({
  posts: [],
  categories: [],
  tags: []
})

export const getters = {
  getEyeCatch: () => (post) => {
    if (!!post.fields.eyeCatchImage && !!post.fields.eyeCatchImage.fields) {
      return {
        url: `https:${post.fields.eyeCatchImage.fields.file.url}`,
        title: post.fields.eyeCatchImage.fields.title
      }
    } else {
      return {
        url: defaultEyeCatch,
        title: 'defaultImage'
      }
    }
  },
  getAssociatedPosts: state => (currentTag) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      if (post.fields.tags) {
        const tag = post.fields.tags.find(
          tag => tag.sys.id === currentTag.sys.id
        )

        if (tag) { posts.push(post) }
      }
    }
    return posts
  },
  getPost: state => (i) => {
    return state.posts[i]
  }
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setLinks (state, entries) {
    state.tags = []
    state.categories = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'tag') { state.tags.push(entry) } else if (entry.sys.contentType.sys.id === 'category') { state.categories.push(entry) }
    }
    state.tags.sort((a, b) => {
      const firstName = a.fields.name.toUpperCase()
      const secondName = b.fields.name.toUpperCase()
      if (firstName < secondName) { return -1 }
      if (firstName > secondName) { return 1 }
      return 0
    })
  }
}

export const actions = {
  async fetchPosts ({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        // order: '-fields.publishDate' // desc
        order: '-sys.createdAt',
        include: 1
      })
      .then((res) => {
        commit('setLinks', res.includes.Entry)
        commit('setPosts', res.items)
      })
      .catch(console.error)
  }
}
