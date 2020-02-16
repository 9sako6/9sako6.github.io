<template>
  <footer class="footer">
    <div class="text-wrap">
      <a class="link" href="https://github.com/9sako6/9sako6-garden" target="_blank" rel="noopener noreferrer">9sako6/9sako6-garden</a>
    </div>
    <div class="text-wrap">
      <nuxt-link class="link" to="/policy">プライバシーポリシー</nuxt-link>
    </div>
    <div class="text-wrap">
      <span id="copy-right">&copy; 2019- 9sako6 All Rights Reserved</span>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
footer {
  margin-top: auto;
  text-align: center;
  padding: 1em;
  color: $my-white;
  background-color: $my-gray;
}
.text-wrap {
  height: 2em;
  line-height: 2em;
}
.link {
  color: $my-white;
  text-decoration: none;
}
.link:hover {
  color: $my-red;
}
</style>
