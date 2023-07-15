import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dayjs from "dayjs";
import { allPosts } from "@/lib/all-posts";
import { YearlyArchivesPage } from "@/components/templates";
import type { Post } from "@/types";

type Params = {
  year: string;
};

type Props = {
  posts: Post[];
  year: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const years = new Set<Params["year"]>();

  (await allPosts({ draft: false }))
    .map((post) => dayjs(post.date).format("YYYY"))
    .forEach((year) => years.add(year));

  const paths = Array.from(years).map((year) => ({ params: { year } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const emptyResponse = {
    props: {
      posts: [] as Post[],
      year: "1970",
    },
  };
  const year = params?.year;

  if (!year) {
    return emptyResponse;
  }

  const posts = (await allPosts({ draft: false })).filter(
    (post) => dayjs(post.date).format("YYYY") === year
  );

  return {
    props: {
      posts,
      year,
    },
  };
};

const YearPage: NextPage<Props> = (props) => {
  return <YearlyArchivesPage {...props} />;
};

export default YearPage;
