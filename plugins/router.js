import axios from 'axios'
export async function fetchRoutes(entrypoint) {
  const data = await axios.get(
    `${process.env.MICROCMS_BASE_URL}${entrypoint}?fields=id&limit=1000`, {
      headers: {
        'X-API-KEY': process.env.MICROCMS_X_API_KEY
      }
    }
  )
  const routes = data.data.contents.map((content) => {
    return `${entrypoint}/${content.id}`
  })
  return routes
}

export async function fetchPageRoutes(entrypoint) {
  // get the number of total articles
  const data = await axios.get(
    `${process.env.MICROCMS_BASE_URL}${entrypoint}?fields=id`, {
      headers: {
        'X-API-KEY': process.env.MICROCMS_X_API_KEY
      }
    }
  )
  const totalCount = parseInt(data.data.totalCount);
  const oldestPageNum = Math.ceil(totalCount / 10);
  const pages = Array.from(Array(oldestPageNum).keys(), x => x + 1);
  const routes = pages.map(num => `${entrypoint}/page/${num}`)
  return routes
}

export async function fetchAllRoutes() {
  const entrypoints = process.env.MICROCMS_ENTRYPOINTS.split(':')
  let routes = await Promise.all(entrypoints.map(async entrypoint => {
    const articles = await fetchRoutes(entrypoint)
    const pages = await fetchPageRoutes(entrypoint)
    return [...articles, ...pages]
  }))
  // to flat single level array
  routes = routes.reduce((acc, val) => acc.concat(val), []);
  console.log(routes)
  return routes
}
