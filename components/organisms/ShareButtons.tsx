import { HatenaBookmark, TwitterShare } from "../atoms";

type Props = {
  title: string;
  url: string;
};

export const ShareButtons = (props: Props) => {
  return (
    <div className="pt-4 pb-4 flex gap-2">
      <HatenaBookmark {...props} />
      <TwitterShare {...props} />
    </div>
  );
};
