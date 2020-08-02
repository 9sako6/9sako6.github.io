<template>
  <div class="title">
    <nuxt-link to="/" class="link">
      <div class="wrapper">
        <div class="frase frase-3">
          腐
        </div>
        <div class="frase frase-2">
          った
        </div>
        <div class="frase frase-4">
          コロッケ
        </div>
      </div>
    </nuxt-link>
    <div>=^._.^=</div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  text-align: center;
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

.light-mode,
.sepia-mode {
  .frase-3 {
    color: $my-white;
    background-color: $my-black;
    transition: 0.3s ease-in-out;
  }
  .frase-2,
  .frase-4 {
    color: $my-black;
  }
}

.dark-mode {
  .frase-3 {
    @apply text-gray-800;
    background-color: $my-white;
    transition: 0.3s ease-in-out;
  }
  .frase-2,
  .frase-4 {
    color: $my-white;
  }
}

.frase-3 {
  @include pc {
    font-size: 60px;
    line-height: 72px;
    width: 72px;
    height: 72px;
  }
  @include mobile {
    font-size: 40px;
    line-height: 48px;
    width: 48px;
    height: 48px;
  }
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
