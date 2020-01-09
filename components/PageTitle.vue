<template>
  <div id="blog-title-wrapper">
    <h1 id="blog-title">
      <nuxt-link to="/" class="nav-link">9sako6 Garden</nuxt-link>
    </h1>
    <!-- <h2 id="blog-description">くさころのサイト</h2> -->
    <Navi />
  </div>
</template>

<script>
import Navi from '~/components/Navi.vue'

export default {
  components: {
    Navi
  }
}
</script>

<style scoped>
#blog-title-wrapper {
  text-align: center;
  padding: 50px 0;
}
#blog-title {
  color: #3f3f3f;
  font-size: 37px;
  line-height: 60px;
  font-weight: 600;
}
#blog-title a {
  text-decoration: none;
  color: #3f3f3f;
}
#blog-description {
  font-weight: normal;
  font-size: 80%;
  margin: 5px 0 0 0;
}
</style>
