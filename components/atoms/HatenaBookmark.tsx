import { HatenaShareButton, HatenaIcon, HatenaShareCount } from "react-share";

type Props = {
  title: string;
  url: string;
};

export const HatenaBookmark = ({ title, url }: Props) => (
  <div className="w-8">
    <HatenaShareButton title={title} url={url}>
      <HatenaIcon size={32} round />
    </HatenaShareButton>
    <div className="text-center">
      <HatenaShareCount url={url} />
    </div>
  </div>
);
