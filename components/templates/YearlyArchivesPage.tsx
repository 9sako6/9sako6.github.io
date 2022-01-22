import type { Post } from "../../types";
import { Layout } from "../layouts";
import { Card, PostTitle } from "../atoms";

type Props = {
  posts: Post[];
  year: string;
};

export const YearlyArchivesPage = ({ posts, year }: Props) => {
  return (
    <Layout>
      <PostTitle title={`${year}年に公開された記事 ... ${posts.length}件`} />
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
