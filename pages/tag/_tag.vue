<template>
  <div class="container">
    <h1 class="tag-title">#{{ tag }}</h1>
    <div v-for="post in taggedPosts" :key="post.id">
      <Card
        :title="post.fields.title"
        :description="post.fields.description"
        :created-at="post.fields.createdAt"
        :link="`/posts/${post.fields.slug}`"
        :tags="post.fields.tags"
        :img-link="setEyeCatch(post).url"
        :category="post.fields.category.fields.slug"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Card from '~/components/Card'

export default {
  components: {
    Card
  },

  computed: {
    ...mapState(['posts']),
    ...mapGetters(['setPost', 'setEyeCatch'])
  },
  asyncData ({ params, store }) {
    const allPosts = store.state.posts
    const posts = []
    let tagName = ''
    allPosts.map((post) => {
      const tags = post.fields.tags
      if (tags) {
        tags.map((tag) => {
          if (
            Object.prototype.hasOwnProperty.call(tag, 'fields') &&
            Object.prototype.hasOwnProperty.call(tag.fields, 'slug') &&
            tag.fields.slug === params.tag
          ) {
            tagName = tag.fields.name
            posts.push(post)
          }
        })
      }
    })
    return {
      tag: tagName,
      taggedPosts: posts
    }
  },
  head () {
    return {
      title: this.tag
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-title {
  font-size: 1.8em;
  line-height: 1.8em;
  margin: 2.5em 0 1.5em 0;
}
</style>
