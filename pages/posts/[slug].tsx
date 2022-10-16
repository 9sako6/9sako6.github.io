import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { allPostsSync } from "@/lib/all-posts";
import { markdownToHtml } from "@/lib/markdown-html";
import { commitHistory, Commit } from "@/lib/update-history";
import { withOgpCard } from "@/lib/with-ogp-card";
import { PostPage } from "@/components/templates";

export type Props = Post & {
  bodyHtml: string;
  url: string;
  commitHistory: Commit[];
};

type Params = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = allPostsSync({
    draft: process.env.NODE_ENV === "development",
  }).map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { props: {} as Props };

  const postPath = `posts/${params.slug}.md`;

  const file = readFileSync(postPath, "utf-8");
  const matterResult = matter(file);
  const metadata = matterResult.data as Metadata;

  const bodyHtml = await withOgpCard(
    await markdownToHtml(matterResult.content || "")
  );
  const url = `${process.env.siteUrl}/posts/${params.slug}`;

  return {
    props: {
      slug: params.slug,
      bodyHtml,
      url,
      commitHistory: commitHistory(postPath),
      ...metadata,
    },
  };
};

const Post: NextPage<Props> = (props) => {
  return <PostPage {...props} />;
};

export default Post;
