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
      />
    </div>
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
import Card from "~/components/Card";

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
    Card
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
      posts: posts
    };
  }
};
</script>

<style lang="scss" scoped>
.tag-title {
  font-size: 1.8em;
  line-height: 1.8em;
  margin: 2.5em 0 1.5em 0;
  border-bottom: solid 1px #d8d8d8;
}
</style>
