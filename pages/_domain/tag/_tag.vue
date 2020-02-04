<template>
  <div class="container">
    <h1 class="tag-title">#{{tag}}</h1>
    <div v-for="article in articles" :key="article.id">
      <Card
        :entrypoint="domain"
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
  async asyncData({ params, $axios }) {
    // get the latest 10 articles
    const data = await Promise.all([
      microcms.get(
        `${params.domain}?filters=tags[contains]${encodeURIComponent(
          params.tag
        )}`
      )
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
      tag: params.tag
    };
  }
};
</script>

<style lang="scss" scoped>
.tag-title {
  padding-left: 20px;
}
</style>
