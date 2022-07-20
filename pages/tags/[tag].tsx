import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { allPostsSync } from "@/lib/all-posts";
import { TagPage, Props } from "@/components/templates/TagPage";

type Params = {
  tag: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = Array.from(
    new Set(allPostsSync({ draft: false }).flatMap((post) => post.topics))
  ).sort();
  const paths = tags.map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { props: {} as Props };

  const { tag } = params;
  const posts = allPostsSync({ draft: false }).filter((post) =>
    post.topics.includes(tag)
  );

  return {
    props: {
      posts,
      tag,
    },
  };
};

const Tag: NextPage<Props> = (props) => {
  return <TagPage {...props} />;
};

export default Tag;
