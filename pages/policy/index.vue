<template>
  <section class="page">
    <div v-html="bodyHtml"></div>
  </section>
</template>

<script>
export default {
  asyncData() {
    return Object.assign({}, require(`~/contents/policy.json`), {})
  }
}
</script>
<style scoped>
@import '@/assets/css/post.css';
</style>
