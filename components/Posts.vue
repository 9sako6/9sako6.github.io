<template>
  <section>
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

// TODO fix
import SummaryBlog from '~/contents/posts/blog/summary.json'
import SummaryCompetitiveProgramming from '~/contents/posts/competitive_programming/summary.json'
import SummaryTechBlog from '~/contents/posts/tech_blog/summary.json'

const Summary = {
  blog: SummaryBlog,
  competitive_programming: SummaryCompetitiveProgramming,
  tech_blog: SummaryTechBlog
}

export default {
  components: {
    Post
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  computed: {
    articles: function() {
      const articles = []
      const summary = Summary[this.category]
      const markdowns = summary.sourceFileArray.slice().reverse()
      markdowns.forEach(markdownName => {
        const baseName = markdownName.replace(/^.*[/]/, '').replace(/\.md$/, '')
        const jsonName = `contents/posts/${this.category}/${baseName}.json`
        const content = summary.fileMap[jsonName]
        const link = `/${jsonName
          .match(/contents\/(.+)/)[1]
          .replace(/-/g, '/')
          .replace(/\.json$/g, '')}`
        const date = content.created_at.split('T')[0]
        const draft = content.draft
        const tags = content.tags
        if (!draft) {
          articles.push({
            link: link,
            title: content.title,
            description: content.description,
            date: date,
            tags: tags
          })
        }
      })
      return articles
    }
  }
}
</script>

<style scoped>
a {
  color: #3f3f3f;
  text-decoration: none;
}
</style>
