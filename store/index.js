import client from '~/plugins/contentful' // 追記


// import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'


// 追記
export const state = () => ({
  posts: [],
  categories: [],
  tags: []
})

export const getters = {
  setPost: () => (post) => {
    if (post.fields.title) {
      return {
        title: post.fields.title,
        body: post.fields.body,
        // slug: post.fields.slug
      }
    } else {
      return {
        title: "",
        body: ""
      }
    }
  },
  // 追記
  linkTo: () => (name, obj) => {
    return {
      name: `${name}-slug`,
      params: {
        slug: obj.fields.slug
      }
    }
  },
  associatePosts: state => (currentTag) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      if (post.fields.tags) {
        const tag = post.fields.tags.find(tag => tag.sys.id === currentTag.sys.id)

        if (tag) posts.push(post)
      }
    }
    return posts
  }
}

// 追記
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setLinks(state, entries) {
    state.tags = []
    state.categories = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'tag') state.tags.push(entry)
      else if (entry.sys.contentType.sys.id === 'category') state.categories.push(entry)
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort)
  }

}

// 追記
export const actions = {
  async getPosts({
    commit
  }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      // order: '-fields.publishDate' // desc
      order: "-sys.createdAt",
      include: 1
    }).then(res => {
      commit('setLinks', res.includes.Entry)
      commit('setPosts', res.items)
    }).catch(console.error)
  }

}

// async asyncData({ env, params }) {
//   let article = null;
//   await client
//     .getEntries({
//       content_type: env.CTF_BLOG_POST_TYPE_ID,
//       "fields.slug": params.slug
//     })
//     .then(res => (article = res.items[0]))
//     .catch(console.error);
//   return { article, domain: params.domain };
// },
