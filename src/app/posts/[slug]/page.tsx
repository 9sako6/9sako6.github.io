import { defaultOpenGraph, defaultTwitter } from "@/app/sharedMetadata";
import { Body } from "@/components/features/post/Body";
import { PostDate } from "@/components/features/post/PostDate";
import { TagsList } from "@/components/features/post/TagsList";
import { PageTitle } from "@/components/ui/PageTitle";
import { generateDescription } from "@/lib/generate-description";
import { getAllPosts } from "@/lib/get-all-posts";
import { getPost } from "@/lib/get-post";
import { OG_IMAGE_PATH } from "@/lib/path";
import { PostMetadata } from "@/models/post";
import { Metadata as NextMetadata } from "next";
import Script from "next/script";
import "zenn-content-css";

export type Props = PostMetadata & {
  bodyHtml: string;
  url: string;
};

export const generateStaticParams = async () => {
  const posts = await getAllPosts({
    draft: process.env.NODE_ENV === "development",
  });
  return posts.map((post) => ({ slug: post.slug }));
};

type MetaProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<NextMetadata> {
  const { slug } = params;

  const props = await getPost({ slug });
  const imageUrl = OG_IMAGE_PATH({ slug });
  const description =
    props.description || generateDescription({ htmlString: props.bodyHtml });

  return {
    metadataBase: new URL(process.env.siteUrl || "http://localhost:3000"),
    title: props.title,
    description,
    openGraph: {
      ...defaultOpenGraph,
      title: props.title,
      description,
      url: props.url,
      images: [imageUrl],
    },
    twitter: {
      ...defaultTwitter,
      title: props.title,
      description,
      images: [imageUrl],
    },
  };
}

type Params = {
  params: { slug: string };
};

const PostPage = async ({ params }: Params) => {
  const { slug } = params;
  const { title, topics, date, bodyHtml } = await getPost({ slug });

  return (
    <div>
      <Script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      <div className="grid place-items-center gap-4 pt-8 pb-16">
        <PageTitle>{title}</PageTitle>

        <TagsList tags={topics} />
        <PostDate date={new Date(date)} />
      </div>

      <Body html={bodyHtml} />
    </div>
  );
};

export default PostPage;
