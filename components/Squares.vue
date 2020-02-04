<template lang="pug">
  div.squares-wrapper
    - for (var x = 0; x < 30; x++)
      div(class="square")
</template>
<style lang="scss" scoped>
@function random-num($min, $max) {
  @return floor(random() * ($max - $min) + $min);
}
@media screen and (max-width: 767px) {
}
@media screen and (min-width: 768px) {
}
$height: 100%;

.squares-wrapper {
  position: relative;
  height: $height;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  z-index: -1;
}
@for $i from 0 through 29 {
  @keyframes square-animation-#{$i} {
    100% {
      transform: translate3d(
        random-num(-50, 150) * 1vw,
        random($height) + px,
        random(100) + px
      );
    }
  }
  .square:nth-child(#{$i}) {
    position: absolute;
    $size: random(15) + 5 + px;
    $color: hsl(0, 0%, 63%);
    height: $size;
    width: $size;
    @if $i % random(3) == 0 {
      background-color: $color;
    }
    box-shadow: 0px 0px 10px $color;
    animation: square-animation-#{$i}
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
</style>

