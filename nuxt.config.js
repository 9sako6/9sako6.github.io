import pkg from './package'

// TODO fix
import { categories } from './site.config.json'
import SummaryBlog from './contents/posts/blog/summary.json'
import SummaryCompetitiveProgramming from './contents/posts/competitive_programming/summary.json'
import SummaryTechBlog from './contents/posts/tech_blog/summary.json'
/*
 ** make routes to generate static pages of dynamic routing
 */
const routes = []

const Summary = {
  blog: SummaryBlog,
  competitive_programming: SummaryCompetitiveProgramming,
  tech_blog: SummaryTechBlog
}

categories.forEach(category => {
  console.log(category)
  Summary[category].sourceFileArray.reverse().forEach(markdownName => {
    const baseName = markdownName.replace(/^.*[/]/, '').replace(/\.md$/, '')
    const link = `contents/posts/${category}/${baseName}.json`
    if (!Summary[category].fileMap[link].draft) {
      routes.push(link)
    }
  })
})

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: '9sako6 Garden',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:site',
        content: '@9sako6'
      },
      {
        name: 'twitter:image',
        content: './static/icon.png'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/tomorrow-night-bright.min.css'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [['@nuxtjs/pwa'], ['@nuxtjs/sitemap']],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
   ** sitemap configuration
   */
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://9sako6.me',
    exclude: ['/policy'],
    routes: routes
  },

  generate: {
    routes: routes
  }
}
