import { defaultOpenGraph, defaultTwitter } from "@/app/sharedMetadata";
import { TagPage } from "@/components/templates/TagPage";
import { allPosts } from "@/lib/all-posts";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  const tags = Array.from(
    new Set((await allPosts({ draft: false })).flatMap((post) => post.topics))
  ).sort();

  return tags.map((tag) => ({ tag }));
};

type Params = {
  params: { tag: string };
};

export function generateMetadata({ params }: Params): Metadata {
  const { tag } = params;

  const pageTitle = `${decodeURIComponent(tag)} - ${process.env.siteTitle}`;

  return {
    ...defaultOpenGraph,
    openGraph: {
      ...defaultOpenGraph,
      title: pageTitle,
    },
    twitter: {
      ...defaultTwitter,
      title: pageTitle,
    },
    title: pageTitle,
  };
}

const Tag = async ({ params }: Params) => {
  const tag = decodeURI(params.tag);
  const posts = (await allPosts({ draft: false })).filter((post) =>
    post.topics.includes(decodeURI(tag))
  );
  return <TagPage posts={posts} tag={tag} />;
};

export default Tag;
