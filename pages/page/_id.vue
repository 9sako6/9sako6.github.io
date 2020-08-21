<template>
  <div class="container">
    <Pagenation
      :total-posts-count="posts.length"
      :now-page="pageNum.toString()"
      :post-num-per-page="postNumPerPage"
    />
    <div
      v-for="post in posts.slice(
        (pageNum - 1) * postNumPerPage,
        pageNum * postNumPerPage
      )"
      :key="post.id"
    >
      <Card
        :title="post.fields.title"
        :description="post.fields.description"
        :created-at="post.sys.createdAt"
        :link="`/posts/${post.fields.slug}`"
        :tags="post.fields.tags"
        :img-link="getEyeCatch(post).url"
        :category="post.fields.category ? post.fields.category.fields.slug : ''"
      />
    </div>
    <Pagenation
      :total-posts-count="posts.length"
      :now-page="pageNum.toString()"
      :post-num-per-page="postNumPerPage"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Card from '~/components/Card';
import Pagenation from '~/components/Pagenation';

export default {
  components: {
    Card,
    Pagenation
  },
  asyncData ({ params }) {
    if (params.id === undefined) {
      params.id = 1;
    }
    return { pageNum: params.id };
  },
  data: () => ({
    postNumPerPage: 7
  }),
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['getEyeCatch'])
  },
  head () {
    return {
      titleTemplate: '',
      meta: []
    };
  }
};
</script>
