<template>
  <div class="container">
    <div
      v-for="post in posts.slice((pageNum-1)*postNumPerPage, pageNum*postNumPerPage)"
      :key="post.id"
    >
      <Card
        :title="setPost(post).title"
        :description="post.fields.description"
        :createdAt="post.sys.createdAt"
        :link="`/posts/${post.fields.slug}`"
        :tags="post.fields.tags"
        :imgLink="setEyeCatch(post).url"
        :category="post.fields.category.fields.slug"
      />
    </div>
    <Pagenation :totalPostsCount="posts.length" :nowPage="pageNum.toString()" :postNumPerPage="postNumPerPage" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import client from "~/plugins/contentful";
import Card from "~/components/Card";
import Pagenation from "~/components/Pagenation";

export default {
  head() {
    return {
      titleTemplate: "",
      meta: []
    };
  },
  data: () => ({
    postNumPerPage: 5
  }),
  components: {
    Card,
    Pagenation
  },
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["setPost", "setEyeCatch"])
  },
  async asyncData({ params }) {
    if (params.id === undefined) params.id = 1;
    return { pageNum: params.id };
  }
};
</script>
