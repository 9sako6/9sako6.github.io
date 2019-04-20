const contentful = require('contentful')
import { contentfulBlogPost, contentfulItems, contentfulBlogPostFields, contentfulTagFields } from "~/types/contentful"

export async function fetchRoutes() {
  const config = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  }
  const client = contentful.createClient(config)

  let routes: string[] = [];
  await client.getEntries({
    content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    order: "-sys.createdAt",
    include: 1
  }).then((res: contentfulBlogPost) => {
    let totalPostsCount = 0;
    res.items.map((item: contentfulItems) => {
      const fields: contentfulBlogPostFields = item.fields
      // add post page (e.g.: /post/nikki20200207)
      routes.push(`/posts/${fields.slug}`)
      totalPostsCount++
      if (fields.tags) {
        fields.tags.map((tag: contentfulTagFields) => {
          if (tag.hasOwnProperty("fields") && tag.fields.hasOwnProperty("slug")) {
            // add tag page (e.g.: /tag/programming)
            routes.push(`/tag/${tag.fields.slug}`)
          }
        })
      }
    })
    const oldestPageNum = Math.ceil(totalPostsCount / 5); // TODO Fix
    Array.from(Array(oldestPageNum).keys(), x => x + 1).map(pageNum => {
      // add page of pagenation (e.g.: /blog/page/2)
      routes.push(`/page/${pageNum}`)
    })
  }).catch(console.error)

  // /about
  routes.push("/about")
  // /policy
  routes.push("/policy")
  // /contact
  routes.push("/contact")
  routes = Array.from(new Set<string>(routes))
  return routes
}
