<template>
  <section>
    <h1>{{ title }}</h1>
    <Post
      v-for="article in articles"
      :key="article.id"
      :link="article.link"
      :title="article.title"
      :description="article.description"
      :date="article.date"
      :tags="article.tags"
    />
  </section>
</template>

<script>
import Post from '~/components/Post.vue'
import { TagsMap } from '~/contents/posts/tags.json'

// console.log(this.$route.params)

export default {
  components: {
    Post
  },
  computed: {
    title: function() {
      return this.$route.params.tag
    },
    articles: function() {
      const tagName = this.$route.params.tag
      const articles = []
      TagsMap[tagName].forEach(article => {
        Object.keys(article).forEach(markdownName => {
          const baseName = markdownName.match(/([^.]+)/)[0]
          const link =
            '/' + baseName.match(/contents\/(.+)/)[1].replace(/-/g, '/')
          // const draft = article[markdownName].draft
          console.log(link)
          articles.push({
            link: link,
            title: article[markdownName].title,
            description: article[markdownName].description,
            date: article[markdownName].created_at.split('T')[0],
            tags: article[markdownName].tags
          })
        })
      })
      return 'hoge'
    }
  }
}
</script>
