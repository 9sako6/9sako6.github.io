<template>
  <div id="blog-title-wrapper">
    <nuxt-link class="link" to="/blog"><h3 class="title">雑記</h3></nuxt-link> /
    <nuxt-link class="link" to="/tech_blog"
      ><h3 class="title">技術ブログ</h3></nuxt-link
    >
    /
    <nuxt-link class="link" to="/competitive_programming"
      ><h3 class="title">競技プログラミング</h3></nuxt-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#blog-title-wrapper {
  text-align: center;
}
#blog-title {
  color: #3f3f3f;
  font-size: 37px;
  line-height: 60px;
  font-weight: 600;
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
