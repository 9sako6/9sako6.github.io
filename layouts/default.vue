<template>
  <div id="root">
    <div id="container-outer">
      <Header />
      <div id="content">
        <nuxt id="page-main" />
        <aside id="side-menu">
          <Profile />
          <!-- <Tags /> -->
        </aside>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
import Profile from "~/components/Profile.vue";
import Footer from "~/components/Footer.vue";
export default {
  components: {
    Header,
    Profile,
    Footer
  }
};
</script>

<style lang="scss" scoped>
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
html {
  font-family: "YuGothic", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #3f3f3f;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  color: #3f3f3f;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #3f3f3f;
}
@media screen and (max-width: 767px) {
  * {
    box-sizing: border-box;
  }
  #container-outer {
    width: 90%;
    margin: auto;
  }
  #page-main {
    width: 100%;
  }
  #side-menu {
    width: 100%;
  }
  #content {
    margin: 0 10px;
  }
}
@media screen and (min-width: 768px) {
  #container-outer {
    width: 1140px;
    border-right: 1px solid #eceef1;
    border-left: 1px solid #eceef1;
  }
  #page-main {
    width: 800px;
  }
  #side-menu {
    width: 200px;
  }
  #content {
    margin: $title-height / 2 55px;
  }
}
#container-outer {
  margin: auto;
  margin-bottom: 100px;
}
#page-main {
  float: left;
  margin-bottom: 100px;
}
#side-menu {
  float: right;
  height: 100%;
}
a {
  word-break: break-all;
}
</style>
