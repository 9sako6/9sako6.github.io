<template>
  <section class="top-container">
    <div class="title-container">
      <nuxt-link class="top-title" to="/blog">
        <div class="button">
          <h1>雑記</h1>
          <p class="desc">
            くさころの日常を書いています。雑多なことを書き連ねる記事群です。
          </p>
        </div>
      </nuxt-link>
    </div>
    <div class="title-container">
      <nuxt-link class="top-title" to="/tech_blog">
        <div class="button">
          <h1>技術ブログ</h1>
          <p class="desc">
            技術的なTipsや自作のアプリケーションについて書いています。
            職業柄Web系が多くなりそうです。 主な使用言語はRuby, TypeScript, C++,
            Goです。
          </p>
        </div>
      </nuxt-link>
    </div>
    <div class="title-container">
      <nuxt-link class="top-title" to="/competitive_programming">
        <div class="button">
          <h1>競技プログラミング</h1>
          <p class="desc">
            解いた問題の解説等を載せています。
            とはいえ競プロあまり得意じゃないです。
            自分でもわかるようになるべく行間のない解説を心がけています。
            好きなアルゴリズムはBFSです。普段はRubyとC++で競プロをしています。
          </p>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
// import Posts from '~/components/Posts.vue'

export default {
  layout: 'top',
  components: {
    // Posts
  }
}
</script>

<style scoped>
.top-container {
  color: #3f3f3f;
}
@media screen and (max-width: 767px) {
  .title-container {
    width: 90%;
    font-size: 0.9em;
  }
}

@media screen and (min-width: 768px) {
  .title-container {
    width: 60%;
    max-width: 600px;
  }
}
.title-container {
  padding: 1em;
  margin: auto;
  text-align: left;
}
/* https://www.nxworld.net/tips/css-button-hover-border-effects.html */
.button {
  position: relative;
  display: inline-block;
  padding: 0.9em 3.6em;
  border: 2px solid #fff;
  /* color: #fff; */
  cursor: pointer;
  /* text-align: center; */
  text-decoration: none;
  outline: none;
  transition: all 0.3s;
}
.button::before,
.button::after {
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: 2;
  content: '';
  transition: all 0.3s;
}
.button::before {
  border-top: 2px solid #e65a5a;
  border-bottom: 2px solid #e65a5a;
  transform: scale(0, 1);
}
.button::after {
  border-right: 2px solid #e65a5a;
  border-left: 2px solid #e65a5a;
  transform: scale(1, 0);
}
.button:hover {
  color: #e65a5a;
}
.button:hover::after,
.button:hover::before {
  transform: scale(1);
}
.top-title {
  text-decoration: none;
  color: #3f3f3f;
}
.desc {
  margin-top: 1em;
  margin-left: 1em;
}
</style>
