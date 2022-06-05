import "@/styles/globals.css";
import "@/styles/nprogress.css";
import "@/styles/rehype-prism-plus.css";
import "@/styles/prism.css";
import "@/styles/mermaid.css";
import "@/styles/footnote.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import nProgress from "nprogress";
import { ThemeProvider } from "next-themes";

import "@/lib/firebase/initApp"; // Initialize FirebaseApp

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
