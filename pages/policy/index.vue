<template>
  <section class="page">
    <h1 id="page-title">
      プライバシーポリシー
    </h1>
    <div class="post-meta">
      <div class="post-time">
        <time>
          <div class="post-time-title">created:</div>
          2020-02-12
        </time>
      </div>
      <div class="post-time">
        <time>
          <div class="post-time-title">updated:</div>
          2020-02-12
        </time>
      </div>
    </div>
    <div style="margin-bottom: 120px;" v-html="$md.render(policy)" />
  </section>
</template>
<script>
import policy from '~/assets/md/policy.md';

export default {
  computed: {
    policy () {
      return policy;
    }
  },
  head () {
    return {
      title: 'プライバシーポリシー'
    };
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/post.scss";
@import "@/assets/scss/tag.scss";
</style>
