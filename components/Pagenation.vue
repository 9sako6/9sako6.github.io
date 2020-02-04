<template>
  <div class="pagenation-wrapper">
    <div class="pagenation" v-for="pageNum in pages" :key="pageNum">
      <nuxt-link class="link" :to="`/${domain}/page/${pageNum}`">{{pageNum}}</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    domain: { type: String, default: "" },
    pages: { type: Array, default: [1] }
  }
};
</script>
<style lang="scss" scoped>
.pagenation-wrapper {
  margin-top: 2em;
  text-align: center;
}
.pagenation {
  display: inline-block;
}
.link {
  color: $my-black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}

.pagenation:hover {
  background-color: #ddd;
}
</style>
