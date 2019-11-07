import pkg from './package'
/*
 ** make routes to generate static pages of dynamic routing
 */

import { sourceFileArray, fileMap } from './contents/posts/summary.json'

const routes = []

sourceFileArray.reverse().forEach(markdownName => {
  const baseName = markdownName.replace(/^.*[/]/, '').replace(/\.md$/, '')
  const link = `contents/posts/${baseName}.json`
  if (!fileMap[link].draft) {
    routes.push(link)
  }
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
