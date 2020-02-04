<template>
  <div class="container">
    <div v-for="article in articles" :key="article.id">
      <Card
        :title="article.title"
        :description="article.description"
        :createdAt="article.createdAt"
        :link="`/${domain}/${article.id}`"
        :tags="article.tags"
      />
    </div>
    <Pagenation
      :domain="domain"
      :pages="pages"
    />
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
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
  async asyncData({ params, $axios }) {
    let pageNum = 1;
    if (typeof params.id !== "undefined") {
      pageNum = parseInt(params.id);
    }
    // get the number of total articles
    const res = await Promise.all([microcms.get(`${params.domain}?fields=id`)]);
    const totalCount = parseInt(res[0]["data"]["totalCount"]);
    const oldestPageNum = Math.ceil(totalCount / 10);
    const pages = Array.from(Array(oldestPageNum).keys(), x => x + 1);
    // get the latest 10 articles
    const data = await Promise.all([
      microcms.get(`${params.domain}?offset=${10 * (pageNum - 1)}&limit=${10}`)
    ]);
    const articles = data[0]["data"]["contents"];
    // split tags to list of tag
    articles.map(article => {
      article["tags"] =
        article["tags"] === undefined ? [] : article["tags"].split(":");
    });
    return {
      articles: articles,
      domain: params.domain,
      pages: pages
    };
  }
};
</script>

<style>
</style>
