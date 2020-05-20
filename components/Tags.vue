<template>
  <section class="page">
    <div class="side-title">
      Tags
    </div>
    <div class="wrapper">
      <div v-for="tag in tags" :key="tag.id" class="post-tags">
        <nuxt-link
          v-if="
            tag.hasOwnProperty('fields') && tag.fields.hasOwnProperty('slug')
          "
          :to="`/tag/${tag.fields.slug}`"
        >
          <span class="post-tag">{{
            `${tag.fields.name} (${postCount(tag)})`
          }}</span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['tags']),
    postCount () {
      return (currentTag) => {
        return this.$store.getters.getAssociatedPosts(currentTag).length;
      };
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/side.css";
@import "@/assets/scss/tag.scss";
.wrapper {
  padding-left: 1em;
}
</style>
