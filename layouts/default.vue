<template>
  <div id="root" :class="mode">
    <div id="container-outer">
      <Header />
      <DarkModeToggle :toggle-mode="toggleMode" :mode="mode" />
      <div id="content">
        <nuxt id="page-main" keep-alive />
        <aside id="side-menu">
          <Profile :mode="mode" />
          <Tags />
        </aside>
      </div>
    </div>
    <DarkModeToggle :toggle-mode="toggleMode" :mode="mode" />
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header.vue';
import Profile from '~/components/Profile.vue';
import Tags from '~/components/Tags.vue';
import Footer from '~/components/Footer.vue';
import DarkModeToggle from '~/components/DarkModeToggle.vue';
export default {
  components: {
    Header,
    Profile,
    Tags,
    Footer,
    DarkModeToggle
  },
  data () {
    return {
      mode: 'dark'
    };
  },
  mounted () {
    this.mode = localStorage.getItem('mode') || 'dark';
    document.querySelector('html').style.backgroundColor =
      this.mode === 'dark' ? 'rgb(42, 56, 72)' : 'rgb(255, 255, 255)';
  },
  methods: {
    toggleMode () {
      const mode = localStorage.getItem('mode');
      const newMode = mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mode', newMode);
      this.mode = newMode;
      document.querySelector('html').style.backgroundColor =
        this.mode === 'dark' ? 'rgb(42, 56, 72)' : 'rgb(255, 255, 255)';
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.light {
  @apply bg-white;
  transition: 0.3s ease-in-out;
}

.dark {
  @apply bg-gray-800;
  @apply text-gray-400;
  transition: 0.3s ease-in-out;
}

html {
  @apply font-medium;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
    width: 90%;
    border-right: 1px solid #eceef1;
    border-left: 1px solid #eceef1;
  }
  #page-main {
    width: 100%;
  }
  #side-menu {
    width: 100%;
  }
  #content {
    margin: $title-height / 2 55px;
  }
}
@media screen and (min-width: 1200px) {
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
  @apply text-blue-700;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
}
</style>
