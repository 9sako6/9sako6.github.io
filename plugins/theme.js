import Vue from 'vue';
import { parse, serialize } from 'cookie';

export default function (context, inject) {
  const theme = Vue.observable({
    value: (process.client && !process.static ? window.__nuxt_theme : 'dark')
  });
  theme.keyName = '9sako6-blog:mode';
  const setTheme = (value) => {
    theme.value = value;
    if (process.client) {
      document.cookie = serialize(theme.keyName, value);
      localStorage.setItem(theme.keyName, value);
    }
  };
  theme.set = setTheme;

  // if (process.server && context.req) {
  //   const cookieExist = context.req.headers.cookie;
  //   if (cookieExist) {
  //     const cookies = parse(context.req.headers.cookie);
  //     if (cookies['mode'] && cookies['mode'] !== theme.value) {
  //       theme.value = cookies['mode'];
  //     }
  //   }
  // }

  // if (process.static && process.client) {
  //   window.onNuxtReady(() => theme.value = window.__nuxt_theme || 'dark')
  // }

  inject('theme', theme);
}
