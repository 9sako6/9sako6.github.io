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
    <div v-if="nextPost" class="mt-8 mb-8">
      <nuxt-link
        class="text-blue-700 hover:underline flex leading-5 justify-start"
        :to="`/posts/${nextPost.fields.slug}`"
      >
        <ArrowLeft class="h-5 mr-2 text-gray-800" />{{
          nextPost.fields.title
        }}
      </nuxt-link>
    </div>
    <div v-if="prevPost" class="mt-8 mb-8">
      <nuxt-link
        class="text-blue-700 hover:underline flex leading-5 justify-end"
        :to="`/posts/${prevPost.fields.slug}`"
      >
        {{ prevPost.fields.title }}<ArrowRight class="h-5 ml-2 text-gray-800"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArrowLeft from '@/components/svg/ArrowLeft'
import ArrowRight from '@/components/svg/ArrowRight'

export default {
  components: {
    ArrowLeft,
    ArrowRight
  },
  computed: {
    ...mapGetters(['setPost', 'setEyeCatch', 'getPost'])
  },
  async asyncData ({ payload, store, params, error }) {
    let postIndex = -1
    const post =
      payload ||
      (await store.state.posts.find((post, i) => {
        postIndex = i
        return post.fields.slug === params.slug
      }))

    let prevPost
    if (postIndex < store.state.posts.length - 1) {
      prevPost = store.getters.getPost(postIndex + 1)
    }
    let nextPost
    if (postIndex > 0) {
      nextPost = store.getters.getPost(postIndex - 1)
    }

    if (post) {
      return { post, prevPost, nextPost }
    } else {
      return error({ statusCode: 400 })
    }
  },
  mounted () {
    window?.twttr?.widgets?.load()
  },
  head () {
    return {
      title: this.post.fields.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.fields.title || ''
        },
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.description || ''
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.fields.description || ''
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.BASE_URL + `/posts/${this.post.fields.slug}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.setEyeCatch(this.post).url
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twitter:site',
          property: 'twitter:site',
          content: `@${process.env.TWITTER_USER}`
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/post.scss";
@import "@/assets/scss/tag.scss";
</style>
