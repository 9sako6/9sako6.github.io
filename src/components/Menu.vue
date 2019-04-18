<template>
    <Slide>
      <a href="/">
        <span class="navi-item">Home</span>
      </a>
      <a href="/about">
        <span class="navi-item">About</span>
      </a>
    </Slide>
</template>

<script>
import { Slide } from 'vue-burger-menu' // import the CSS transitions you wish to use, in this case we are using `Slide`
export default {
  name: 'app',
  components: {
    Slide
  }
}
</script>

<style scoped>
.navi-item:hover {
  opacity: 0.5;
}
@media screen and (max-width: 767px) {
  .bm-burger-button {
    width: 24px !important;
    height: 20px !important;
    left: 20px !important;
  }
}
@media screen and (min-width: 768px) {
  .bm-burger-button {
    width: 36px;
    height: 30px;
    left: 36px;
  }
}
</style>
