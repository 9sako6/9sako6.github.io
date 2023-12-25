import { Props } from "@/app/posts/[slug]/page";
import "prismjs/themes/prism-okaidia.min.css";
import { Body } from "../features/post/Body";
import { PostDate } from "../features/post/PostDate";
import { PageTitle } from "../ui/PageTitle";
import { Tag } from "../features/post/Tag";

export const PostPage: React.FC<Props> = ({
  title,
  bodyHtml,
  url,
  date,
  topics,
}) => {
  return (
    <>
      <div className="grid place-items-center gap-4 pt-8 pb-16">
        <PageTitle title={title} />

        <div className="flex gap-8">
          {topics.length > 0 &&
            topics.map((topic) => (
              <div key={topic}>
                <Tag tag={topic} />
              </div>
            ))}
        </div>
        <PostDate date={new Date(date)} />
      </div>

      <Body html={bodyHtml} />
    </>
  );
};
