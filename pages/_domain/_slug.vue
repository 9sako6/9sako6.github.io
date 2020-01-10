<template>
  <section class="page">
    <h1 id="page-title">{{ article.title }}</h1>
    <div class="post-meta">
      <time v-if="article.createdAt">created: {{ article.createdAt.split('T')[0] }}</time>
      <time v-if="article.updatedAt">, updated: {{ article.updatedAt.split('T')[0] }}</time>
    </div>
    <div v-for="tag in article.tags" :key="tag.id" class="post-tags">
      <!-- <nuxt-link :to="'/tags/' + tag"> -->
      <span class="post-tag">{{ tag }}</span>
      <!-- </nuxt-link> -->
    </div>
    <div v-html="article.body"></div>
    <!-- <SnsButtons /> -->
    <!-- <CommentForm /> -->
  </section>
</template>

<script>
// import CommentForm from '~/components/CommentForm'
import microcms from "~/plugins/microcms";

export default {
  components: {
    // CommentForm
  },
  async asyncData({ params, $axios }) {
    const data = await Promise.all([
      microcms.get(`${params.domain}/${params.slug}`)
    ]);
    const article = data[0]["data"];
    // split tags to list of tag
    article["tags"] = article["tags"].split(":");
    return { article: article };
  },
  mounted() {
    this.renderMathJax();
  },
  methods: {
    renderMathJax() {
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          TeX: { equationNumbers: { autoNumber: "AMS" } },
          tex2jax: {
            inlineMath: [["$", "$"], ["\\(", "\\)"]],
            processEscapes: true
          },
          "HTML-CSS": { matchFontHeight: false },
          displayAlign: "center",
          displayIndent: "2em"
        });
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }
    }
  }
};
</script>
<style scoped>
@import "@/assets/css/post.css";
@import "@/assets/css/tag.css";
</style>
