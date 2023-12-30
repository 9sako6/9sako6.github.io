import { YearlyArchivesPage } from "@/components/templates";
import { allPosts } from "@/lib/all-posts";
import dayjs from "dayjs";

type Year = string;

export const generateStaticParams = async () => {
  const years = new Set<Year>();

  (await allPosts({ draft: false }))
    .map((post) => dayjs(post.date).format("YYYY"))
    .forEach((year) => years.add(year));

  return Array.from(years).map((year) => ({ year }));
};

const getPostsInYear = async (year: string) => {
  const posts = (await allPosts({ draft: false })).filter(
    (post) => dayjs(post.date).format("YYYY") === year,
  );

  return {
    posts,
    year,
  };
};

type Params = {
  params: { year: Year };
};

const YearPage = async ({ params }: Params) => {
  const { year } = params;
  const props = await getPostsInYear(year);
  return <YearlyArchivesPage {...props} />;
};

export default YearPage;
