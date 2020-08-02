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
    nowPage: { type: String, default: "1" },
    postNumPerPage: { type: Number, default: 5 },
  },
  data() {
    const oldestPageNum = Math.ceil(this.totalPostsCount / this.postNumPerPage);
    const pages = Array.from(Array(oldestPageNum).keys(), (x) => x + 1);
    return {
      pages,
    };
  },
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
.light-mode {
  .selected-pagenation {
    @apply bg-gray-200;
  }
  .pagenation:hover {
    @apply bg-gray-200;
  }
  .link {
    border: 1px solid #ddd;
  }
}

.sepia-mode {
  .selected-pagenation {
    background-color: #ded0bf;
  }
  .pagenation:hover {
    background-color: #ded0bf;
  }
  .link {
    border: 1px solid #ded0bf;
  }
}

.dark-mode {
  .selected-pagenation {
    @apply bg-black;
  }
  .pagenation:hover {
    @apply bg-black;
  }
  .link {
    border: 1px solid rgb(62, 62, 62);
  }
}
.link {
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}
</style>
