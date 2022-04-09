import { HatenaBookmark } from "../atoms";

type Props = {
  title: string;
  url: string;
};

export const ShareButtons = ({ url, title }: Props) => {
  return (
    <div className="pt-4 pb-4">
      <HatenaBookmark url={url} title={title} />
    </div>
  );
};
