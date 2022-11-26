import Head from "next/head";
import { Card } from "../atoms";
import { Layout } from "../layouts";
import type { Metadata } from "@/types";
import { getCategorizedPosts } from "@/lib/get-categorized-posts";

export type Post = Metadata & { slug: string };

type Props = {
  posts: Post[];
};

export const TopPage = ({ posts }: Props): JSX.Element => {
  const categorizedPosts = getCategorizedPosts(posts);

  return (
    <Layout>
      <Head>
        <title>{process.env.siteTitle}</title>
        <meta name="description" content={process.env.siteDescription} />
        <meta property="og:title" content={process.env.siteTitle} />
        <meta property="og:description" content={process.env.siteDescription} />
        <meta
          property="og:image"
          content={`${process.env.siteUrl}/icon.webp`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@9sako6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        categorizedPosts.map((categoryAndPosts) => {
          const [category, posts] = categoryAndPosts;

          return (
            <div key={category}>
              <h1
                className="pt-10 pb-10 mb-10 font-mono text-2xl"
                id={category}
              >
                <a href={`#${category}`}>{category}</a>
              </h1>
              {posts.map(
                ({ slug, title, description, date, eyecatch, topics }) => (
                  <Card
                    key={slug}
                    slug={slug || ""}
                    title={title || ""}
                    description={description}
                    createdAt={date}
                    imageUrl={eyecatch}
                    tags={topics}
                  />
                )
              )}
            </div>
          );
        })
      )}
    </Layout>
  );
};
