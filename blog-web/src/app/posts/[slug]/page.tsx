import { defaultOpenGraph, defaultTwitter } from "@/app/sharedMetadata";
import { Body } from "@/components/features/post/Body";
import { PostDate } from "@/components/features/post/PostDate";
import { TagsList } from "@/components/features/post/TagsList";
import { PageTitle } from "@/components/ui/PageTitle";
import { allPosts } from "@/lib/all-posts";
import type { Metadata, Post } from "@/types";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { Metadata as NextMetadata } from "next";
import Script from "next/script";
import "zenn-content-css";
import markdownToHtml from "zenn-markdown-html";

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
  const { title, topics, date, bodyHtml } = await getPost(slug);

  return (
    <div>
      <Script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      <div className="grid place-items-center gap-4 pt-8 pb-16">
        <PageTitle>{title}</PageTitle>

        <TagsList tags={topics} />
        <PostDate date={new Date(date)} />
      </div>

      <Body html={bodyHtml} />
    </div>
  );
};

export default PostPage;
