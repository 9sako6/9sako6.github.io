import Head from "next/head";
import { Card } from "../atoms";
import { Layout } from "../layouts";

export type Post = Metadata & { slug: string };

type Props = {
  posts: Post[];
};

export const TopPage = ({ posts }: Props): JSX.Element => {
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
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@9sako6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        posts.map(({ slug, title, description, date, eyecatch }) => (
          <Card
            key={slug}
            slug={slug || ""}
            title={title || ""}
            description={description}
            createdAt={date}
            imageUrl={eyecatch}
          />
        ))
      )}
    </Layout>
  );
};
