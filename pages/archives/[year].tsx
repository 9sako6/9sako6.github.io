import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  EnumPostsDocument,
  EnumPostsQuery,
  EnumPostsQueryVariables,
} from "../../graphql/queries/enumPosts.generated";
import { client } from "../../lib/client";
import type { Post } from "../../types";
import { YearlyArchivesPage } from "../../components/templates";

type Params = {
  year: string;
};

type Props = {
  posts: Post[];
  year: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await client.query<EnumPostsQuery, EnumPostsQueryVariables>({
    query: EnumPostsDocument,
  });

  if (result.loading || !result.data || !result.data.blogPostCollection) {
    return {
      paths: [],
      fallback: false,
    };
  }
  const posts = result.data.blogPostCollection.items;
  const years = new Set<Params["year"]>();
  for (const post of posts) {
    if (post?.sys.firstPublishedAt) {
      years.add(new Date(post.sys.firstPublishedAt).getFullYear().toString());
    }
  }
  const paths = Array.from(years).map((year) => ({ params: { year } }));

  console.log(paths);

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

  const fromDate = `${year}-01-01T00:00:00.000+0900`;
  const toDate = `${Number(year) + 1}-01-01T00:00:00.000+0900`;

  const result = await client.query<EnumPostsQuery, EnumPostsQueryVariables>({
    query: EnumPostsDocument,
    variables: {
      where: {
        sys: {
          firstPublishedAt_gte: fromDate,
          firstPublishedAt_lt: toDate,
        },
      },
    },
  });

  const posts = result.data.blogPostCollection?.items as Post[];

  if (!posts) {
    return emptyResponse;
  }

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
