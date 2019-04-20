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
@media screen and (max-width: 767px) {
  .page {
    color: #35495e;
    width: 70%;
    margin: 25% 15% 25% 15%;
    font-size: 0.8em;
  }
}
@media screen and (min-width: 768px) {
  .page {
    color: #35495e;
    width: 50%;
    margin: 10% 25% 10% 25%;
  }
}
#page-title {
  margin: 1em 0 1em 0;
  font-size: 2em;
}
.page >>> h2 {
  margin: 1em 0 1em 0;
}
.page >>> p {
  margin: 1em 0 1em 0;
}
.page >>> a {
  text-decoration: none;
  color: rgba(60, 150, 120, 0.6);
}
.page >>> a:hover {
  color: rgba(60, 150, 120, 1);
}
.page >>> code {
  box-shadow: 1px 1px 20px #aaa;
}
.page >>> .hljs-comment {
  color: rgb(124, 175, 102);
}
</style>
