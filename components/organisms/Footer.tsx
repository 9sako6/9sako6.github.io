import styles from "./Footer.module.css";
import Image from "next/image";

export const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/9sako6"
        target="_blank"
        rel="noopener noreferrer"
      >
        9sako6
      </a>
    </footer>
  );
};
