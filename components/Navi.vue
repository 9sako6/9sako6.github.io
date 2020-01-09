<template>
  <div class="wrapper">
    <nuxt-link class="link" to="/blog"><h4 class="title">雑記</h4></nuxt-link> /
    <nuxt-link class="link" to="/tech_blog"
      ><h4 class="title">技術ブログ</h4></nuxt-link
    >
    /
    <nuxt-link class="link" to="/competitive_programming"
      ><h4 class="title">競技プログラミング</h4></nuxt-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapper {
  text-align: center;
}
.link {
  text-decoration: none;
  color: #696565;
}
.link:hover {
  color: #e65a5a;
}
.title {
  display: inline;
}
</style>
