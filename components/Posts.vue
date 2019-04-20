<template>
  <section>
    <Post
      link="/posts/2019/04/08/abc052_c"
      title="ABC052 C - Factors of Factorial"
      date="2019-04-08"
      content="N!の約数の個数を10^9+7で割った余りを答える問題。

## 解法
約数の個数は(各素因数の指数+1)を掛け合わせたものです。"
    />
  </section>
</template>

<script>
import Post from '~/components/Post.vue'

export default {
  components: {
    Post
  }
}
</script>

<style scoped>
a {
  color: #35495e;
  text-decoration: none;
}
</style>
