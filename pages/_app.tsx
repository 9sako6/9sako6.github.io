import { Header, Footer } from "../components/organisms";
import "../styles/globals.css";
import "../styles/rehype-prism-plus.css";
import type { AppProps } from "next/app";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          <Component {...pageProps} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
