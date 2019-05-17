<template>
  <section>
    <Post
      v-for="article in articles"
      :key="article.id"
      :link="article.link"
      :title="article.title"
      :description="article.description"
      :date="article.date"
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
  const draft = content.draft
  if (!draft) {
    articles.push({
      link: link,
      title: content.title,
      description: content.description,
      date: date
    })
  }
})

export default {
  components: {
    Post
  },
  data: function() {
    return { articles }
  }
}
</script>

<style scoped>
a {
  color: #35495e;
  text-decoration: none;
}
</style>
