const contentful = require('contentful')

export async function fetchRoutes() {
  const config = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  }
  const client = contentful.createClient(config)

  let routes = [];
  await client.getEntries({
    content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    order: "-sys.createdAt",
    include: 1
  }).then(res => {
    const categoryCount = {}
    res.items.map(item => {
      const category = item.fields.category.fields.slug
      // add category page
      // e.g.: /blog
      routes.push(`/${category}`)
      if (categoryCount[category] === undefined) {
        categoryCount[category] = 0
      }
      categoryCount[category]++
      // add post page
      // e.g.: /blog/nikki20200207
      routes.push(`/${category}/${item.fields.slug}`)
      if (item.fields.tags) {
        item.fields.tags.map(tag => {
          // add tag page
          // e.g.: /blog/tag/programming
          routes.push(`/${category}/tag/${tag.fields.slug}`)
        })
      }
    })
    Object.keys(categoryCount).map(category => {
      const oldestPageNum = Math.ceil(categoryCount[category] / 10);
      Array.from(Array(oldestPageNum).keys(), x => x + 1).map(pageNum => {
        // add page of pagenation
        // e.g.: /blog/page/2
        routes.push(`/${category}/page/${pageNum}`)
      })
    })
  }).catch(console.error)
  console.log(routes)
  return routes
}



// import axios from 'axios'
// export async function fetchRoutes(entrypoint) {
//   const data = await axios.get(
//     `${process.env.MICROCMS_BASE_URL}${entrypoint}?fields=id&limit=1000`, {
//       headers: {
//         'X-API-KEY': process.env.MICROCMS_X_API_KEY
//       }
//     }
//   )
//   const routes = data.data.contents.map((content) => {
//     return `${entrypoint}/${content.id}`
//   })
//   return routes
// }

// export async function fetchPageRoutes(entrypoint) {
//   // get the number of total articles
//   const data = await axios.get(
//     `${process.env.MICROCMS_BASE_URL}${entrypoint}?fields=id&limit=1000`, {
//       headers: {
//         'X-API-KEY': process.env.MICROCMS_X_API_KEY
//       }
//     }
//   )
//   const totalCount = parseInt(data.data.totalCount);
//   const oldestPageNum = Math.ceil(totalCount / 10);
//   const pages = Array.from(Array(oldestPageNum).keys(), x => x + 1);
//   const routes = pages.map(num => `${entrypoint}/page/${num}`)
//   return routes
// }

// export async function fetchTagRoutes(entrypoint) {
//   const data = await axios.get(
//     `${process.env.MICROCMS_BASE_URL}${entrypoint}?fields=tags&limit=1000`, {
//       headers: {
//         'X-API-KEY': process.env.MICROCMS_X_API_KEY
//       }
//     }
//   )
//   const tags = new Set()
//   data.data.contents.map((content) => {
//     if (content.tags !== undefined) {
//       const tagsList = content.tags.split(':')
//       tagsList.map((tag) => tags.add(tag))
//     }
//   })
//   const routes = Array.from(tags, tag => `${entrypoint}/tag/${encodeURIComponent(tag)}`)
//   return routes
// }

// export async function fetchAllRoutes() {
//   const entrypoints = process.env.MICROCMS_ENTRYPOINTS.split(':')
//   let routes = await Promise.all(entrypoints.map(async entrypoint => {
//     const articles = await fetchRoutes(entrypoint)
//     const pages = await fetchPageRoutes(entrypoint)
//     const tags = await fetchTagRoutes(entrypoint)
//     return [...articles, ...pages, ...tags]
//   }))
//   // to flat single level array
//   routes = routes.reduce((acc, val) => acc.concat(val), []);
//   console.log(routes)
//   return routes
// }
