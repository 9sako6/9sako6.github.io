<template>
  <div class="container">
    <div
      v-for="post in posts.slice(
        (pageNum - 1) * postNumPerPage,
        pageNum * postNumPerPage
      )"
      :key="post.id"
    >
      <Card
        :title="setPost(post).title"
        :description="post.fields.description"
        :created-at="post.sys.createdAt"
        :link="`/posts/${post.fields.slug}`"
        :tags="post.fields.tags"
        :img-link="setEyeCatch(post).url"
        :category="post.fields.category.fields.slug"
      />
    </div>
    <Pagenation
      :total-posts-count="posts.length"
      :now-page="pageNum.toString()"
      :post-num-per-page="postNumPerPage"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import Card from "~/components/Card"
import Pagenation from "~/components/Pagenation"

export default {
  components: {
    Card,
    Pagenation,
  },
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["setPost", "setEyeCatch"]),
  },
  async asyncData({ params }) {
    if (params.id === undefined) params.id = 1
    return { pageNum: params.id }
  },
  data: () => ({
    postNumPerPage: 5,
  }),
  head() {
    return {
      titleTemplate: "",
      meta: [],
    }
  },
}
</script>
