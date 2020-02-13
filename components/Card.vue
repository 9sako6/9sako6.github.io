<template>
  <div class="post">
    <div class="left-box">
      <nuxt-link :to="link">
        <v-img
          :src="imgLink"
          alt="an eye-catch image"
          :aspect-ratio="16/9"
          width="160"
          height="90"
          class="mx-auto eye-catch-img"
        />
      </nuxt-link>
    </div>
    <div class="right-box">
      <div class="post-date">{{ createdAt.split('T')[0] }}</div>
      <div class="post-title-wrap">
        <nuxt-link :to="link" class="post-title">{{ title }}</nuxt-link>
      </div>
      <div v-if="description" class="post-description">{{ description }}</div>
      <div v-for="tag in tags" :key="tag.id" class="post-tags">
        <nuxt-link
          v-if="tag.hasOwnProperty('fields') && tag.fields.hasOwnProperty('slug')"
          :to="`/tag/${tag.fields.slug}`"
        >
          <span class="post-tag">{{ tag.fields.name }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: { type: String, default: "" },
    title: { type: String, default: "" },
    createdAt: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: { type: Array, default: () => [] },
    imgLink: { type: String, default: "" }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/tag.css";
.post {
  text-align: left;
  display: grid;
  padding: 20px;
}
@media screen and (max-width: 767px) {
  .post {
    grid-template-rows: 1fr 90px;
    // grid-template-columns: 50px 1fr;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
  }
  .left-box {
    grid-column: 1 / 3;
    grid-row: 2/2;
  }
  .right-box {
    grid-column: 1 / 3;
    grid-row: 1/2;
    margin-bottom: 1em;
  }
}

@media screen and (min-width: 768px) {
  .post {
    grid-template-columns: 160px 1fr;
  }
  .left-box {
    grid-column: 1 / 2;
  }
  .right-box {
    grid-column: 2 / 3;
  }
}
.left-box {
  display: flex;
  align-items: center;
  justify-content: center;
  .eye-catch-img {
    border-radius: 3px;
  }
}
.right-box {
  padding-left: 1em;
}
.post-title-wrap {
  padding: 0.5em 0;
  word-wrap: break-word;
  line-height: 2em;
}
.post-title {
  color: $my-black;
  font-weight: 700;
  font-size: 1.2em;
}
.post-title:hover {
  text-decoration: underline;
}
.post-description {
  color: $my-gray;
  line-height: 1.5em;
}
.post-date {
  color: #717579;
}
a {
  color: #3f3f3f;
  text-decoration: none;
}
</style>
