import { defaultOpenGraph, defaultTwitter } from "@/app/sharedMetadata";
import { PostPage as PostPageTemplate } from "@/components/templates";
import { allPosts } from "@/lib/all-posts";
import markdownToHtml from "zenn-markdown-html";
import type { Metadata, Post } from "@/types";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { Metadata as NextMetadata } from "next";
import Script from "next/script";
import "zenn-content-css";

export type Props = Post & {
  bodyHtml: string;
  url: string;
};

export const generateStaticParams = async () => {
  const posts = await allPosts({
    draft: process.env.NODE_ENV === "development",
  });
  return posts.map((post) => ({ slug: post.slug }));
};

type MetaProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<NextMetadata> {
  const { slug } = params;

  const props = await getPost(slug);
  const imageUrl = props.eyecatch
    ? new URL(props.eyecatch, process.env.siteUrl).href
    : new URL("/icon.nine.webp", process.env.siteUrl).href;

  return {
    title: props.title,
    description: props.description,
    openGraph: {
      ...defaultOpenGraph,
      title: props.title,
      description: props.description,
      url: props.url,
      images: [imageUrl],
    },
    twitter: {
      ...defaultTwitter,
      title: props.title,
      description: props.description,
      images: [imageUrl],
    },
  };
}

const getPost = async (slug: string) => {
  const postPath = `posts/${slug}.md`;

  const file = readFileSync(postPath, "utf-8");
  const matterResult = matter(file);
  const metadata = matterResult.data as Metadata;

  const bodyHtml = markdownToHtml(matterResult.content || "", {
    embedOrigin: "https://embed.zenn.studio",
  });
  const url = `${process.env.siteUrl}/posts/${slug}`;

  return {
    slug,
    bodyHtml,
    url,
    ...metadata,
  };
};

type Params = {
  params: { slug: string };
};

const PostPage = async ({ params }: Params) => {
  const { slug } = params;
  const props = await getPost(slug);

  return (
    <>
      <Script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      <PostPageTemplate {...props} />
    </>
  );
};

export default PostPage;
