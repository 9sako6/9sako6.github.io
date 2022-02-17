import { HatenaShareButton, HatenaIcon, HatenaShareCount } from "react-share";
import styles from "./HatenaBookmark.module.css";

type Props = {
  title: string;
  url: string;
};

export const HatenaBookmark = ({ title, url }: Props) => (
  <div className={styles.wrapper}>
    <HatenaShareButton title={title} url={url}>
      <HatenaIcon size={32} round />
    </HatenaShareButton>
    <div className={styles.count}>
      <HatenaShareCount url={url} />
    </div>
  </div>
);
