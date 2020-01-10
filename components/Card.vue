<template>
  <div class="post">
    <div class="post-date">{{ createdAt.split('T')[0] }}</div>
    <nuxt-link :to="link">
      <div class="post-title">{{ title }}</div>
    </nuxt-link>
    <div v-for="tag in tags" :key="tag.id" class="post-tags">
      <!-- <nuxt-link :to="'/tags/' + tag"> -->
        <span class="post-tag">{{ tag }}</span>
      <!-- </nuxt-link> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: { type: String, default: '' },
    title: { type: String, default: '' },
    createdAt: { type: String, default: '' },
    // date: { type: String, required: true },
    // description: { type: String, required: true, default: '' },
    tags: { type: Array, default: [] }
  }
}
</script>

<style scoped>
@import '@/assets/css/tag.css';
.post {
  text-align: left;
  padding: 20px;
}
.post-title {
  font-weight: 600;
  font-size: 1.2em;
}
.post-date {
  color: #717579;
}
a {
  color: #3f3f3f;
  text-decoration: none;
}
</style>
