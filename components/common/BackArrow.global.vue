<template>
  <nuxt-link :to="link" class="link">
    <div>記事一覧</div>
  </nuxt-link>
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
.light-mode {
  div {
    border: solid #e9e9e9;
    border-width: 1px 0px 1px 0px;
  }
}
.sepia-mode {
  div {
    border: solid #ded0bf;
    border-width: 1px 0px 1px 0px;
  }
}
.dark-mode {
  div {
    border: solid #181717;
    border-width: 1px 0px 1px 0px;
  }
}
div {
  margin: 4em 0 4em 0;
  padding: 1em;
  text-align: center;
}
</style>
