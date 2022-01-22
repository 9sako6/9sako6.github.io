import { Layout } from "../components/layouts";
import "../styles/globals.css";
import "../styles/rehype-prism-plus.css";
import "prismjs/themes/prism-okaidia.min.css";
import "../node_modules/katex/dist/katex.min.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
