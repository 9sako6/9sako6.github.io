import { Layout } from "../ui/Layout";
import { SideBar } from "@/components/ui/SideBar";
import "../../../node_modules/katex/dist/katex.min.css";
import { Props } from "@/pages/posts/[slug]";
import Head from "next/head";
import "prismjs/themes/prism-okaidia.min.css";
import { Body } from "../features/post/Body";
import { PostDate } from "../features/post/PostDate";
import { PageTitle } from "../ui/PageTitle";

export const PostPage = ({
  title,
  description,
  eyecatch,
  bodyHtml,
  url,
  date,
  topics,
}: Props): JSX.Element => {
  const pageTitle = `${title} - ${process.env.siteTitle}`;
  const imageUrl = eyecatch
    ? new URL(eyecatch, process.env.siteUrl).href
    : new URL("/icon.webp", process.env.siteUrl).href;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:creator" content="@9sako6" />
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />
      </Head>

      <div className="flex justify-center">
        <PageTitle title={title} />
      </div>
      <div className="flex justify-center pb-16">
        <PostDate date={new Date(date)} />
      </div>
      <div className="grid md:grid-cols-4 max-w-5xl">
        <div className="hidden md:block">
          <SideBar topics={topics} title={title} url={url} />
        </div>
        <div className="md:col-span-3">
          <Body html={bodyHtml} />
        </div>
      </div>
    </Layout>
  );
};
