import markdownToHtml from "zenn-markdown-html";
import { getMarkdownObject } from "./get-markdown-object";
import { Post } from "@/models/post";

type Params = {
  slug: string;
};

export const getPost = async ({ slug }: Params): Promise<Post> => {
  const post = await getMarkdownObject({ filePath: `posts/${slug}.md` });

  const bodyHtml = markdownToHtml(post.content || "", {
    embedOrigin: "https://embed.zenn.studio",
  });
  const url = `${process.env.siteUrl}/posts/${slug}`;

  return {
    slug,
    bodyHtml,
    url,
    ...post.data,
  };
};
