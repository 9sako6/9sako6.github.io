<template>
  <div id="profile">
    <div class="side-title">Profile</div>
    <div style="text-align: center;">
      <img id="profile-avatar" src="~/static/icon2.png" alt="a picture drawn by 9sako6" />
    </div>
    <div class="side-description">
      くさころといいます。
      好きなアルゴリズムはBFSです。
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
