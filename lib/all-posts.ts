import { readdirSync, readFileSync } from "fs";
import dayjs from "dayjs";
import matter from "gray-matter";

export function allPostsSync({ draft }: { draft: boolean }): Post[] {
  return readdirSync("articles")
    .map((fileName) => {
      const file = readFileSync(`articles/${fileName}`, "utf-8");
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
      (a: Post, b: Post) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
    );
}
