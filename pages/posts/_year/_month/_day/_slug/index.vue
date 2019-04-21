<template>
  <section class="page">
    <h1 id="page-title">{{ title }}</h1>
    <div class="post-meta">
      <time>{{ `${params.year}-${params.month}-${params.day}` }}</time>
    </div>
    <div v-html="bodyHtml"></div>
    <SnsButtons />
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
  }
}
</script>
<style scoped>
@media screen and (max-width: 767px) {
  .page {
    color: #35495e;
    width: 80%;
    margin: 25% 10% 25% 10%;
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
  border: none;
}
.page >>> h1 {
  font-size: 1.8em;
  margin: 2em 0 1em 0;
  border-bottom: solid 1px #d8d8d8;
}
.page >>> h2 {
  margin: 1em 0 1em 0;
}
.page >>> h3 {
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
  background-color: rgb(255, 236, 235);
}
.page >>> pre code {
  background-color: black;
  box-shadow: 1px 1px 20px #aaa;
}
.page >>> .hljs-comment {
  color: rgb(124, 175, 102);
}
</style>
