import type { Metadata, Post } from "@/types";
import dayjs from "dayjs";
import { readFileSync } from "fs";
import { readdir } from "fs/promises";
import matter from "gray-matter";

export async function allPosts({ draft }: { draft: boolean }) {
  const files = await readdir("posts");
  return files
    .map((fileName) => {
      const file = readFileSync(`posts/${fileName}`, "utf-8");
      const metadata = matter(file).data as Metadata;

      if (metadata.published || draft) {
        return {
          slug: fileName.replace(/\.md/, ""),
          ...metadata,
        };
      }
    })
    .filter<Post>((post): post is Post => typeof post !== "undefined")
    .sort(
      (a: Post, b: Post) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
    );
}
