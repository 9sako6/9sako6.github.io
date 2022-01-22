import type { Post } from "../../types";
import Head from "next/head";
import { Body, PostTitle, PostDate } from "../../components/atoms";
import { Layout } from "../../components/layouts";
import styles from "./PostPage.module.css";
import "prismjs/themes/prism-okaidia.min.css";
import "../../node_modules/katex/dist/katex.min.css";

type Props = Post & {
  bodyHtml: string;
};

export const PostPage = ({
  title,
  description,
  eyeCatchImage,
  bodyHtml,
  sys,
}: Props): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>{title} - 腐ったコロッケ</title>
        <meta property="og:title" content={title || ""} />
        <meta property="og:description" content={description || ""} />
        <meta property="og:image" content={eyeCatchImage?.url || undefined} />
      </Head>
      <div className={styles.postPage}>
        <PostTitle title={title || ""} />
        <PostDate date={new Date(sys.firstPublishedAt as string)} />
        <Body html={bodyHtml} />
      </div>
    </Layout>
  );
};
