<template>
  <section class="page">
    <div class="side-title">Tags</div>
    <!-- <div class="side-description">
      <ul v-for="tag in tags" :key="tag.id">
        <li class="list-item">
          <nuxt-link :to="`/${entrypoint}/tag/${tag}`">{{tag}}</nuxt-link>
        </li>
      </ul>
    </div> -->
  </section>
</template>

<script>
// import { tags } from "~/assets/json/tags.json";

export default {
  props: {
    entrypoint: { type: String, default: "" },
    tags: { type: Array, default: () => [] }
  }
};
</script>
<style scoped>
@import "@/assets/css/side.css";
@import "@/assets/css/tag.css";
</style>
