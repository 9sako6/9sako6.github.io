import Head from "next/head";
import { Body, PostTitle, PostDate } from "@/components/atoms";
import { Layout } from "@/components/layouts";
import "prismjs/themes/prism-okaidia.min.css";
import "@/node_modules/katex/dist/katex.min.css";
import { ShareButtons } from "../organisms/ShareButtons";
import { Props } from "@/pages/posts/[slug]";
import { History, CommentForm } from "@/components/organisms";
import { CommentItem } from "@/components/organisms/CommentItem";
import { useComments } from "@/hooks/use-comments";
import { useAuthentication } from "@/hooks/use-authentication";
import { useState } from "react";
import { CommentDiscussionIcon } from "../icons/CommentDiscussionIcon";
import { serverTimestamp } from "firebase/firestore";

export const PostPage = ({
  slug,
  title,
  description,
  eyecatch,
  bodyHtml,
  date,
  url,
  commitHistory,
}: Props): JSX.Element => {
  const pageTitle = `${title} - ${process.env.siteTitle}`;
  const [comments, createComment] = useComments(slug);
  const [authUser, userRef, signIn, signOut] = useAuthentication();
  const [writtenComment, setWrittenComment] = useState("");

  const handleCommentTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setWrittenComment(event.currentTarget.value);
  };
  const handleSubmit = async (message: string) => {
    console.log("ref", userRef);
    if (!userRef) return;

    createComment(slug, {
      message,
      createdAt: serverTimestamp(),
      published: true,
      userRef,
    });
  };

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
        <div className="m-auto text-gray-400 w-48 p-10">
          <CommentDiscussionIcon />
        </div>
        {comments.map((comment, index) => (
          <CommentItem key={index} {...comment} />
        ))}
        {authUser ? (
          <div onClick={signOut}>Sign Out</div>
        ) : (
          <div onClick={signIn}>Sign In</div>
        )}
        {authUser ? (
          <CommentForm
            handleChange={handleCommentTextarea}
            value={writtenComment}
            handleSubmit={handleSubmit}
          />
        ) : (
          <p>Please Sign in</p>
        )}
      </div>
    </Layout>
  );
};
