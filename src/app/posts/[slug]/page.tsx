import { defaultOpenGraph, defaultTwitter } from "@/app/sharedMetadata";
import { PostPage as PostPageTemplate } from "@/components/templates";
import { allPosts } from "@/lib/all-posts";
import { markdownToHtml } from "@/lib/markdown-html";
import { Commit, commitHistory } from "@/lib/update-history";
import type { Metadata, Post } from "@/types";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { Metadata as NextMetadata } from "next";

export type Props = Post & {
  bodyHtml: string;
  url: string;
  commitHistory: Commit[];
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
  const pageTitle = `${props.title} - ${process.env.siteTitle}`;
  const imageUrl = props.eyecatch
    ? new URL(props.eyecatch, process.env.siteUrl).href
    : new URL("/icon.webp", process.env.siteUrl).href;

  return {
    title: pageTitle,
    description: props.description,
    openGraph: {
      ...defaultOpenGraph,
      url: props.url,
      images: [imageUrl],
    },
    twitter: {
      ...defaultTwitter,
      title: pageTitle,
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

  // TODO: fix for app router
  // const bodyHtml = await withOgpCard(
  //   await markdownToHtml(matterResult.content || "")
  // );
  const bodyHtml = await markdownToHtml(matterResult.content || "");
  const url = `${process.env.siteUrl}/posts/${slug}`;

  return {
    slug,
    bodyHtml,
    url,
    commitHistory: commitHistory(postPath),
    ...metadata,
  };
};

type Params = {
  params: { slug: string };
};

const PostPage = async ({ params }: Params) => {
  const { slug } = params;
  const props = await getPost(slug);

  return <PostPageTemplate {...props} />;
};

export default PostPage;
