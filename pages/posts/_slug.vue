<template>
  <div>
    <section class="page">
      <h1 id="page-title">
        {{ post.fields.title }}
      </h1>
      <div class="post-meta">
        <div class="post-time">
          <time v-if="post.sys.createdAt">
            <div class="post-time-title">created:</div>
            {{ post.sys.createdAt.split("T")[0] }}
          </time>
        </div>
        <div class="post-time">
          <time v-if="post.sys.updatedAt">
            <div class="post-time-title">updated:</div>
            {{ post.sys.updatedAt.split("T")[0] }}
          </time>
        </div>
      </div>
      <div v-for="tag in post.fields.tags" :key="tag.id" class="post-tags">
        <nuxt-link
          v-if="
            tag.hasOwnProperty('fields') && tag.fields.hasOwnProperty('slug')
          "
          :to="`/tag/${tag.fields.slug}`"
        >
          <span class="post-tag">{{ tag.fields.name }}</span>
        </nuxt-link>
      </div>
      <div
        style="margin-bottom: 120px;"
        v-html="$md.render(post.fields.body)"
      />
    </section>
    <back-arrow :link="`/`" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  async asyncData({ payload, store, params, error }) {
    const post =
      payload ||
      (await store.state.posts.find((post) => post.fields.slug === params.slug))

    if (post) {
      return { post }
    } else {
      return error({ statusCode: 400 })
    }
  },
  data: () => ({
    base_url: process.env.BASE_URL,
  }),
  computed: {
    ...mapGetters(["setPost", "setEyeCatch"]),
  },
  head() {
    return {
      title: this.post.fields.title,
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: this.post.fields.title || "",
        },
        {
          hid: "description",
          name: "description",
          content: this.post.fields.description || "",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.post.fields.description || "",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: process.env.BASE_URL + `/posts/${this.post.fields.slug}`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.setEyeCatch(this.post).url,
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary",
        },
        {
          hid: "twitter:site",
          property: "twitter:site",
          content: `@${process.env.TWITTER_USER}`,
        },
      ],
    }
  },
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/post.scss";
@import "@/assets/scss/tag.scss";
</style>
