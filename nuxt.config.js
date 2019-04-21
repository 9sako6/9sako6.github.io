import pkg from './package'

/*
 ** make routes to generate static pages of dynamic routing
 */

import Summary from './contents/posts/summary.json'

const routes = []

Summary.sourceFileArray.reverse().forEach(markdownName => {
  const baseName = markdownName.match(/([^.]+)/)[0]
  const link = '/' + baseName.match(/contents\/(.+)/)[1].replace(/-/g, '/')
  routes.push(link)
})
console.log(routes)

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: '9sako6 Garden',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/tomorrow-night-bright.min.css' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

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
  modules: ['@nuxtjs/pwa'],

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

  generate: {
    routes: routes
  }
}
