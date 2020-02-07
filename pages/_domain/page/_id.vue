<template>
  <div class="container">
    <div v-for="post in posts" :key="post.id">
      <Card
        :entrypoint="domain"
        :title="post.fields.title"
        :description="post.fields.description"
        :createdAt="post.sys.createdAt"
        :link="`/${domain}/${post.fields.slug}`"
        :tags="post.fields.tags || []"
      />
    </div>
    <!-- <Pagenation :domain="domain" :pages="pages" /> -->
    {{posts}}
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
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
  async asyncData({ env, params }) {
    let posts = [];
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: "-sys.createdAt"
      })
      .then(res => (posts = res.items))
      .catch(console.error);
    return { posts, domain: params.domain };
  }
  // async asyncData({ params, $axios }) {
  //   let pageNum = 1;
  //   if (typeof params.id !== "undefined") {
  //     pageNum = parseInt(params.id);
  //   }
  //   // get the number of total articles
  //   const res = await Promise.all([microcms.get(`${params.domain}?fields=id`)]);
  //   const totalCount = parseInt(res[0]["data"]["totalCount"]);
  //   const oldestPageNum = Math.ceil(totalCount / 10);
  //   const pages = Array.from(Array(oldestPageNum).keys(), x => x + 1);

  //   // get the latest 10 articles
  //   const data = await Promise.all([
  //     microcms.get(`${params.domain}?offset=${10 * (pageNum - 1)}&limit=${10}`)
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
  //     pages: pages
  //   };
  // }
};
</script>
