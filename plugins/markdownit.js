// plugins/markdownit.js
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTableOfContents from 'markdown-it-table-of-contents'
export default ({ app }, inject) => {

    const md = new MarkdownIt({
        injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
        breaks: true, // 改行コードを<br>に変換する
        html: true, // HTML タグを有効にする
        linkify: true, // URLに似たテキストをリンクに自動変換する
        typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
        use: [
          'markdown-it-toc' // 目次を作るためのライブラリ。別途インストールが必要
        ],
        highlight: (str, lang) => {
          const hljs = require('highlight.js');
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                hljs.highlight(lang, str, true).value +
                '</code></pre>';
            } catch (__) {}
          }
          // 言語設定がない場合、プレーンテキストとして表示する
          return '<pre class="hljs"><code>' + hljs.highlight('plaintext', str, true).value + '</code></pre>';
        },
      })

    md.use(markdownItAnchor) 
    md.use(markdownItTableOfContents) 
   inject('md', md)
}