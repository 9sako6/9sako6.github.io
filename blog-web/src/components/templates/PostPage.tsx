import { Props } from "@/app/posts/[slug]/page";
import { SideBar } from "@/components/ui/SideBar";
import "prismjs/themes/prism-okaidia.min.css";
import { Body } from "../features/post/Body";
import { PostDate } from "../features/post/PostDate";
import { PageTitle } from "../ui/PageTitle";

export const PostPage: React.FC<Props> = ({
  title,
  bodyHtml,
  url,
  date,
  topics,
}) => {
  return (
    <>
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
        <div className="hidden md:block md:col-span-3">
          <Body html={bodyHtml} />
        </div>
      </div>
      {/* SP */}
      <div className="md:hidden">
        <Body html={bodyHtml} />
      </div>
    </>
  );
};
