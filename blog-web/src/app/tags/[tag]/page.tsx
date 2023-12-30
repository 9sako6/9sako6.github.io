import { defaultOpenGraph, defaultTwitter } from "@/app/sharedMetadata";
import { Card } from "@/components/features/post/Card";
import { PageTitle } from "@/components/ui/PageTitle";
import { allPosts } from "@/lib/all-posts";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  const tags = Array.from(
    new Set((await allPosts({ draft: false })).flatMap((post) => post.topics)),
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
  const posts = (
    await allPosts({ draft: process.env.NODE_ENV === "development" })
  ).filter((post) => post.topics.includes(decodeURI(tag)));

  return (
    <div>
      <div className="pb-16">
        <PageTitle>{`#${tag}`}</PageTitle>
      </div>
      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        posts.map(({ slug, title, eyecatch, topics }) => (
          <Card
            key={slug}
            slug={slug}
            title={title}
            imageUrl={eyecatch}
            tags={topics}
          />
        ))
      )}
    </div>
  );
};

export default Tag;
