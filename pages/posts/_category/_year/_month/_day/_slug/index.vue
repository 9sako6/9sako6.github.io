<template>
  <section class="page">
    <h1 id="page-title">{{ title }}</h1>
    <div class="post-meta">
      <time v-if="created_at">created: {{ created_at.split('T')[0] }}</time>
      <time v-if="updated_at">, updated: {{ updated_at.split('T')[0] }}</time>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="post-tags">
      <nuxt-link :to="'/tags/' + tag">
        <span class="post-tag">{{ tag }}</span>
      </nuxt-link>
    </div>
    <div style="margin-bottom: 120px;" v-html="bodyHtml"></div>
    <!-- <SnsButtons /> -->
    <CommentForm />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"></script>
  </section>
</template>

<script>
// source: https://jmblog.jp/posts/2018-01-18/build-a-blog-with-nuxtjs-and-markdown-2/
import CommentForm from '~/components/CommentForm.vue'

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
    // SnsButtons,
    CommentForm
  },
  validate({ params }) {
    return Summary[params.category].sourceFileArray.includes(
      `./md/${params.category}/${params.year}-${params.month}-${params.day}-${params.slug}.md`
    )
  },
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`~/contents/posts/${params.category}/${params.year}-${params.month}-${params.day}-${params.slug}.json`),
      { params }
    )
  },
  mounted: function() {
    /**
     * draw tag embedding (e.g. tweet embedding)
     */
    const elems = this.bodyContent.match(/@@[\s\S]+?@@/g)
    if (elems) {
      elems.forEach(elem => {
        elem.split('@@').forEach(tag => {
          if (tag.match(/[<>]/)) {
            this.bodyHtml = this.bodyHtml.replace(/@@[\s\S]+?@@/, `${tag}`)
          }
        })
      })
    }
    /**
     * add meta tag
     */
    this.url = `https://9sako6.me/posts/${this.params.year}/${this.params.month}/${this.params.day}/${this.params.slug}`
    const headElem = document.getElementsByTagName('head')[0]
    const attrList = ['title', 'url', 'description']
    attrList.forEach(attr => {
      const metaElem = document.createElement('meta')
      metaElem.setAttribute('property', 'og:' + attr)
      metaElem.setAttribute('content', this[attr])
      headElem.appendChild(metaElem)
    })
  }
}
</script>
<style scoped>
@import '@/assets/css/post.css';
@import '@/assets/css/tag.css';
</style>
