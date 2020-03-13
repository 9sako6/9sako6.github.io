<template>
  <client-only>
    <form name="contact" method="POST" data-netlify="true">
      <p>
        <label>
          Your Name:
          <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Your Email:
          <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Subject:
          <input type="text" name="subject" />
        </label>
      </p>
      <p>
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </client-only>
</template>
<style lang="scss" scoped>
.form-area {
  width: 90%;
  margin: 1em auto;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 24px;
}
.form-title {
  //   display: block;
  //   width: 100%;
}
.input {
  width: 80%;
  margin-left: 10%;
}
textarea {
  resize: vertical;
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
}
</style>