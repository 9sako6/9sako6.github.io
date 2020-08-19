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
        v-html="$md.render(downsizeHtag(post.fields.body))"
      />
      Share:
      <span class="flex">
        <a
          :href="twitterUrl"
          target="_blank"
          rel="nofollow"
        ><Twitter
          class="h-10 mr-3"
        /></a>
        <a
          :href="hatenaUrl"
          target="_blank"
          rel="nofollow"
        ><Hatena
          class="h-10 mr-3"
        /></a>
      </span>
    </section>
    <back-arrow :link="`/`" />
    <div v-if="nextPost" class="mt-8 mb-8">
      <nuxt-link
        class="hover:underline flex leading-5 justify-start"
        :to="`/posts/${nextPost.fields.slug}`"
      >
        <ArrowLeft class="h-5 mr-2 arrow" />{{ nextPost.fields.title }}
      </nuxt-link>
    </div>
    <div v-if="prevPost" class="mt-8 mb-8">
      <nuxt-link
        class="hover:underline flex leading-5 justify-end"
        :to="`/posts/${prevPost.fields.slug}`"
      >
        {{ prevPost.fields.title }}<ArrowRight class="h-5 mr-2 arrow" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ArrowLeft from '@/components/svg/ArrowLeft';
import ArrowRight from '@/components/svg/ArrowRight';
import Hatena from '@/components/svg/Hatena';
import Twitter from '@/components/svg/Twitter';

export default {
  components: {
    ArrowLeft,
    ArrowRight,
    Hatena,
    Twitter
  },

  async asyncData ({ payload, store, params, error }) {
    let postIndex = -1;
    const post =
      payload ||
      (await store.state.posts.find((post, i) => {
        postIndex = i;
        return post.fields.slug === params.slug;
      }));

    let prevPost;
    if (postIndex < store.state.posts.length - 1) {
      prevPost = store.getters.getPost(postIndex + 1);
    }
    let nextPost;
    if (postIndex > 0) {
      nextPost = store.getters.getPost(postIndex - 1);
    }

    if (post) {
      return { post, prevPost, nextPost };
    } else {
      return error({ statusCode: 400 });
    }
  },
  data () {
    return {
      hatenaUrl: '',
      twitterUrl: ''
    };
  },
  computed: {
    ...mapGetters(['getEyeCatch', 'getPost'])
  },
  mounted () {
    window?.twttr?.widgets?.load();
    this.createHatenaUrl();
    this.createTwitterUrl();
  },
  methods: {
    createTwitterUrl () {
      const url = encodeURIComponent(
        `${process.env.BASE_URL}/posts/${this.post.fields.slug}`
      );
      const txt = encodeURIComponent(
        `${this.post.fields.title} | 腐ったコロッケ`
      );
      this.twitterUrl = `https://twitter.com/intent/tweet?text=${txt}&url=${url}`;
    },
    createHatenaUrl () {
      const url = encodeURIComponent(
        `${process.env.BASE_URL}/posts/${this.post.fields.slug}`
      );
      this.hatenaUrl = `https://b.hatena.ne.jp/add?mode=confirm&url=${url}&text=${this.post.fields.title}`;
    },
    downsizeHtag (markdownText) {
      return markdownText.replace(/(^#)|(\n#)/g, '\n##');
    }
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
          content: this.getEyeCatch(this.post).url
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
    };
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/post.scss";
@import "@/assets/scss/tag.scss";

.light-mode .sepia-mode {
  .arrow {
    @apply text-gray-800;
  }
}

.dark-mode {
  .arrow {
    @apply text-gray-300;
  }
}
</style>
