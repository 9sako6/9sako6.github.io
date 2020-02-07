<template>
  <div class="post">
    <div class="post-date">{{ createdAt.split('T')[0] }}</div>
    <div>
      <nuxt-link :to="link" class="post-title">{{ title }}</nuxt-link>
    </div>
    <div v-if="description" class="post-description">{{ description }}</div>
    <div v-for="tag in tags" :key="tag.id" class="post-tags">
      <nuxt-link
        v-if="tag.hasOwnProperty('fields') && tag.fields.hasOwnProperty('slug')"
        :to="`/${entrypoint}/tag/${tag.fields.slug}`"
      >
        <span class="post-tag">{{ tag.fields.name }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entrypoint: { type: String, default: "" },
    link: { type: String, default: "" },
    title: { type: String, default: "" },
    createdAt: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: { type: Array, default: () => [] }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/tag.css";
.post {
  text-align: left;
  padding: 20px;
}
.post-title {
  font-weight: 700;
  font-size: 1.2em;
}
.post-title:hover {
  text-decoration: underline;
}
.post-description {
  color: $my-gray;
}
.post-date {
  color: #717579;
}
a {
  color: #3f3f3f;
  text-decoration: none;
}
</style>
