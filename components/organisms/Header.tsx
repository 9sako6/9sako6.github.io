import Link from "next/link";
import styles from "./Header.module.css";

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Link href="/">
          <a>{process.env.siteTitle}</a>
        </Link>
      </div>
    </header>
  );
};
