<template>
  <div id="products">
    <main class="common">
        <h1>Products</h1>
      <div v-for="item in items" :key="item.id">
          <div class="works-content">
            <h2 class="common-title"><span class="common-title-string">{{ item.title }}</span></h2>
            <p class="common-content">{{ item.description }}</p>
            <iframe class='gh-star' v-bind:src=item.gh_star_url allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>
            <div><a v-bind:href=item.url><img class="demo-img" v-bind:src=item.img_url></a></div>
          </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'works',
  data () {
    return {
      items: [
        {
          title: '🔍 Commit Stalker',
          url: `https://9sako6.github.io/commit-stalker/`,
          img_url: 'https://raw.githubusercontent.com/9sako6/commit-stalker/master/figs/demo.gif',
          description: `GitHub commits viewer.
          100 commits are showed in a page.
          (30 commits in the official site.)
          In addition, you can search the oldest commit easily.`,
          gh_star_url: 'https://ghbtns.com/github-btn.html?user=9sako6&repo=commit-stalker&type=watch&count=true'
        },
        {
          title: '🚀 MESA',
          url: 'https://9sako6.github.io/MESA/',
          img_url: 'https://raw.githubusercontent.com/9sako6/MESA/master/images/demo.gif',
          description: `A simple XML editor.
          MESA is secure because your files are not sent to the web server.
          It works even offline.`,
          gh_star_url: 'https://ghbtns.com/github-btn.html?user=9sako6&repo=MESA&type=watch&count=true'
        },
        {
          title: '📚 BungoClassifier',
          url: 'https://github.com/9sako6/BungoClassifier',
          img_url: 'https://raw.githubusercontent.com/9sako6/BungoClassifier/master/samples/demo1.gif',
          description: `A classifier that predicts an author of an inputted text.`,
          gh_star_url: 'https://ghbtns.com/github-btn.html?user=9sako6&repo=BungoClassifier&type=watch&count=true'
        },
        {
          title: '⏳ work_timer',
          url: 'https://rubygems.org/gems/work_timer',
          img_url: 'https://raw.githubusercontent.com/9sako6/work_timer/master/figs/demo1.gif',
          description: `A tiny RubyGem to measure the time.`,
          gh_star_url: 'https://ghbtns.com/github-btn.html?user=9sako6&repo=work_timer&type=watch&count=true'
        },
        {
          title: '✒️ Illustrations',
          url: 'https://www.pixiv.net/member.php?id=13599483',
          img_url: require('@/assets/saber.jpg'),
          description: 'My hobby.',
          gh_star_url: ''
        }
      ]
    }
  }
}
</script>

<style>
#products {
  text-align: left;
}
.works-content {
  border-bottom: 1px solid rgba(60, 60, 60, 0.2);
  margin-bottom: 60px;
}
.demo-img {
  width: 90%;
  height: auto;
  border-radius: 5px;
  margin: 30px 0 30px 0;
  transition: 1s ease;
  box-shadow: 1px 1px 15px #101010;
  transition: box-shadow .3s ease;
}
.demo-img:hover {
  box-shadow: 1px 1px 20px #aaa;
}
</style>
