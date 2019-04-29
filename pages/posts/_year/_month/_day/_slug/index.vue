<template>
  <section class="page">
    <h1 id="page-title">{{ title }}</h1>
    <div class="post-meta">
      <time v-if="created_at">created: {{ created_at.split('T')[0] }}</time>
      <time v-if="updated_at">, updated: {{ updated_at.split('T')[0] }}</time>
    </div>
    <div class="post-tags">
      <span class="post-tag" v-for="tag in tags" v-bind:key="tag.id">{{
        tag
      }}</span>
    </div>
    <div v-html="bodyHtml"></div>
    <SnsButtons />
    <script
      src="https://utteranc.es/client.js"
      repo="9sako6/9sako6-garden"
      issue-term="pathname"
      theme="github-light"
      crossorigin="anonymous"
      async
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"></script>
  </section>
</template>

<script>
// source: https://jmblog.jp/posts/2018-01-18/build-a-blog-with-nuxtjs-and-markdown-2/
import { sourceFileArray } from '~/contents/posts/summary.json'
import SnsButtons from '~/components/SnsButtons.vue'

export default {
  components: {
    SnsButtons
  },
  validate({ params }) {
    return sourceFileArray.includes(
      `contents/posts/${params.year}-${params.month}-${params.day}-${
        params.slug
      }.md`
    )
  },
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`~/contents/posts/${params.year}-${params.month}-${params.day}-${
        params.slug
      }.json`),
      { params }
    )
  },
  mounted: function() {
    // tweet埋め込みを作成
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
  }
}
</script>
<style scoped>
@import '@/assets/css/post.css';
</style>
