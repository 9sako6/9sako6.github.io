<template>
  <div class="pagenation-wrapper">
    <div v-for="pageNum in pages" :key="pageNum" style="display: inline;">
      <div
        v-if="pageNum.toString() === nowPage"
        class="pagenation selected-pagenation"
      >
        <nuxt-link class="link" :to="`/page/${pageNum}`">
          {{ pageNum }}
        </nuxt-link>
      </div>
      <div v-else class="pagenation">
        <nuxt-link class="link" :to="`/page/${pageNum}`">
          {{ pageNum }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalPostsCount: { type: Number, default: 0 },
    nowPage: { type: String, default: '1' },
    postNumPerPage: { type: Number, default: 5 }
  },
  data () {
    const oldestPageNum = Math.ceil(this.totalPostsCount / this.postNumPerPage);
    const pages = Array.from(Array(oldestPageNum).keys(), x => x + 1);
    return {
      pages
    };
  }
};
</script>
<style lang="scss" scoped>
.pagenation-wrapper {
  margin-top: 2em;
  text-align: center;
}
.pagenation {
  display: inline-block;
}
.light {
  .selected-pagenation {
    @apply bg-gray-300;
  }
  .pagenation:hover {
    @apply bg-gray-300;
  }
}

.dark {
  .selected-pagenation {
    @apply bg-gray-900;
  }
  .pagenation:hover {
    @apply bg-gray-900;
  }
}
.link {
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}
</style>
