<template>
  <section class="page">
    <div id="page-title">お問い合わせ</div>
    <h1>Twitter</h1>
    <!-- <p> -->
      <a href="https://twitter.com/9sako6" target="_blank" rel="noopener noreferrer">@9sako6</a>
    <!-- </p> -->
    <h1>サイトからのお問い合わせ</h1>
    <!-- <p> -->
      <nuxt-link to="/policy">プライバシーポリシー</nuxt-link>を確認した上で送信してください。
      <!-- <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSf6NQGAawQ5eeB1urTJml5U-M_nxOBW0AoY6JdUHrvodULVEw/viewform?embedded=true"
        width="100%"
        height="1200"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >読み込んでいます…</iframe> -->
      <ContactForm />
    <!-- </p> -->
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
</style>
