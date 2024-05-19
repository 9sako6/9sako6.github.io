import { defaultOpenGraph, defaultTwitter } from "@/app/sharedMetadata";
import { PostsList } from "@/components/features/post/PostsList";
import { PageTitle } from "@/components/ui/PageTitle";
import { getAllPosts } from "@/lib/get-all-posts";
import { getAllTags } from "@/lib/get-all-tags";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  const tags = await getAllTags({
    draft: process.env.NODE_ENV === "development",
  });

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
  const tag = decodeURIComponent(params.tag);
  const posts = (
    await getAllPosts({ draft: process.env.NODE_ENV === "development" })
  ).filter((post) => post.topics.includes(tag));

  return (
    <div>
      <div className="pb-16">
        <PageTitle>{`#${tag}`}</PageTitle>
      </div>
      <PostsList
        posts={posts.map((post) => ({ ...post, tags: post.topics }))}
      />
    </div>
  );
};

export default Tag;
