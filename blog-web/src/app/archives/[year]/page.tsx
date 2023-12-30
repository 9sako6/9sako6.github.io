import { defaultOpenGraph, defaultTwitter } from "@/app/sharedMetadata";
import { Card } from "@/components/features/post/Card";
import { PageTitle } from "@/components/ui/PageTitle";
import { allPosts } from "@/lib/all-posts";
import dayjs from "dayjs";
import { Metadata } from "next";

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

type MetaProps = {
  params: { year: Year };
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { year } = params;
  const { posts } = await getPostsInYear(year);
  const pageTitle = `${year}年に公開された${posts.length}件の記事`;
  const seoTitle = `${pageTitle} - ${process.env.siteTitle}`;
  const url = new URL(`/archives/${year}`, process.env.siteUrl).href;

  return {
    title: seoTitle,
    openGraph: {
      ...defaultOpenGraph,
      title: seoTitle,
      url,
    },
    twitter: {
      ...defaultTwitter,
      title: seoTitle,
    },
  };
}

type Params = {
  params: { year: Year };
};

const YearPage = async ({ params }: Params) => {
  const { year } = params;
  const { posts } = await getPostsInYear(year);
  const pageTitle = `${year}年に公開された${posts.length}件の記事`;

  return (
    <div>
      <div className="pb-16">
        <PageTitle>{pageTitle}</PageTitle>
      </div>
      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        posts.map((post) => (
          <Card
            key={post.slug}
            slug={post.slug}
            title={post.title}
            imageUrl={post.eyecatch}
            tags={post.topics}
          />
        ))
      )}
    </div>
  );
};

export default YearPage;
