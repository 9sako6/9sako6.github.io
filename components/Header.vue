<template>
  <div class="wrapper">
    <Squares />
    <TopTitle />
  </div>
</template>
<script>
import TopTitle from "~/components/TopTitle.vue";
import Squares from "~/components/Squares.vue";

export default {
  components: {
    TopTitle,
    Squares
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: $title-height;
  text-align: center;
}
</style>
