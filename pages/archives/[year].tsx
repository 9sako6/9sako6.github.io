import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dayjs from "dayjs";
import { allPostsSync } from "@/lib/all-posts";
import { YearlyArchivesPage } from "@/components/templates";

type Params = {
  year: string;
};

type Props = {
  posts: Post[];
  year: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const years = new Set<Params["year"]>();

  allPostsSync({ draft: false })
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

  const posts = allPostsSync({ draft: false }).filter(
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
