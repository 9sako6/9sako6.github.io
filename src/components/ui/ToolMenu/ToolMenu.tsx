import Link from "next/link";
import { HomeIcon } from "../icons/HomeIcon";
import styles from "./ToolMenu.module.scss";

export type Props = {};

export const ToolMenu: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <Link href="/" aria-label="Link to the top page.">
        <div className={styles.iconContainer}>
          <HomeIcon />
        </div>
      </Link>
    </div>
  );
};
