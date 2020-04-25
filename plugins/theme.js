import Vue from 'vue';

export default (_, inject) => {
  const theme = Vue.observable({
    value: 'light'
  });
  const setTheme = (value, { persist = true } = {}) => {
    theme.value = value
    if (process.client) {
      // update cookie
      // if (persist) {
      //   document.cookie = serialize(key, value, cookieOptions)
      // }
      // Force data-theme update
      document.documentElement.setAttribute('data-theme', theme.value)
    }
  }
  theme.set = setTheme
  inject('theme', theme);
}