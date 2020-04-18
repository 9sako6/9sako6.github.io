<template>
  <div class="header-wrapper">
    <Squares />
    <TopTitle />
  </div>
</template>
<script>
import TopTitle from "~/components/TopTitle.vue"
import Squares from "~/components/Squares.vue"

export default {
  components: {
    TopTitle,
    Squares,
  },
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  height: $title-height;
  text-align: center;
}
</style>
