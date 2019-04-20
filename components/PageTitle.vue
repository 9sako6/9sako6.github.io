<template lang="pug">
  div#blog-title-wrapper
    h1#blog-title
      nuxt-link(to="/").nav-link 9sako6 Garden
    Navi
</template
>>

<script>
import Navi from "~/components/Navi.vue"
export default {
  components: {
    Navi,
  },
}
</script>

<style lang="scss" scoped>
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
