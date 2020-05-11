<template>
  <section class="page">
    <div id="page-title">
      お問い合わせ
    </div>
    <h1>サイトからのお問い合わせ</h1>
    <p>
      <nuxt-link to="/policy">
        プライバシーポリシー
      </nuxt-link>
      を確認した上で送信してください。
      <ContactForm />
    </p>
  </section>
</template>
<script>
import ContactForm from '~/components/ContactForm'

export default {
  components: {
    ContactForm
  },
  head () {
    return {
      title: 'お問い合わせ',
      meta: []
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/post.scss";
@import "@/assets/scss/tag.scss";
</style>
