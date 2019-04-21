<template>
  <section>
    <Post
      v-for="article in articles"
      :key="article.id"
      v-bind:link="article.link"
      v-bind:title="article.title"
      v-bind:description="article.description"
      v-bind:date="article.date"
    />
  </section>
</template>

<script>
import Post from '~/components/Post.vue'
import Summary from '~/contents/posts/summary.json'

const articles = []

Summary.sourceFileArray.reverse().forEach(markdownName => {
  const baseName = markdownName.match(/([^.]+)/)[0]
  const jsonName = baseName + '.json'
  const link = '/' + baseName.match(/contents\/(.+)/)[1].replace(/-/g, '/')
  const content = Summary.fileMap[jsonName]
  const date = content.created_at.split('T')[0]
  articles.push({
    link: link,
    title: content.title,
    description: content.description,
    date: date
  })
})

export default {
  data: function() {
    return { articles }
  },
  components: {
    Post
  }
}
</script>

<style scoped>
a {
  color: #35495e;
  text-decoration: none;
}
</style>
