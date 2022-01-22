import type { NextPage } from "next";
import { client } from "../lib/client";
import {
  EnumPostsQuery,
  EnumPostsDocument,
} from "../graphql/queries/enumPosts.generated";
import type { Post } from "../types";
import type { GetStaticProps } from "next";
import { TopPage } from "../components/templates";

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const result = await client.query<EnumPostsQuery>({
    query: EnumPostsDocument,
  });

  if (result.loading || !result?.data?.blogPostCollection?.items) {
    return {
      props: { posts: [] as Post[] },
    };
  }
  const posts: Post[] = result.data.blogPostCollection.items.filter(
    (post): post is Post => post !== null && post !== undefined
  );

  return {
    props: { posts },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return <TopPage posts={posts} />;
};

export default Home;
