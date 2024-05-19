import { PostMetadata } from "@/models/post";
import dayjs from "dayjs";
import { readdir } from "fs/promises";
import { getMarkdownObject } from "./get-markdown-object";

export async function getAllPosts({
  draft,
}: {
  draft: boolean;
}): Promise<PostMetadata[]> {
  const files = await readdir("posts");
  const posts = await Promise.all(
    files.map(async (fileName) => {
      const post = await getMarkdownObject({ filePath: `posts/${fileName}` });

      if (post.data.published || draft) {
        return {
          slug: fileName.replace(/\.md/, ""),
          title: post.data.title,
          description: post.data.description,
          date: post.data.date,
          topics: post.data.topics,
          category: post.data.category,
          published: post.data.published,
          ...(post.data.eyecatch ? { eyecatch: post.data.eyecatch } : {}),
        };
      }
    }),
  );

  return posts
    .filter<PostMetadata>(
      (post): post is PostMetadata => typeof post !== "undefined",
    )
    .sort(
      (a: PostMetadata, b: PostMetadata) =>
        dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
    );
}
