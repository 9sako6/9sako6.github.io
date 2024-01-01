import { getAllPosts } from "@/lib/get-all-posts";
import { Feed } from "feed";
import { writeFile } from "fs/promises";

async function main() {
  const blogUrl = process.env.BLOG_URL;

  if (!blogUrl) {
    throw new Error("Missing env var: process.env.BLOG_URL");
  }
  const posts = await getAllPosts({ draft: false });

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
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.description,
      date: new Date(post.date),
    });
  });

  feed.addCategory("Technology");

  await writeFile("./public/rss.xml", feed.rss2());

  console.log("RSS generated");
}

main();
