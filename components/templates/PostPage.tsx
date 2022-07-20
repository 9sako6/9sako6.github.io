import Head from "next/head";
import { Body, PostDate, PostTitle } from "@/components/atoms";
import { Layout } from "@/components/layouts";
import "prismjs/themes/prism-okaidia.min.css";
import "@/node_modules/katex/dist/katex.min.css";
import { ShareButtons } from "../organisms/ShareButtons";
import { Props } from "@/pages/posts/[slug]";
import { History, SideBar } from "@/components/organisms";

export const PostPage = ({
  title,
  description,
  eyecatch,
  bodyHtml,
  url,
  date,
  topics,
  commitHistory,
}: Props): JSX.Element => {
  const pageTitle = `${title} - ${process.env.siteTitle}`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={
            eyecatch
              ? `${process.env.siteUrl}/${eyecatch}`
              : `${process.env.siteUrl}/icon.webp`
          }
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@9sako6" />
      </Head>

      <div className="flex justify-center">
        <PostTitle title={title} />
      </div>
      <div className="flex justify-center pb-16">
        <PostDate date={new Date(date)} />
      </div>
      <div className="grid md:grid-cols-4 max-w-4xl">
        <div className="hidden md:block">
          <SideBar topics={topics} title={title} url={url} />
        </div>
        <div className="md:col-span-3">
          <div className="pb-6">
            <History commits={commitHistory} />
          </div>
          <Body html={bodyHtml} />
          <div className="pt-8">
            <ShareButtons title={title} url={url} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
