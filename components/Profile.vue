<template>
  <div id="profile">
    <div class="side-title">Profile</div>
    <div class="img-wrapper">
      <client-only>
        <transition name="fade">
          <lazy-component>
            <img id="profile-avatar" src="~/static/icon.jpg" alt="a picture drawn by 9sako6" />
          </lazy-component>
        </transition>
      </client-only>
    </div>
    <div class="side-description">
      <div>くさころ(9sako6)といいます。名前の由来は腐ったコロッケです。</div>
      <div>名古屋大学 → 名古屋大学大学院在学中。</div>
      <div>
        当サイト「
        <div class="frame">腐</div>ったコロッケ」では、Web開発と競技プログラミングの情報を発信します。
      </div>
      <ul>
        <li v-for="item in items" :key="item.id">
          <a :href="item.link" target="_blank" rel="noopener noreferrer">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      items: [
        { link: "https://twitter.com/9sako6/", title: "Twitter" },
        { link: "https://github.com/9sako6/", title: "GitHub" },
        { link: "https://atcoder.jp/users/qsako6/", title: "AtCoder" }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/side.css";
#profile-avatar {
  width: 200px;
  border-radius: 100%;
}
.img-wrapper {
  margin: auto;
  text-align: center;
  width: 200px;
  height: 200px;
  background-color: #f7f7f7;
  border-radius: 100%;
}
.frame {
  width: 22px;
  text-align: center;
  display: inline-block;
  background-color: $my-black;
  color: $my-white;
  transform: rotate(-20deg);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
