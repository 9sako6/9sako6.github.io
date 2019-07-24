<template>
  <header class="navbar">
    <nuxt-link to="/" class="nav-link">
      <span class="site-title">9sako6の競プロ日記</span>
    </nuxt-link>
    <div class="links can-hide">
      <nav class="nav-links">
        <nuxt-link to="/" class="nav-link">
          <div class="nav-item">
            <span class="nav-title">Home</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/about" class="nav-link">
          <div class="nav-item">
            <span class="nav-title">About</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/tags" class="nav-link">
          <div class="nav-item">
            <span class="nav-title">Tags</span>
          </div>
        </nuxt-link>
      </nav>
    </div>
    <Slide class="my-burger-menu" right no-overlay width="200">
      <nuxt-link to="/">
        <span class="navi-item">Home</span>
      </nuxt-link>
      <nuxt-link to="/about">
        <span class="navi-item">About</span>
      </nuxt-link>
      <nuxt-link to="/tags">
        <span class="navi-item">Tags</span>
      </nuxt-link>
    </Slide>
    <!-- <
    <div id="top">
      <nuxt-link to="/">
        <img alt="logo" class="logo" src="~/static/icon.png" />
      </nuxt-link>
      <h1 class="title">9sako6 Garden</h1>
      <div class="subtitle">Web Application / Competitive Programming</div>
    </div> -->
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
.navbar {
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3.6rem;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
  border-bottom: 1px solid #eaecef;
  display: inline-block;
  background-color: #ffffff;
}
.nav-link {
  border-bottom: none;
  text-decoration: none;
}
.site-title {
  font-weight: 700;
  position: relative;
  font-size: 1.3em;
  color: #35495e;
}
.logo {
  height: 2em;
}
.links {
  position: absolute;
  white-space: nowrap;
  display: flex;
  right: 1.5rem;
  top: 0.7rem;
}
.nav-links {
  display: inline-block;
}
.nav-links a {
  line-height: 1.4rem;
}
.nav-item {
  margin-right: 1em;
  position: relative;
  display: inline-block;
}
.nav-title {
  color: #35495e;
  font-size: 1.1em;
  /* color: #4183c4; */
}
.nav-item:hover {
  border-bottom: solid 2px #4183c4;
}
@media screen and (max-width: 767px) {
  .can-hide {
    display: none;
  }
}
@media screen and (min-width: 768px) {
  .my-burger-menu {
    display: none;
  }
}
.navi-item:hover {
  opacity: 0.5;
}
.my-burger-menu >>> .bm-burger-button {
  top: 20px;
  width: 24px;
  height: 20px;
}
.my-burger-menu >>> .navi-item {
  font-size: 1em;
}
.my-burger-menu >>> .bm-cross-button {
  top: 20px;
  right: 24px !important;
}
.my-burger-menu >>> .bm-cross {
  height: 24px !important;
  background-color: #35495e;
}
.my-burger-menu >>> .bm-menu {
  color: #35495e;
  transition: 0.2s ease;
  background-color: #ffffff;
  border-left: 1px solid #eaecef;
}
.navi-item {
  color: #35495e;
}
/*
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
  border: solid 0px #35495e;
  transition: box-shadow 0.3s ease;
}
.logo:hover {
  box-shadow: 1px 1px 20px #eee;
}
@keyframes rotate-anime {
  0% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0);
  }
}
#top {
  text-align: center;
}
*/
</style>
