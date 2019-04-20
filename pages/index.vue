<template>
  <section class="container">
    <div id="top">
      <img class="logo" src="~/static/icon.png" />
      <h1 class="title">9sako6 Garden</h1>
    </div>
    <Posts />
  </section>
</template>

<script>
import Posts from '~/components/Posts.vue'

export default {
  components: {
    Posts
  }
}
</script>

<style>
.container {
  justify-content: center;
  align-items: center;
  text-align: center;
}
#top {
  margin-bottom: 10%;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  color: #35495e;
  letter-spacing: 1px;
}

@media screen and (max-width: 767px) {
  .container {
    width: 80%;
    margin: 25% 10% 25% 10%;
  }
  .title {
    font-weight: 600;
    font-size: 50px;
  }
}
@media screen and (min-width: 768px) {
  .container {
    width: 50%;
    margin: 10% 25% 10% 25%;
  }
  .title {
    font-weight: 600;
    font-size: 60px;
  }
}

.logo {
  height: 100px;
  width: 100px;
  /* box-shadow: 1px 1px 15px #101010; */
  border-radius: 50px;
  transition: box-shadow 0.3s ease;
}
.logo:hover {
  box-shadow: 1px 1px 20px #aaa;
}
</style>
