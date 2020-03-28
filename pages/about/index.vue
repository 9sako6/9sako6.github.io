<template>
  <section class="page">
    <h1 id="page-title">About</h1>
    <div class="post-meta">
      <time>created: 2020-03-28</time>
    </div>
    <div style="margin-bottom: 120px;">
      <h1>About me</h1>
      <section>
        9sako6 (kusakoro).
        Human beings.
        Japanese.
        Web Developer.
        <ul>
          <li v-for="item in items" :key="item.id">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">{{item.title}}</a>
          </li>
        </ul>
      </section>
      <h1>About this site</h1>
      <section>
        9sako6's personal website and blog, powered by Nuxt.js.
        <ul>
          <li>
            <a href="https://github.com/9sako6/9sako6-blog" target="_blank" rel="noopener noreferrer">9sako6/9sako6-blog</a>
          </li>
        </ul>
      </section>
      <h1>Educational Background</h1>
      <section>
        Department of Information and Communication Engineering, 
        Graduate School of Engineering, Nagoya University
        <ul>
          <li>Apr 2018 - Mar 2020</li>
        </ul>

        Department of Electrical Engineering, 
        Electronics, and Information Engineering, 
        School of Engineering, 
        Nagoya University
        <ul>
          <li>Apr 2014 - Mar 2018</li>
        </ul>
      </section>
      <h1>Awards</h1>
      <section>
        The Excellence Poster Award
        <ul>
          <li>The Association for Natural Language Processing 2019</li>
        </ul>
      </section>
      <h1>Skills</h1>
      <section>
        Programming Languages
        <ul>
          <li>Ruby (Long experience)</li>
          <li>C++, JavaScript, TypeScript, HTML, CSS, Python3, Go, ShellScript</li>
        </ul>
        Tools
        <ul>
          <li>React.js, Vue.js, Nuxt.js</li>
          <li>Git, Docker</li>
          <li>macOS, Ubuntu</li>
        </ul>
      </section>
    </div>
  </section>
</template>
<script>
export default {
  head() {
    return {
      title: 'About 9sako6'
    }
  },
  data: function() {
    return {
      items: [
        { link: "https://twitter.com/9sako6/", title: "Twitter" },
        { link: "https://github.com/9sako6/", title: "GitHub" },
        { link: "https://atcoder.jp/users/qsako6/", title: "AtCoder" }
      ]
    };
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/post.scss";
@import "@/assets/scss/tag.scss";
</style>
