<template>
  <section class="container">
    <Posts category="competitive_programming" />
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
