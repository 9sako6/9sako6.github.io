import Head from "next/head";
import { Card, PostTitle } from "../atoms";
import { Layout } from "../layouts";

export type Props = {
  posts: Post[];
  tag: string;
};

export const TagPage = ({ posts, tag }: Props): JSX.Element => {
  const pageTitle = `${tag} - ${process.env.siteTitle}`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={process.env.siteDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={process.env.siteDescription} />
        <meta
          property="og:image"
          content={`${process.env.siteUrl}/icon.webp`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@9sako6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostTitle title={tag} />
      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        posts.map(({ slug, title, description, date, eyecatch, topics }) => (
          <Card
            key={slug}
            slug={slug || ""}
            title={title || ""}
            description={description}
            createdAt={date}
            imageUrl={eyecatch}
            tags={topics}
          />
        ))
      )}
    </Layout>
  );
};
