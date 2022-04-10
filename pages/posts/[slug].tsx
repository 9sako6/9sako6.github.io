import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { allPostsSync } from "@/lib/all-posts";
import { markdownToHtml } from "@/lib/markdown-html";
import { PostPage } from "@/components/templates";

type Props = Post & {
  bodyHtml: string;
};

type Params = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = allPostsSync({ draft: false }).map((post) => ({
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

  const file = readFileSync(`articles/${params.slug}.md`, "utf-8");
  const matterResult = matter(file);
  const metadata = matterResult.data as Metadata;

  const bodyHtml = await markdownToHtml(matterResult.content || "");

  return {
    props: {
      slug: params.slug,
      bodyHtml,
      ...metadata,
    },
  };
};

const Post: NextPage<Props> = (props) => {
  const url = `${process.env.siteUrl}/posts/${props.slug}`;
  return <PostPage {...props} url={url} />;
};

export default Post;
