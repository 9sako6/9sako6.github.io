<template lang="pug">
  nuxt-link(:to="link").link
    div 記事一覧
</template>
<script>
export default {
  name: 'BackArrow',
  props: {
    link: { type: String, default: '' }
  }
};
</script>
<style lang="scss" scoped>
.light .link {
  &:hover {
    @apply text-blue-700;
  }
}

.dark .link {
  &:hover {
    @apply text-teal-400;
  }
}
.link {
  text-decoration: none;
}
div {
  margin: 4em 0 4em 0;
  padding: 1em;
  text-align: center;
  border: solid #e9e9e9;
  border-width: 1px 0px 1px 0px;
}
</style>
