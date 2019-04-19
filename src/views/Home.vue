<template>
  <div class="home">
    <router-link to="/">
      <img alt="Vue logo" class="icon" src="../assets/logo.png">
    </router-link>
    <h1>9sako6 Garden</h1>
    <Thumbnail link="/post/2019/04/sample1" title="ABC052 C - Factors of Factorial" content='N!の約数の個数を10^9+7で割った余りを答える問題。## 解法
    約数の個数は(各素因数の指数+1)を掛け合わせたものです。 この問題を解くためには、N!がN以下の素数でそれぞれ何回割れるかがわかればよいです。...' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Thumbnail from "@/components/Thumbnail.vue"; // @ is an alias to /src

@Component({
  components: {
    Thumbnail
  }
})
export default class Home extends Vue {}
</script>
<style scoped>
.icon {
  height: 100px;
  width: 100px;
  box-shadow: 1px 1px 15px #101010;
  border-radius: 50px;
  transition: box-shadow 0.3s ease;
}
.icon:hover {
  box-shadow: 1px 1px 20px #aaa;
}
a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
