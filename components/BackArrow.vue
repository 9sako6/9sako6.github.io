<template lang="pug">
  nuxt-link(:to="link").link
    div 記事一覧
</template>
<script>
export default {
  props: {
    link: { type: String, default: "" }
  }
};
</script>
<style lang="scss" scoped>
.link {
  color: $my-black;
  text-decoration: none;
}
div {
  // width: 120px;
  padding: 1em;
  text-align: center;
  border: solid #e9e9e9;
  border-width: 1px 0px 1px 0px;
}
</style>
