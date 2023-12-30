import Link from "next/link";
import styles from "./Tag.module.scss";

type Props = {
  tag: string;
};

export const Tag: React.FC<Props> = ({ tag }) => (
  <Link href={`/tags/${tag}`} className={styles.tag}>
    #{tag}
  </Link>
);
