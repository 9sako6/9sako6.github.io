<template>
  <div class="post">
    <div class="post-date">{{ date }}</div>
    <a :href="link">
      <div class="post-title">{{ title }}</div>
      <div class="post-content">{{ description }}</div>
    </a>
    <div v-for="tag in tags" :key="tag.id" class="post-tags">
      <nuxt-link :to="'/tags/' + tag">
        <span class="post-tag">
          {{ tag }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    title: String,
    date: String,
    description: String,
    tags: Array
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
