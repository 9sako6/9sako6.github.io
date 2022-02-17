import { HatenaBookmark } from "../atoms";
import styles from "./ShareButtons.module.css";

type Props = {
  title: string;
  url: string;
};

export const ShareButtons = ({ url, title }: Props) => {
  return (
    <div className={styles.wrapper}>
      <HatenaBookmark url={url} title={title} />
    </div>
  );
};
