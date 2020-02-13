<template>
  <div class="container">
    <div v-for="post in posts.slice((pageNum-1)*10, pageNum*10)" :key="post.id">
      <Card
        :title="setPost(post).title"
        :description="post.fields.description"
        :createdAt="post.sys.createdAt"
        :link="`/posts/${post.fields.slug}`"
        :tags="post.fields.tags"
        :imgLink="setEyeCatch(post).url"
      />
    </div>
    <Pagenation :totalPostsCount="posts.length" :nowPage="pageNum.toString()" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import client from "~/plugins/contentful";
import Card from "~/components/Card";
import Pagenation from "~/components/Pagenation";

export default {
  // layout(context) {
  //   return context.params.domain;
  // },
  head() {
    return {
      titleTemplate: ""
    };
  },
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
