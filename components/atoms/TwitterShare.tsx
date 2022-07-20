import { TwitterShareButton, TwitterIcon } from "react-share";

type Props = {
  title: string;
  url: string;
};

export const TwitterShare = ({ url, title }: Props): JSX.Element => (
  <div className="w-8">
    <TwitterShareButton url={url} title={title}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  </div>
);
