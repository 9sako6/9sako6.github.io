<template>
  <section class="container">
    <Posts />
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
@media screen and (max-width: 767px) {
  .container {
    width: 80%;
    margin: 10% 10% 25% 10%;
  }
}
@media screen and (min-width: 768px) {
  .container {
    width: 50%;
    margin: 5% 25% 10% 25%;
  }
}
.container {
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
