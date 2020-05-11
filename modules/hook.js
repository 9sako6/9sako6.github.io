module.exports = function () {
  this.nuxt.hook('build:extendRoutes', (routes) => {
    const blogPages = {
      path: '/',
      component: 'pages/page/_id.vue',
      name: 'blog-page-id'
    }
    routes.unshift(blogPages)
  })
}
