import type { Post } from "../../types";
import { Layout } from "../layouts";
import { Card, PostTitle } from "../atoms";
import Head from "next/head";

type Props = {
  posts: Post[];
  year: string;
};

export const YearlyArchivesPage = ({ posts, year }: Props) => {
  const pageTitle = `${year}年に公開された${posts.length}件の記事`;
  const seoTitle = `${pageTitle} - ${process.env.siteTitle}`;

  return (
    <Layout>
      <Head>
        <title>{seoTitle}</title>
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={process.env.siteDescription} />
        <meta
          property="og:image"
          content={`${process.env.siteUrl}/icon.webp`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@9sako6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostTitle title={pageTitle} />
      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        posts.map((post) => (
          <Card
            key={post.sys.id}
            slug={post.slug || ""}
            title={post.title || ""}
            description={post.description || ""}
            createdAt={post.sys.firstPublishedAt}
            imageUrl={post.eyeCatchImage?.url || undefined}
          />
        ))
      )}
    </Layout>
  );
};
