<template>
  <section class="page">
    <div v-html="bodyHtml"></div>
  </section>
</template>

<script>
// source: https://jmblog.jp/posts/2018-01-18/build-a-blog-with-nuxtjs-and-markdown-2/

export default {
  asyncData() {
    return Object.assign({}, require(`~/contents/about.json`), {})
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
