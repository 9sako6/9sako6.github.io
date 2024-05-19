---
title: "レスポンシブUI"
description: ""
topics: ["CSS"]
category: "Random"
published: false
eyecatch: ""
date: "2023-08-09T21:42:47.567+09:00"
---

# サイドバー

## Grid

```html
<div class="container">
  <aside class="sidebar">
    Sidebar
  </aside>
  <article class="contents">
    Contents
  </article>
</div>
```

```css
.container {
  height: 100dvh;
  display: grid;
  grid-template-areas: "sidebar contents";
  grid-template-columns: 400px 1fr;
}

.sidebar {
  grid-area: sidebar;
  background-color: #323232;
  color: white;
}

.contents {
  grid-area: contents;
  background-color: #eeeeee;
}

@media (max-width: 1080px) {
  .container {
    grid-template-areas:
      "contents"
      "sidebar";
    grid-template-columns: auto;
  }
}
```

子要素に `grid-area` を指定しなければならない。

https://codepen.io/9sako6-the-encoder/pen/PoxvjOG
