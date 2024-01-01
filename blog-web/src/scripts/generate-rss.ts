import { generateDescription } from "@/lib/generate-description";
import { getAllPosts } from "@/lib/get-all-posts";
import { getPost } from "@/lib/get-post";
import { OG_IMAGE_PATH } from "@/lib/path";
import { Feed } from "feed";
import { writeFile } from "fs/promises";

async function main() {
  const blogUrl = process.env.BLOG_URL;

  if (!blogUrl) {
    throw new Error("Missing env var: process.env.BLOG_URL");
  }
  const postMetadatas = await getAllPosts({ draft: false });
  const posts = await Promise.all(
    postMetadatas.map(async (post) => await getPost(post)),
  );

  const feed = new Feed({
    title: "腐ったコロッケ",
    description: "Webアプリケーション開発者くさころの技術ブログ。",
    id: blogUrl,
    link: blogUrl,
    language: "ja",
    image: `${blogUrl}/icon.nine.webp`,
    favicon: `${blogUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, 9sako6`,
    feedLinks: {
      rss2: `${blogUrl}/rss.xml`,
    },
  });

  posts.forEach((post) => {
    const url = `${blogUrl}/posts/${post.slug}`;
    const imageUrl = new URL(OG_IMAGE_PATH({ slug: post.slug }), blogUrl).href;
    const description =
      post.description || generateDescription({ htmlString: post.bodyHtml });
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description,
      content: description,
      date: new Date(post.date),
      image: imageUrl,
    });
  });

  feed.addCategory("Technology");

  await writeFile("./public/rss.xml", feed.rss2());

  console.log("RSS generated");
}

main();
