<template>
  <div class="post">
    <div class="right-box">
      <div class="post-date">{{ createdAt.split('T')[0] }}</div>
      <div class="post-title-wrap">
        <nuxt-link :to="link" class="post-title">{{ title }}</nuxt-link>
      </div>
      <div v-if="description" class="post-description">{{ description }}</div>
      <div v-for="tag in tags" :key="tag.id" class="post-tags">
        <nuxt-link
          v-if="tag.hasOwnProperty('fields') && tag.fields.hasOwnProperty('slug')"
          :to="`/tag/${tag.fields.slug}`"
        >
          <span class="post-tag">{{ tag.fields.name }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: { type: String, default: "" },
    title: { type: String, default: "" },
    createdAt: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: { type: Array, default: () => [] }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/tag.scss";
.post {
  text-align: left;
  @include pc {
    padding: 20px;
  }
  @include mobile {
    padding: 10px 0px 40px 0px;
  }
}
.right-box {
  padding-left: 1em;
}
.post-title-wrap {
  word-wrap: break-word;
  line-height: 2em;
}
.post-title {
  color: $my-black;
  font-weight: 700;
  font-size: 1.2em;
}
.post-title:hover {
  text-decoration: underline;
}
.post-description {
  color: $my-gray;
  line-height: 1.5em;
}
.post-date {
  color: #717579;
}
a {
  color: #3f3f3f;
  text-decoration: none;
}
</style>
