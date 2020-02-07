<template>
  <div class="container">
    <h1 class="tag-title">#{{ tag }}</h1>
    <div v-for="post in posts" :key="post.id">
      <Card
        :entrypoint="domain"
        :title="post.fields.title"
        :description="post.fields.description"
        :createdAt="post.fields.createdAt"
        :link="`/${domain}/${post.fields.slug}`"
        :tags="post.fields.tags"
      />
    </div>
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
import Card from "~/components/Card";

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
      posts: posts,
      domain: params.domain
    };
    // let tag = payload
    // if (!tag) {
    //   for (let i = 0; i < store.state.posts.length; i++) {
    //     const tags = store.state.posts[i].fields.tags
    //     if (tags) tag = tags.find(tag => tag.fields.slug === params.slug)
    //     if (tag) break
    //   }
    // }
    // if (tag) {
    //   return { tag }
    // } else {
    //   error({ statusCode: 400 })
    // }
  }
  // async asyncData({ params, $axios }) {
  //   // get the latest 10 articles
  //   const data = await Promise.all([
  //     microcms.get(
  //       `${params.domain}?filters=tags[contains]${encodeURIComponent(
  //         params.tag
  //       )}`
  //     )
  //   ]);
  //   const articles = data[0]["data"]["contents"];

  //   // split tags to list of tag
  //   articles.map(article => {
  //     article["tags"] =
  //       article["tags"] === undefined ? [] : article["tags"].split(":");
  //   });
  //   return {
  //     articles: articles,
  //     domain: params.domain,
  //     tag: params.tag
  //   };
  // }
};
</script>

<style lang="scss" scoped>
.tag-title {
  padding-left: 20px;
}
</style>
