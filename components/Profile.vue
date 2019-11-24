<template>
  <div id="profile">
    <div class="side-title">Profile</div>
    <div style="text-align: center;">
      <img id="profile-avatar" src="~/static/icon.png" />
    </div>
    <div class="side-description">
      くさころです。RubyとC++で競プロをしています。正直競プロあまり得意じゃないです。自分でもわかるようになるべく行間のない解説を心がけます。
      <ul>
        <li class="list-item">
          <a href="https://atcoder.jp/users/qsako6">AtCoder</a>
        </li>
        <li class="list-item">
          <a href="https://twitter.com/9sako6">Twitter</a>
        </li>
        <li class="list-item">
          <a href="https://github.com/9sako6/ruby-datastructures-algorithms"
            >ruby-datastructures-algorithms</a
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
  text-align: center;
}
</style>
