const katexSelectorsList = require('./katex.js');

export default function () {
  const { options } = this.nuxt;

  options.purgeCSS = {
    whitelistPatterns: [
      /hljs.*/
    ],
    whitelist: [
      ...katexSelectorsList(),
      'ol',
      'blockquote',
      'table-of-contents'
    ]
  };
}
