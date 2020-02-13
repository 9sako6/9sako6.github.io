<template>
  <section class="page">
    <h1 id="page-title">{{ post.fields.title }}</h1>
    <!-- <v-img
      :src="setEyeCatch(post).url"
      alt="an eye-catch image"
      :aspect-ratio="16/9"
      width="640"
      height="360"
      class="mx-auto"
    /> -->
    <div class="post-meta">
      <div class="post-time">
        <!-- <v-icon :small="true">fas fa-clock</v-icon> -->
        <time v-if="post.sys.createdAt">created: {{ post.sys.createdAt.split('T')[0] }}</time>
      </div>
      <div class="post-time">
        <!-- <v-icon :small="true">fas fa-history</v-icon> -->
        <time v-if="post.sys.updatedAt">updated: {{ post.sys.updatedAt.split('T')[0] }}</time>
      </div>
    </div>
    <div v-for="tag in post.fields.tags" :key="tag.id" class="post-tags">
      <nuxt-link
        v-if="tag.hasOwnProperty('fields') && tag.fields.hasOwnProperty('slug')"
        :to="`/tag/${tag.fields.slug}`"
      >
        <span class="post-tag">{{ tag.fields.name }}</span>
      </nuxt-link>
    </div>
    <div v-html="$md.render(post.fields.body)" style="margin-bottom: 120px;"></div>
    <BackArrow :link="`/`" />
    <!-- <div v-show="disqus_shortname" class="mt-10">
      <vue-disqus
        :shortname="disqus_shortname"
        :identifier="post.fields.slug"
        :url="`${base_url}/posts/${post.fields.slug}`"
      ></vue-disqus>
    </div> -->
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import BackArrow from "~/components/BackArrow";
import client from "~/plugins/contentful";

export default {
  data: () => ({
    base_url: process.env.BASE_URL,
    // disqus_shortname: process.env.DISQUS_SHORTNAME
  }),
  components: {
    BackArrow
  },
  head() {
    return {
      title: this.post.fields.title,
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: this.post.fields.title || ""
        },
        {
          hid: "description",
          name: "description",
          content: this.post.fields.description || ""
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.post.fields.description || ""
        },
        {
          hid: "og:url",
          property: "og:url",
          content: process.env.BASE_URL + `/posts/${this.post.fields.slug}`
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.setEyeCatch(this.post).url
        },
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
      ],
      script: [
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"
        }
      ]
    };
  },
  async asyncData({ payload, store, params, error }) {
    const post =
      payload ||
      (await store.state.posts.find(post => post.fields.slug === params.slug));

    if (post) {
      return { post: post };
    } else {
      return error({ statusCode: 400 });
    }
  },
  computed: {
    ...mapGetters(["setPost", "setEyeCatch"])
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
.post-time {
  margin-left: 1em;
}
</style>
