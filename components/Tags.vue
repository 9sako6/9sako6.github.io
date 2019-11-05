<template>
  <section class="page">
    <div class="side-title">Tags</div>
    <div class="side-description">
      <ul v-for="tag in tags" :key="tag.id">
        <li class="post-tag">
          <nuxt-link :to="'/tags/' + tag.name">
            {{ tag.name + ` (${tag.count})` }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { TagsList } from '~/contents/posts/tags_list.json'

export default {
  data() {
    return {
      tags: TagsList
    }
  }
}
</script>
<style scoped>
@import '@/assets/css/side.css';
</style>
