<template>
  <section class="page">
    <h1 id="page-title">{{ article.fields.title }}</h1>
    <div class="post-meta">
      <time v-if="article.sys.createdAt">created: {{ article.sys.createdAt.split('T')[0] }}</time>
      <time v-if="article.sys.updatedAt">, updated: {{ article.sys.updatedAt.split('T')[0] }}</time>
    </div>
    <div v-for="tag in article.fields.tags" :key="tag.id" class="post-tags">
      <nuxt-link :to="`/${domain}/tag/${encodeURIComponent(tag)}`">
        <span class="post-tag">{{ tag }}</span>
      </nuxt-link>
    </div>
    <div v-html="article.fields.body" style="margin-bottom: 120px;"></div>
    <BackArrow :link="`/${domain}`" />
  </section>
</template>

<script>
import microcms from "~/plugins/microcms";
import BackArrow from "~/components/BackArrow";
import client from "~/plugins/contentful";

export default {
  layout(context) {
    return context.params.domain;
  },
  components: {
    BackArrow
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: this.article.title || ""
        },
        {
          hid: "description",
          name: "description",
          content: this.article.description || ""
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.article.description || ""
        },
        // {
        //   hid: 'og:image',
        //   property: 'og:image',
        //   content: this.article.img.url
        // },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary"
        },
        {
          hid: "twitter:site",
          property: "twitter:site",
          content: `@${process.env.TWITTER_USER}`
        }
      ]
    };
  },
  async asyncData({ env, params }) {
    let article = null;
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        "fields.slug": params.slug
      })
      .then(res => (article = res.items[0]))
      .catch(console.error);
    return { article, domain: params.domain };
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
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"]
            ],
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
