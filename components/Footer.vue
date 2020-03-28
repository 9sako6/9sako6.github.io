<template>
  <footer class="footer">
    <div class="text-wrap">
      <a
        class="link"
        href="https://github.com/9sako6/9sako6-blog"
        target="_blank"
        rel="noopener noreferrer"
      >9sako6/9sako6-blog</a>
    </div>
    <div class="text-wrap">
      <nuxt-link class="link" to="/about">くさころについて</nuxt-link>
    </div>
    <div class="text-wrap">
      <nuxt-link class="link" to="/policy">プライバシーポリシー</nuxt-link>
    </div>
    <div class="text-wrap">
      <nuxt-link class="link" to="/contact">お問い合わせ</nuxt-link>
    </div>
    <div class="text-wrap">&copy; 2019-2020 9sako6 All Rights Reserved</div>
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
  padding: 0.4em 0;
  word-wrap: break-word;
}
.link {
  color: $my-white;
  text-decoration: none;
}
.link:hover {
  color: $my-red;
}
</style>
