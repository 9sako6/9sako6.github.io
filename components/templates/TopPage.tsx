import Head from "next/head";
import type { Post } from "../../types";
import { Card } from "../atoms";
import { Layout } from "../layouts";

type Props = {
  posts: Post[];
};

export const TopPage = ({ posts }: Props): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>{process.env.siteTitle}</title>
        <meta property="og:title" content={process.env.siteTitle} />
        <meta property="og:description" content={process.env.siteDescription} />
        <meta property="og:image" content="/icon.webp" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@9sako6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
