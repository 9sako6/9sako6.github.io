import type { NextPage, GetStaticProps } from "next";
import { allPostsSync } from "@/lib/all-posts";
import { TopPage } from "@/components/templates";
import type { Post } from "@/components/templates/TopPage";

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = allPostsSync({ draft: process.env.NODE_ENV === "development" });

  return {
    props: { posts },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return <TopPage posts={posts} />;
};

export default Home;
