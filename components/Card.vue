<template>
  <div class="post">
    <div class="post-date">{{ createdAt.split('T')[0] }}</div>
    <div class="post-title-wrap">
      <nuxt-link :to="link" class="post-title">{{ title }}</nuxt-link>
    </div>
    <div class="box">
      <div class="left-box">
        <nuxt-link :to="link">
          <client-only>
            <transition name="fade">
              <lazy-component>
                <img :src="imgLink" :alt="title" class="eye-catch" />
              </lazy-component>
            </transition>
          </client-only>
        </nuxt-link>
      </div>
      <div class="right-box">
        <div v-if="description" class="post-description">
          <nuxt-link :to="link">{{ description }}</nuxt-link>
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
    link: { type: String, default: "" },
    imgLink: { type: String, default: "" },
    title: { type: String, default: "" },
    createdAt: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: { type: Array, default: () => [] }
  }
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

.post-title-wrap {
  word-wrap: break-word;
  line-height: 2em;
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
.post-date {
  color: #717579;
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
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
