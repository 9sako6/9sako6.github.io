<template>
  <client-only>
    <form name="contact" netlify-honeypot="bot-field" data-netlify="true" method="post">
      <input type="hidden" name="form-name" value="contact" />
      <p class="hidden" style="display: none;">
        <label>
          Don’t fill this out:
          <input name="bot-field" />
        </label>
      </p>
      <p class="form-area">
        <label for="name">
          <div class="form-title form-required">名前</div>
          <input class="input" type="text" name="name" required />
        </label>
      </p>
      <p class="form-area">
        <label for="email">
          <div class="form-title form-required">メールアドレス</div>
          <input class="input" type="email" name="email" required />
        </label>
      </p>
      <p class="form-area">
        <label>
          <div class="form-title form-required">件名</div>
          <input class="input" type="text" name="subject" required />
        </label>
      </p>
      <p class="form-area">
        <label>
          <div class="form-title form-required">本文</div>
          <textarea class="input" name="message" rows="8" required></textarea>
        </label>
      </p>
      <p class="form-area" align="center">
        <button class="button" type="submit">送信</button>
      </p>
    </form>
  </client-only>
</template>
<style lang="scss" scoped>
.form-area {
  padding: 24px;
}
.form-title {
  margin-left: 10%;
}
.form-required {
  &::after {
    content: "*";
    color: $my-red;
  }
}
.input {
  padding: 0.5em 0.5em;
  font-size: 100%;
  border: 1px solid $my-black;
  border-radius: 4px;
  outline: none;
  width: 80%;
  margin-left: 10%;
  &:focus {
    border-color: $my-red;
  }
}
textarea {
  resize: none;
}
.button {
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 4px;
  border-radius: 4px;
  padding: 0 14 * 1.5px;
  background-color: $my-gray;
  color: #ffffff;
  &:hover {
    background-color: rgb(131, 128, 128);
  }
}
</style>