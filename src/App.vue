<template>
  <div id="app">
    <header>
      <Menu/>
    </header>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/markdown">Markdown</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";

export default {
  name: "App",
  components: {
    Menu
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header {
  top: 0;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media screen and (max-width: 767px) {
  .bm-burger-button {
    width: 24px !important;
    height: 20px !important;
    left: 20px !important;
  }
}
@media screen and (min-width: 768px) {
  .bm-burger-button {
    width: 36px;
    height: 30px;
    left: 36px;
  }
}
</style>
