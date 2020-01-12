<template>
  <div class="wrapper">
    <nuxt-link class="link" to="/competitive_prog"
      ><h4 class="title">競技プログラミング</h4></nuxt-link
    >
    /
    <nuxt-link class="link" to="/tech_blog"
      ><h4 class="title">技術ブログ</h4></nuxt-link
    >
    /
    <nuxt-link class="link" to="/blog"><h4 class="title">雑記</h4></nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
}
.link {
  text-decoration: none;
  color: #696565;
}
.link:hover {
  color: $my-red;
}
.title {
  display: inline;
}
</style>
