<template>
  <form id="post-form">
    <div id="preview">
      <div v-html="compiledMarkdown"></div>
    </div>
  </form>
</template>
<script>
import marked from "marked"
import hljs from "highlight.js"

// import md from '../assets/post/hoge.md'

export default {
  name: "postForm",
  created: function() {
    marked.setOptions({
      langPrefix: "",
      highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value
      }
    });
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.markdownText)
    }
  },
  data: function() {
    return {
      markdownText: '# hogehoge\n- a\n- b\n ## hogehogehoge'
    };
  }
};
</script>