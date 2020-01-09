<template>
  <section class="page">
    <h1>Tags</h1>
    <div v-for="tag in tags" :key="tag.id">
      <div class="tag">
        <nuxt-link :to="'/tags/' + tag.name">{{
          tag.name + ` (${tag.count})`
        }}</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { TagsList } from '~/contents/posts/competitive_programming/tags_list.json'

export default {
  data() {
    return {
      tags: TagsList
    }
  }
}
</script>
<style scoped>
@import '@/assets/css/post.css';
.tag {
  margin: 1em;
}
</style>
