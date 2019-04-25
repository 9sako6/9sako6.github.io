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
  }
}
</script>
<style scoped>
@import '@/assets/css/post.css';
</style>
