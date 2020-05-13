import {
  fetchRoutes
} from './plugins/router'

require('dotenv').config();

const siteTitle = '腐ったコロッケ'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    titleTemplate: '%s | ' + siteTitle,
    title: siteTitle || '',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: siteTitle || ''
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website'
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: process.env.APP_URL || ''
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: siteTitle || ''
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: process.env.npm_package_description || ''
    },
    ],
    script: [
      { src: 'https://platform.twitter.com/widgets.js', async: true }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
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
  css: [
    {
      src: '~/node_modules/highlight.js/styles/atom-one-dark.css',
      lang: 'css'
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/markdownit.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
    ['@nuxtjs/google-analytics', {
      id: process.env.GOOGLE_ANALYTICS_ID
    }],
    '@nuxt/typescript-build',
    '~/modules/global-components/',
    '~/modules/purgecss-whitelist',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@/modules/hook',
    '@nuxtjs/markdownit',
  ],
  router: {
    middleware: [
      'getContentful'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config: any, ctx: any) { }
  },
  /**
   * Generate configuration
   */
  generate: {
    fallback: true,
    subFolders: false,
    routes() {
      return fetchRoutes().then((routes) => {
        return routes
      })
    }
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    TWITTER_USER: process.env.TWITTER_USER,
  },
  styleResources: {
    scss: [
      '~/assets/scss/colors.scss',
      '~/assets/scss/media-query.scss',
      '~/assets/scss/size.scss',
    ]
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    routes: async () => {
      return fetchRoutes().then((routes) => {
        return routes
      })
    }
  }
}
