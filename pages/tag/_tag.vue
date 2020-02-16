<template>
  <div class="container">
    <h1 class="tag-title">#{{ tag }}</h1>
    <div v-for="post in posts" :key="post.id">
      <Card
        :title="post.fields.title"
        :description="post.fields.description"
        :createdAt="post.fields.createdAt"
        :link="`/posts/${post.fields.slug}`"
        :tags="post.fields.tags"
        :imgLink="setEyeCatch(post).url"
      />
    </div>
  </div>
</template>

<script>
import Card from "~/components/Card";
import { mapState, mapGetters } from "vuex";

export default {
  head() {
    return {
      titleTemplate: ""
    };
  },
  components: {
    Card
  },
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["setPost", "setEyeCatch"])
  },
  async asyncData({ payload, params, error, store, env }) {
    const allPosts = store.state.posts;
    let posts = [];
    let tagName = "";
    allPosts.map(post => {
      const tags = post.fields.tags;
      if (tags) {
        tags.map(tag => {
          if (
            tag.hasOwnProperty("fields") &&
            tag.fields.hasOwnProperty("slug") &&
            tag.fields.slug === params.tag
          ) {
            tagName = tag.fields.name;
            posts.push(post);
          }
        });
      }
    });
    return {
      tag: tagName,
    };
  }
};
</script>

<style lang="scss" scoped>
.tag-title {
  font-size: 1.8em;
  line-height: 1.8em;
  margin: 2.5em 0 1.5em 0;
}
</style>
