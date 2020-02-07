<template>
  <div class="container">
    <div v-for="post in posts" :key="post.id">
      <Card
        :entrypoint="domain"
        :title="setPost(post).title"
        :description="post.fields.description"
        :createdAt="post.sys.createdAt"
        :link="`/${domain}/${post.fields.slug}`"
        :tags="post.fields.tags"
      />
    </div>
    <Pagenation :domain="domain" :totalPostsCount="10"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import client from "~/plugins/contentful";
import Card from "~/components/Card";
import Pagenation from "~/components/Pagenation";

export default {
  layout(context) {
    return context.params.domain;
  },
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
    ...mapGetters(["setPost", "draftChip", "linkTo"])
  },
  async asyncData({ params }) {
    return { domain: params.domain };
  }
};
</script>
