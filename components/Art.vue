<template>
  <section>
    <h1>{{ title }}</h1>
    <div class="content">
      <p>{{ description }}</p>
      <nuxt-link class="link button" :to="link">Read more</nuxt-link>
    </div>
    <div class="img">
      <img
        :src="images[link.split('/').slice(-1)[0]]"
      />
    </div>
  </section>
</template>
<script>
import eleph from '~/assets/img/eleph.jpg'
import bird from '~/assets/img/bird.jpg'
import ox from '~/assets/img/ox.jpg'

const images = {
  blog: ox,
  competitive_prog: eleph,
  tech_blog: bird
}

export default {
  data(){
    return {
      images: images
    }
  },
  props: {
    link: { type: String, default: '' },
    // imglink: { type: String, default: '~assets/img/eleph.jpg' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  // data() {
  //   return {
  //     src: require(this.imglink)
  //   }
  // }
}
</script>

<style scoped>
section {
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 2fr 2fr 0.5fr 5fr;
  grid-template-areas: ". . . title" "img img . content" "img img . .";
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 100px;
}
section::after {
  content: "";
  grid-column: 2/-1;
  grid-row: 1/3;
  position: relative;
  z-index: -1;
  background: #fff;
  box-shadow: 0 0.2em 1em rgba(61, 48, 41, 0.2);
}
h1 {
  grid-area: title;
  padding-top: 3rem;
  padding-left: 3rem;
}
.content {
  grid-area: content;
  padding-bottom: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
}
.img {
  grid-area: img;
}

h1 {
  font-size: 3em;
  margin: 0 0 1rem;
  font-family: serif;
  position: relative;
}
h1::after {
  content: "";
  position: absolute;
  width: 3rem;
  background-color: #ccc;
  height: 2px;
  left: 3rem;
  top: 3rem;
}
.content {
  color: #4d4d4d;
  margin-bottom: 0;
}
p {
  margin-top: 0;
  margin-bottom: 3rem;
  line-height: 1.5;
}
.link {
  text-decoration: none;
  border: 2px solid #b3b3b3;
  padding: 1em 2em;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: inherit;
  display: inline-block;
  background-color: #fff;
}
.img {
  position: relative;
}
img {
  max-width: 100%;
  vertical-align: middle;
  box-shadow: 0 0.2em 1.2em rgba(61, 48, 41, 0.1);
}
/* https://www.nxworld.net/tips/css-button-hover-border-effects.html */
.button {
  position: relative;
  display: inline-block;
  padding: 0.9em 3.6em;
  /* color: #fff; */
  cursor: pointer;
  /* text-align: center; */
  text-decoration: none;
  outline: none;
  transition: all 0.3s;
}
.button::before,
.button::after {
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: 2;
  content: "";
  transition: all 0.3s;
}
.button::before {
  border-top: 2px solid #e65a5a;
  border-bottom: 2px solid #e65a5a;
  transform: scale(0, 1);
}
.button::after {
  border-right: 2px solid #e65a5a;
  border-left: 2px solid #e65a5a;
  transform: scale(1, 0);
}
.button:hover {
  color: #e65a5a;
}
.button:hover::after,
.button:hover::before {
  transform: scale(1);
}
</style>
