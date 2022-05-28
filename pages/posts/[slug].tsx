import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { allPostsSync } from "@/lib/all-posts";
import { markdownToHtml } from "@/lib/markdown-html";
import { PostPage } from "@/components/templates";
import { commitHistory, Commit } from "@/lib/update-history";
import { useEffect, useState } from "react";
import * as firestore from 'firebase/firestore'
import type { Post } from "@/types";
import { CommentForm } from "@/components/organisms";
import { useAuthentication } from "@/hooks/use-authentication";

export type Props = Post & {
  bodyHtml: string;
  url: string;
  commitHistory: Commit[]
};

type Params = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = allPostsSync({ draft: false }).map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { props: {} as Props };

  const postPath = `posts/${params.slug}.md`

  const file = readFileSync(postPath, "utf-8");
  const matterResult = matter(file);
  const metadata = matterResult.data as Metadata;

  const bodyHtml = await markdownToHtml(matterResult.content || "");

  return {
    props: {
      slug: params.slug,
      bodyHtml,
      url: `${process.env.siteUrl}/posts/${params.slug}`,
      commitHistory: commitHistory(postPath),
      ...metadata,
    },
  };
};

const Post: NextPage<Props> = (props) => {
  const { slug } = props;
  const [writtenComment, setWrittenComment] = useState('')
  // const [authUser, signIn, signOut] = useAuthentication()

  // const handleFirestore = async (message: string) => {
  //   if (!authUser) return;
  //   const db = firestore.getFirestore();
  //   const userRef = await firestore.getDoc(firestore.doc(db, 'users', authUser.uid))

  //   await firestore.addDoc(firestore.collection(db, 'posts', slug, 'comments'), {
  //     message,
  //     createdAt: firestore.serverTimestamp(),
  //     userRef: userRef.ref,
  //     published: true,
  //   })
  // }

  const handleCommentTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWrittenComment(event.currentTarget.value)
  }
  const handleSubmit = async (message: string) => {
    // await handleFirestore(message)
  }

  return <div>
    <PostPage {...props} />
    {/* {
      authUser ?
        <div onClick={signOut}>Sign Out</div>
        : <div onClick={signIn}>Sign In</div>
    } */}
    {/* {
      authUser ? <CommentForm handleChange={handleCommentTextarea} value={writtenComment} handleSubmit={handleSubmit} /> : <p>Please Sign in</p>
    } */}

  </div>;
};

export default Post;
