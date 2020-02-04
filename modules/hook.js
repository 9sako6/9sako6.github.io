module.exports = function() {
  this.nuxt.hook('build:extendRoutes', routes => {
    const blogPages = {
      path: '/:domain',
      component: 'pages/_domain/page/_id.vue',
      name: 'blog-page-id'
    }
    routes.unshift(blogPages)
  })
 }
