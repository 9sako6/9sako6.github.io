import { ReactNode } from "react";
import { Header, Footer } from "../organisms";
import styles from "./Layout.module.css";

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>{children}</div>
      </main>
      <Footer />
    </div>
  );
};
