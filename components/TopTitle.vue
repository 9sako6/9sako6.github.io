<template>
  <div class="title">
    <nuxt-link to="/" class="link">
      <div class="wrapper">
        <div class="frase frase-3">腐</div>
        <div class="frase frase-2">った</div>
        <div class="frase frase-4">コロッケ</div>
      </div>
    </nuxt-link>
    <div>=^._.^=</div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  text-align: center;
  color: $my-black;
  position: absolute;
  @include pc {
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
  }
  @include mobile {
    left: 0;
    right: 0;
  }
  margin: auto;
  top: $title-height / 3;
}
.link {
  color: $my-black;
  font-family: serif;
  text-decoration: none;
  font-size: 0;
}
.frase {
  display: inline-block;
}
.wrapper {
  text-align: center;
}
.frase-1 {
  @include pc {
    font-size: 50px;
  }
  @include mobile {
    font-size: 35px;
  }
}
.frase-2 {
  @include pc {
    font-size: 40px;
  }
  @include mobile {
    font-size: 25px;
  }
}
.frase-3 {
  @include pc {
    font-size: 60px;
    padding: 3px;
  }
  @include mobile {
    font-size: 40px;
    padding: 2px;
  }
  color: $my-white;
  background-color: $my-black;
  transform: rotate(-20deg);
}
.frase-4 {
  @include pc {
    font-size: 50px;
  }
  @include mobile {
    font-size: 35px;
  }
}
</style>
