import Head from "next/head";
import { Body, PostTitle, PostDate } from "@/components/atoms";
import { Layout } from "@/components/layouts";
import "prismjs/themes/prism-okaidia.min.css";
import "@/node_modules/katex/dist/katex.min.css";
import { ShareButtons } from "../organisms/ShareButtons";

type Props = Post & {
  bodyHtml: string;
  url: string;
};

export const PostPage = ({
  title,
  description,
  eyecatch,
  bodyHtml,
  date,
  url,
}: Props): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>
          {title} - {process.env.siteTitle}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
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
          <PostDate date={new Date(date)} />
        </div>
        <Body html={bodyHtml} />
        <ShareButtons title={title} url={url} />
      </div>
    </Layout>
  );
};
