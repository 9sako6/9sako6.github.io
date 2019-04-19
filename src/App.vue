<template>
  <div id="app">
    <header>
      <Menu/>
    </header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/markdown">Markdown</router-link>
    </div> -->
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
  /* position: fixed; */
  top: 0;
  margin-bottom: 10%;
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
  .common-title {
   font-size: 0.9em;
  }
  .common-content {
    font-size: 0.6em;
    margin: 10px;
  }
  .common {
    width: 80%;
    margin-top: 80px;
    margin-left: 15%;
    margin-right: 5%;
  }
  .table-header {
    width: 100px;
  }
}
@media screen and (min-width: 768px) {
  .bm-burger-button {
    width: 36px;
    height: 30px;
    left: 36px;
  }
  .common-title {
    font-size: 1.3em;
  }
  .common-content {
    margin: 30px;
  }
  .common {
    width: 50%;
    margin-top: 150px;
    margin-left: 25%;
    margin-right: 25%;
  }
  .table-header {
    width: 150px;
  }
}
</style>
