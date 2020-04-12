import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTableOfContents from 'markdown-it-table-of-contents'
import markdownItKatex from 'markdown-it-katex'
import "~/node_modules/katex/dist/katex.min.css"

import highlight from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import ruby from "highlight.js/lib/languages/ruby";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import cpp from "highlight.js/lib/languages/cpp";
import xml from "highlight.js/lib/languages/xml";
import plaintext from "highlight.js/lib/languages/plaintext";

highlight.registerLanguage("javascript", javascript);
highlight.registerLanguage("css", css);
highlight.registerLanguage("cpp", cpp);
highlight.registerLanguage("bash", bash);
highlight.registerLanguage("xml", xml);
highlight.registerLanguage("ruby", ruby);
highlight.registerLanguage("plaintext", plaintext);

export default ({ app }, inject) => {

  const md = new MarkdownIt({
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    use: [
      'markdown-it-toc', // 目次を作るためのライブラリ。別途インストールが必要
      "markdown-it-katex",
    ],
    highlight: (str, lang) => {
      // const hljs = require('highlight.js');
      const hljs = highlight;
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) { }
      }
      // 言語設定がない場合、プレーンテキストとして表示する
      return '<pre class="hljs"><code>' + hljs.highlight('plaintext', str, true).value + '</code></pre>';
    },
  })

  md.use(markdownItAnchor)
  md.use(markdownItTableOfContents)
  md.use(markdownItKatex)
  inject('md', md)
}