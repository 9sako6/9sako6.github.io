<template lang="pug">
  div.wrapper
    //- img(src='~/static/header.jpeg')
    div.title
      nuxt-link(to="/").link 9sako6 Garden
      .navi-wrap
        Navi
    - for (var x = 0; x < 50; x++)
      div(class="circle")
</template>
<script>
import Navi from "~/components/Navi.vue";
export default {
  components: {
    Navi
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
$height: 400px;

.wrapper {
  // position: fixed;
  position: relative;
  // z-index: -999px;
  // height: ;
  // @media screen and (max-width: 767px) {
  //   height: 200px;
  // }
  // @media screen and (min-width: 768px) {
  //   height: 400px;
  // }
  height: $height;
  width: 100%;
  // top: 0;
  // left: 0;
  overflow: hidden;
  // background: radial-gradient(circle, #ffffff, #e9e9e9);
  // background-image: url('~static/header.jpeg');
  // background-size: 100%;
  background-repeat: no-repeat;
}
@for $i from 0 through 49 {
  @keyframes circle-animation-#{$i} {
    100% {
      transform: translate3d(
        random-num(-50, 150) * 1vw,
        random($height) + px,
        random(100) + px
      );
    }
  }
  .circle:nth-child(#{$i}) {
    position: absolute;
    $size: random(15) + 5 + px;
    $color: hsl(0, 0%, 63%);
    height: $size;
    width: $size;
    @if $i % random(3) == 0 {
      background-color: $color;
    }
    box-shadow: 0px 0px 10px $color;
    animation: circle-animation-#{$i}
      linear
      (random(10) + 10) +
      s
      alternate
      infinite;
    animation-delay: -$i * 1s;
    transform: translate3d(random(90) * 1vw, random($height) + px, 0)
      rotate((random(360)) + deg);
  }
}
.title {
  position: absolute;
  top: $height / 2;
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
