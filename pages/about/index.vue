<template>
  <section class="page">
    <h1 id="page-title">
      About
    </h1>
    <div class="post-meta">
      <div class="post-time">
        <time>
          <div class="post-time-title">created:</div>
          2020-03-28
        </time>
      </div>
      <div class="post-time">
        <time>
          <div class="post-time-title">updated:</div>
          2020-08-17
        </time>
      </div>
    </div>
    <div style="margin-bottom: 120px;" v-html="about" />
  </section>
</template>
<script>
import about from '~/assets/md/about.md';

export default {
  computed: {
    about () {
      return about;
    }
  },
  head () {
    return {
      title: 'About 9sako6'
    };
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/post.scss";
@import "@/assets/scss/tag.scss";
</style>
