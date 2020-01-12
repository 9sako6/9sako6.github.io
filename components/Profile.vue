<template>
  <div id="profile">
    <div class="side-title">Profile</div>
    <div style="text-align: center;">
      <img id="profile-avatar" src="~/static/icon2.png" />
    </div>
    <div class="side-description">
      くさころといいます。
      <!-- RubyとC++で競プロをしています。
      競プロあまり得意じゃないです。
      自分でもわかるようになるべく行間のない解説を心がけます。 -->
      好きなアルゴリズムはBFSです。
      <ul>
        <!-- <li class="list-item">
          <a href="https://atcoder.jp/users/qsako6">AtCoder</a>
        </li> -->
        <li class="list-item">
          <a href="https://twitter.com/9sako6" target="_blank">Twitter</a>
        </li>
        <li class="list-item">
          <a href="https://github.com/9sako6/" target="_blank"
            >GitHub</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
@import '@/assets/css/side.css';
#profile-avatar {
  width: 200px;
  border-radius: 100%;
  text-align: center;
}
</style>
