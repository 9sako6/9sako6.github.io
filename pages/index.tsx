import type { NextPage, GetStaticProps } from "next";
import { allPostsSync } from "@/lib/all-posts";
import { TopPage, Props } from "@/components/templates";
import externalPostUrls from "@/data/external_posts.json";

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = allPostsSync({ draft: process.env.NODE_ENV === "development" });

  return {
    props: { posts, externalPostUrls },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return <TopPage posts={posts} externalPostUrls={externalPostUrls} />;
};

export default Home;
