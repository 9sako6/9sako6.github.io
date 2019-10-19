<template>
  <header class="navbar">
    <nuxt-link to="/" class="nav-link">
      <span class="site-title">くさころ競プロ日記</span>
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
    <Slide id="my-burger-menu" class="my-burger-menu" left width="160">
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
  display: inline-block;
  background-color: #d82e8c;
}
.nav-link {
  border-bottom: none;
  text-decoration: none;
}
.site-title {
  font-weight: 700;
  position: relative;
  font-size: 1.3em;
  color: #ffffff;
}
.logo {
  height: 2em;
}
.links {
  position: absolute;
  white-space: nowrap;
  display: flex;
  left: 80%;
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
  color: #ffffff;
  font-weight: 600;
  font-size: 1.1em;
}
.nav-item:hover {
  border-bottom: solid 2px #ffffff;
}
@media screen and (max-width: 767px) {
  .can-hide {
    display: none;
  }
  .site-title {
    margin-left: 3em;
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
.my-burger-menu {
  position: absolute;
  left: 0;
  top: 0;
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
}
.my-burger-menu >>> .bm-cross {
  height: 24px !important;
  background-color: #ffffff;
}
.my-burger-menu >>> .line-style {
  background-color: #ffffff;
}
.my-burger-menu >>> .bm-menu {
  color: #ffffff;
  transition: 0.2s ease;
  background-color: #d82e8c;
  border-left: 1px solid #eaecef;
}
</style>
