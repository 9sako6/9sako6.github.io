<template>
  <section class="container">
    <h1>{{ this.$route.params.tag }}</h1>
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
import { TagsMap, TagsList } from '~/contents/posts/tags.json'

export default {
  components: {
    Post
  },
  validate({ params }) {
    let flag = false
    TagsList.forEach(tag => {
      if (params.tag === tag.name) {
        flag = true
      }
    })
    return flag
  },
  asyncData({ params }) {
    const articles = []
    TagsMap[params.tag].forEach(article => {
      Object.keys(article).forEach(markdownName => {
        const baseName = markdownName.match(/([^.]+)/)[0]
        const link =
          '/' + baseName.match(/contents\/(.+)/)[1].replace(/-/g, '/')
        articles.push({
          link: link,
          title: article[markdownName].title,
          description: article[markdownName].description,
          date: article[markdownName].created_at.split('T')[0],
          tags: article[markdownName].tags
        })
      })
    })
    return { articles }
  }
}
</script>
<style scoped>
@media screen and (max-width: 767px) {
  .container {
    width: 80%;
    margin: 10% 10% 25% 10%;
  }
}
@media screen and (min-width: 768px) {
  .container {
    width: 50%;
    margin: 5% 25% 10% 25%;
  }
}
.container {
  color: #35495e;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  text-align: left;
  font-size: 1.8em;
  margin: 2em 0 1em 0;
  border-bottom: solid 1px #d8d8d8;
}
</style>
