<template>
  <div class="post">
    <div class="post-info-wrapper">
      <div :class="`post-category ${categoryColor(category)}`">
        {{ categoryName(category) }}
      </div>
      <div class="post-date">{{ createdAt.split("T")[0] }}</div>
    </div>
    <div class="post-title-wrap">
      <nuxt-link :aria-label="link" :to="link" class="post-title">
        {{ title }}
      </nuxt-link>
    </div>
    <div class="box">
      <div class="left-box">
        <nuxt-link :aria-label="link" :to="link">
          <img :src="imgLink" :alt="title" class="eye-catch" />
        </nuxt-link>
      </div>
      <div class="right-box">
        <div v-if="description" class="post-description">
          <nuxt-link :aria-label="link" :to="link">{{
            `${description.substr(0, 160)}${
              description.length > 160 ? "..." : ""
            }`
          }}</nuxt-link>
        </div>
      </div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="post-tags">
      <nuxt-link
        v-if="tag.hasOwnProperty('fields') && tag.fields.hasOwnProperty('slug')"
        :to="`/tag/${tag.fields.slug}`"
      >
        <span class="post-tag">{{ tag.fields.name }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    createdAt: { type: String, default: "" },
    category: { type: String, default: "" },
    link: { type: String, default: "" },
    imgLink: { type: String, default: "" },
    tags: { type: Array, default: () => [] },
  },
  methods: {
    categoryName(categorySlug) {
      if (categorySlug === "competitive_prog") {
        return "競プロ";
      } else if (categorySlug === "tech_blog") {
        return "技術";
      } else {
        return "雑記";
      }
    },
    categoryColor(categorySlug) {
      if (categorySlug === "competitive_prog") {
        return "bg-purple-600";
      } else if (categorySlug === "tech_blog") {
        return "bg-blue-600";
      } else {
        return "bg-gray-700";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/tag.scss";
.post {
  text-align: left;
  padding-left: 1em;
  @include pc {
    padding: 20px;
  }
  @include mobile {
    padding: 10px 0px 40px 0px;
  }
}
.post-info-wrapper {
  display: flex;
  line-height: 2em;
}
.post-category {
  font-weight: 600;
  padding: 0 0.3em;
  width: 4em;
  line-height: 2em;
  text-align: center;
  color: white;
}
.post-date {
  margin-left: 1em;
  line-height: 2em;
  color: #717579;
}
.post-title-wrap {
  word-wrap: break-word;
  line-height: 2em;
  margin: 1em 0;
}
.post-title {
  color: $my-black;
  font-weight: 700;
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
}
.post-description {
  color: $my-gray;
  line-height: 1.5em;
  &:hover {
    text-decoration: underline;
  }
}

a {
  color: #3f3f3f;
  text-decoration: none;
}
.box {
  display: grid;
  justify-content: center;
  @include pc {
    grid-template-columns: 120px 1fr;
  }
  @include mobile {
    grid-template-columns: 90px 1fr;
  }
}

.left-box {
  grid-column: 1/2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right-box {
  grid-column: 2/3;
  padding: 1em;
}
.eye-catch {
  @include pc {
    width: 120px;
    height: 120px;
  }
  @include mobile {
    width: 90px;
    height: 90px;
  }
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  @apply border-gray-300;
  @apply bg-gray-300;
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
}
</style>
