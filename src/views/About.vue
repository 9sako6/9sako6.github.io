<template>
  <div id="about">
    <div class="common about-content">
      <h1>About</h1>
      <section>
        <h2 class="common-title"><span class="common-title-string">👤 9sako6</span></h2>
        <div class="common-content">
          <p>好きな概念は牛タン、ぬいぐるみ、のんのんびより</p>
          <p><a v-for="link in links" :key="link.id" v-bind:href=link.content>{{ link.header }}</a></p>
        </div>
      </section>
      <section v-for="content in tableContents" :key="content.id">
        <h2 class="common-title"><span class="common-title-string">{{ content.title }}</span></h2>
        <div class="common-content">
          <table class="common-table">
            <tr v-for="item in content.items" :key="item.id">
              <td class="table-header">{{ item.header }}</td>
              <td>{{ item.content }}</td></tr>
          </table>
          <p v-html="content.caption"></p>
        </div>
      </section>
      <section>
        <h2 class="common-title"><span class="common-title-string">Hobbies</span></h2>
        <div class="common-content">
          <p>Web開発, 競技プログラミング, お絵かき, 歌</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
const links = [
  { header: 'GitHub', content: 'https://github.com/9sako6' },
  { header: 'twitter', content: 'https://twitter.com/9sako6' },
  { header: 'dev.to', content: 'https://dev.to/9sako6' },
  { header: 'Qiita', content: 'https://qiita.com/9sako6' },
  { header: 'hatenablog', content: 'https://9sako6.hatenablog.jp/' },
  { header: 'pixiv', content: 'https://www.pixiv.net/member.php?id=13599483' }
]
const education = [
  { header: '2018/04 - 現在', content: '名古屋大学 大学院工学研究科 情報・通信工学専攻' },
  { header: '2014/04 - 2018/03', content: '名古屋大学 工学部 電気電子・情報工学科' }
]
const awards = [
  { header: '2019/03', content: '言語処理学会第25回年次大会 優秀ポスター賞' }
]
const skills = [
  { header: 'Lang.', content: 'Python3, Ruby, JavaScript, TypeScript, HTML, CSS' },
  { header: 'FW', content: 'Vue.js' }
]
const tableContents = [
  { title: '🎓 Education', items: education, caption: '' },
  { title: '🏆  Awards 🎉', items: awards, caption: '' },
  { title: 'Languages, Frameworks', items: skills, caption: '' }
]

export default {
  name: 'about',
  data () {
    return {
      links, tableContents
    }
  }
}
</script>

<style scoped>
#about {
  text-align: left;
}
/* #about {
  padding: 5% 0 5% 0;
  background-color: rgb(250, 250, 250);
} */
@media screen and (max-width: 767px) {
  .about-content {
    margin-bottom: 60px;
  }
}
@media screen and (min-width: 768px) {
  .about-content {
    margin-bottom: 100px;
  }
}
.common-content a {
  margin-right: 10px;
  text-decoration: none;
  color: rgba(60, 150, 120, 0.6);
}
.common-content a:hover {
  color: rgba(60, 150, 120, 1);
}
.common-title {
  font-family: 'opensans-bold', sans-serif;
  text-align: left;
  padding-left: 7px;
}
.common-title-string {
  border-bottom: 1px solid rgba(60, 150, 120, 0.5);
}
</style>
