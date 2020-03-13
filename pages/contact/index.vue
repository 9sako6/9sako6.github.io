<template>
  <section class="page">
    <div id="page-title">お問い合わせ</div>
    <h1>Twitter</h1>
    <div class="wrapper">
      <a href="https://twitter.com/9sako6" target="_blank" rel="noopener noreferrer">@9sako6</a>
    </div>
    <h1>サイトからのお問い合わせ</h1>
    <div class="wrapper">
      <nuxt-link to="/policy">プライバシーポリシー</nuxt-link>を確認した上で送信してください。
      <ContactForm />
    </div>
  </section>
</template>
<script>
import ContactForm from "~/components/ContactForm";

export default {
  components: {
    ContactForm
  },
  head() {
    return {
      title: "お問い合わせ",
      meta: []
    };
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/post.scss";
@import "@/assets/scss/tag.scss";
.wrapper {
  padding: 0 1em;
}
</style>
