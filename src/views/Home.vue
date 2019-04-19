<template>
  <div class="home">
      <router-link to="/">
        <img alt="Vue logo" class="icon" src="../assets/logo.png">
      </router-link>
    <!-- <HelloWorld msg="くさころがーでん"/> -->
    <Thumbnail title="9sako6 Garden" content="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Thumbnail from '@/components/Thumbnail.vue'; // @ is an alias to /src

@Component({
  components: {
    Thumbnail,
  },
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
</style>
