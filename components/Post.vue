<template>
  <div class="post">
    <div class="post-date">{{ date }}</div>
    <a :href="link">
      <div class="post-title">{{ title }}</div>
      <div class="post-content">{{ description }}</div>
    </a>
    <div v-for="tag in tags" :key="tag.id" class="post-tags">
      <nuxt-link :to="'/tags/' + tag">
        <span class="post-tag">
          {{ tag }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    title: String,
    date: String,
    description: String,
    tags: Array
  }
}
</script>

<style scoped>
.post {
  text-align: left;
  padding: 20px;
}
.post-title {
  font-weight: 600;
  font-size: 1.5em;
}
.post-date {
  color: #717579;
}
a {
  color: #35495e;
  text-decoration: none;
}

.post-tags {
  display: inline;
  /* margin: 2em 0 4em 0; */
}
.post-tag {
  margin: 0 0.1em 0.1em 0;
  display: inline-block;
  border-radius: 0.2em;
  padding: 0.4em 0.4em;
  background-color: rgb(229, 250, 242);
}
</style>
