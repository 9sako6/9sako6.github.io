import Head from "next/head";
import { Body, PostTitle, PostDate } from "@/components/atoms";
import { Layout } from "@/components/layouts";
import "prismjs/themes/prism-okaidia.min.css";
import "@/node_modules/katex/dist/katex.min.css";
import { ShareButtons } from "../organisms/ShareButtons";
import { Props } from "@/pages/posts/[slug]";
import { History } from "@/components/organisms";

export const PostPage = ({
  title,
  description,
  eyecatch,
  bodyHtml,
  date,
  url,
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
      <div>
        <PostTitle title={title} />
        <div className="pb-6">
          <History commits={commitHistory} />
        </div>
        <Body html={bodyHtml} />
        <ShareButtons title={title} url={url} />
      </div>
    </Layout>
  );
};
