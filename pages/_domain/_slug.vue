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
    <div style="margin-bottom: 120px;" v-html="article.body"></div>
    <!-- <SnsButtons /> -->
    <!-- <CommentForm /> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"></script>
  </section>
</template>

<script>
import microcms from "~/plugins/microcms"

export default {
  async asyncData ({ params, $axios }) {
    const data = await Promise.all([
      microcms.get(`${params.domain}/${params.slug}`)
    ])
    const article = data[0]["data"]
    // split tags to list of tag
    article["tags"] = article["tags"].split(":")
    return { article: article }
  }
}
</script>
<style scoped>
@import '@/assets/css/post.css';
@import '@/assets/css/tag.css';
</style>
