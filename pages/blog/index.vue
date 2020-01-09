<template>
  <section class="container">
    <Posts category="blog" />
  </section>
</template>

<script>
import Posts from '~/components/Posts.vue'

export default {
  components: {
    Posts
  }
}
</script>

<style scoped>
@import '@/assets/css/index.css';
</style>
