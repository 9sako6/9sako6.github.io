<template>
  <section class="page">
    <script
      type="text/javascript"
      src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
    ></script>
    <h1 id="page-title">{{ title }}</h1>
    <div class="post-meta">
      <time>{{ `${params.year}-${params.month}-${params.day}` }}</time>
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
  font-size: 2.5em;
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
.page >>> hr {
  margin: 2em 0 2em 0;
}
.page >>> img {
  width: 100%;
}
.page >>> a {
  text-decoration: none;
  color: rgb(1, 88, 59);
}
.page >>> a:hover {
  color: rgb(72, 142, 118);
}
.page >>> li {
  margin: 1em 0 1em 0;
}
.page >>> blockquote {
  quotes: '“' '”' '‘' '’';
  padding: 1em;
  background-color: #f7f7f7;
  color: rgb(72, 70, 70);
}
.page >>> blockquote::before {
  content: open-quote;
}
.page >>> blockquote::after {
  right: 0;
  content: close-quote;
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
