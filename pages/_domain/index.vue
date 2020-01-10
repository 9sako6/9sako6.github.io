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
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
import Card from "~/components/Card";

export default {
  components: {
    Card
  },
  async asyncData({ params, $axios }) {
    const data = await Promise.all([microcms.get(params.domain)]);
    const articles = data[0]["data"]["contents"];
    // split tags to list of tag
    articles.map(article => {
      article["tags"] = article["tags"].split(":");
    });
    return { articles: articles, domain: params.domain };
  }
};
</script>

<style>
</style>
