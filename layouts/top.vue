<template lang="pug">
  div#root
    TopTitle
    //- PageTitle
    nuxt
    Footer
</template>

<script>
// import PageTitle from '~/components/PageTitle.vue'
import TopTitle from '~/components/TopTitle.vue';
import Footer from '~/components/Footer.vue';
export default {
  components: {
    TopTitle,
    // PageTitle,
    Footer
  }
};
</script>

<style lang="scss" scoped>
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

html {
  font-family: "YuGothic", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: $my-black;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
