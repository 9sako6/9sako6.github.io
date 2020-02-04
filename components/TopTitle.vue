<template lang="pug">
  div.wrapper
    //- img(src='~/static/header.jpeg')
    div.title
      nuxt-link(to="/").link 9sako6 Garden
      .navi-wrap
        Navi
    Squares
    //- - for (var x = 0; x < 50; x++)
    //-   div(class="square")
</template>
<script>
import Navi from "~/components/Navi.vue";
import Squares from "~/components/Squares.vue";
export default {
  components: {
    Navi,
    Squares
  }
};
</script>
<style lang="scss" scoped>
@function random-num($min, $max) {
  @return floor(random() * ($max - $min) + $min);
}
@media screen and (max-width: 767px) {
}
@media screen and (min-width: 768px) {
}
$height: 200px;
.wrapper {
  height: $height;
}
.title {
  position: absolute;
  top: $height / 4;
  left: 0;
  right: 0;
  font-family: serif;
  @media screen and (max-width: 767px) {
    font-size: 2em;
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    font-size: 3em;
    width: 50%;
    margin-left: 25%;
  }
  text-align: center;
}
.link {
  z-index: -1px;
  text-decoration: none;
  color: $my-black;
}
.navi-wrap {
  font-size: 0.5em;
}
</style>
