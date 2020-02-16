<template>
  <div id="profile">
    <div class="side-title">Profile</div>
    <div style="text-align: center;">
      <img id="profile-avatar" src="~/static/icon.png" alt="a picture drawn by 9sako6" />
    </div>
    <div class="side-description">
      <p>くさころ(9sako6)といいます。</p>
      <p>名古屋大学 -> 名古屋大学大学院在学中。</p>
      <p>当サイト「庭に腐ったコロッケ」では、Web開発と競技プログラミングの情報を発信します。</p>
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
        { link: "https://github.com/9sako6/", title: "GitHub" }
      ]
    };
  }
};
</script>

<style scoped>
@import "@/assets/css/side.css";
#profile-avatar {
  width: 200px;
  border-radius: 100%;
  text-align: center;
}
</style>
