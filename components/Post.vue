<template>
  <router-link v-bind:to="link">
    <div class="post">
      <div class="post-title">{{ title }}</div>
      <div class="post-date">{{ date }}</div>
      <div class="post-content">{{ description }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    link: String,
    title: String,
    date: String,
    description: String
  }
}
</script>

<style scoped>
.post {
  text-align: left;
  padding: 20px;
}
.post-title {
  font-weight: 600;
  font-size: 1.5em;
}
.post-date {
  color: #717579;
}
a {
  color: #35495e;
  text-decoration: none;
}
</style>
