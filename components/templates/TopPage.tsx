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
        <meta
          name="description"
          content="Webアプリケーション開発を専門とするエンジニアの技術ブログ"
        />
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
