<template>
  <header>
    <Slide class="my-burger-menu" right noOverlay width="200">
      <router-link to="/">
        <span class="navi-item">Home</span>
      </router-link>
      <router-link to="/about">
        <span class="navi-item">About</span>
      </router-link>
      <router-link to="/policy">
        <span class="navi-item">Privacy Policy</span>
      </router-link>
    </Slide>
    <div id="top">
      <router-link to="/">
        <img alt="logo" class="logo" src="~/static/icon.png" />
      </router-link>
      <h1 class="title">9sako6 Garden</h1>
      <div class="subtitle">Web Application / Competitive Programming</div>
    </div>
  </header>
</template>

<script>
import { Slide } from 'vue-burger-menu' // import the CSS transitions you wish to use, in this case we are using `Slide`
export default {
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
  .my-burger-menu >>> .bm-burger-button {
    width: 24px;
    height: 20px;
  }
  .my-burger-menu >>> .navi-item {
    font-size: 1em;
  }
}
@media screen and (min-width: 768px) {
  .my-burger-menu >>> .navi-item {
    font-size: 1.2em;
  }
}
.my-burger-menu >>> .bm-cross-button {
  right: 0 !important;
}
.my-burger-menu >>> .bm-cross {
  height: 24px !important;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  color: #35495e;
  letter-spacing: 1px;
}
@media screen and (max-width: 767px) {
  #top {
    margin-top: 10%;
  }
  .title {
    font-weight: 600;
    font-size: 30px;
  }
  .subtitle {
    font-size: 0.8em;
  }
}
@media screen and (min-width: 768px) {
  #top {
    margin-top: 5%;
  }
  .title {
    font-weight: 600;
    font-size: 60px;
  }
  .subtitle {
    font-size: 1em;
  }
}
.logo {
  border-radius: 50px;
  height: 100px;
  width: 100px;
  box-shadow: 1px 1px 15px #aaa;
  border: solid 1px #35495e;
  transition: box-shadow 0.3s ease;
}
.logo:hover {
  box-shadow: 1px 1px 20px #eee;
}
#top {
  text-align: center;
}
</style>
