<template>
  <div id="box">
    <div id="nav">
      <router-link v-bind:to="link">
        <h2 id="title">{{ title }}</h2>
        <p>{{ content }}</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private link!: string;
  @Prop() private title!: string;
  @Prop() private content!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#box {
  text-align: left;
  border-radius: 5px;
  margin: 10px 0 10px 0;
  box-shadow: 1px 1px 15px #eee;
  transition: box-shadow .3s ease;
}
#box:hover {
  box-shadow: 1px 1px 20px #fff;
}
#nav a {
  text-decoration: none;
}
@media screen and (max-width: 767px) {
  #box {
    width: 80%;
    margin-left: 10%;
    font-size: 0.8em;
  }
}
@media screen and (min-width: 768px) {
  #box {
    width: 40%;
    margin-left: 30%;
  }
}
</style>
