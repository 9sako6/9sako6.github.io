<template>
  <nuxt-link
    :aria-label="link"
    :to="link"
    class="post-description-link"
    @click="handleClick"
  >
    <div class="post">
      <div class="post-info-wrapper">
        <div :class="`post-category ${categoryColor(category)}`">
          {{ categoryName(category) }}
        </div>
        <div class="post-date">
          {{ createdAt.split("T")[0] }}
        </div>
      </div>
      <div class="post-title-wrap">
        <nuxt-link :aria-label="link" :to="link" class="post-title">
          {{ title }}
        </nuxt-link>
      </div>
      <div class="box">
        <div class="left-box">
          <lazy-component class="eye-catch">
            <img :src="imgLink" alt="eye catch" class="eye-catch" />
          </lazy-component>
        </div>
        <div class="right-box">
          <div v-if="description" class="post-description">
            {{
              `${description.substr(0, 160)}${
                description.length > 160 ? "..." : ""
              }`
            }}
          </div>
        </div>
      </div>
      <div v-for="tag in tags" :key="tag.id" class="post-tags">
        <nuxt-link
          v-if="
            tag.hasOwnProperty('fields') && tag.fields.hasOwnProperty('slug')
          "
          :to="`/tag/${tag.fields.slug}`"
        >
          <span class="post-tag">{{ tag.fields.name }}</span>
        </nuxt-link>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ type: String })
  title!: string;
  @Prop({ type: String })
  description!: string;
  @Prop({ type: String })
  createdAt!: string;
  @Prop({ type: String })
  category!: string;
  @Prop({ type: String })
  link!: string;
  @Prop({ type: String })
  imgLink!: string;
  @Prop({ type: Array })
  tags!: string[];
  @Prop({ type: Object })
  $gtm!: any;

  categoryName(categorySlug: string) {
    if (categorySlug === "competitive_prog") {
      return "競プロ";
    } else if (categorySlug === "tech_blog") {
      return "技術";
    } else {
      return "雑記";
    }
  }
  categoryColor(categorySlug: string) {
    if (categorySlug === "competitive_prog") {
      return "bg-purple-600";
    } else if (categorySlug === "tech_blog") {
      return "bg-blue-700";
    } else {
      return "bg-gray-700";
    }
  }
  handleClick() {
    this.$gtm.push({ event: "demo" });
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/tag.scss";
.post {
  @apply rounded;
  margin-bottom: 1em;
  text-align: left;
  padding-left: 1em;
  &:hover {
    @apply shadow-xl;
  }
  @include pc {
    padding: 20px;
  }
  @include mobile {
    padding: 1em;
  }
}

.light-mode .post {
  @apply bg-gray-100;
}

.sepia-mode .post {
  background-color: #f0e2d0;
}

.dark-mode .post {
  background-color: rgb(32, 32, 33);
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
}
.post-title-wrap {
  word-wrap: break-word;
  line-height: 2em;
  margin: 1em 0;
}
.post-title {
  font-weight: 700;
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
}
.post-description {
  line-height: 1.5em;
  &:hover {
    text-decoration: underline;
  }
}

a {
  text-decoration: none;
}

@include pc {
  .box {
    display: grid;
    justify-content: center;
    grid-template-columns: 256px 1fr;
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
}

@include mobile {
  .box {
    display: grid;
    justify-content: center;
    grid-template-rows: 144px 1fr;
  }
  .left-box {
    grid-row: 1/2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right-box {
    grid-row: 2/3;
    padding: 1em;
  }
}

.eye-catch {
  @include pc {
    width: 256px;
    height: 144px;
  }
  @include mobile {
    width: 256px;
    height: 144px;
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
.light-mode,
.sepia-mode {
  .post-title,
  .post-description-link {
    color: $my-black;
  }
}
.dark-mode {
  .post-title,
  .post-description-link {
    color: $my-white;
  }
}
</style>
