import { ReactNode } from "react";
import { Header, Footer } from "@/components/organisms";
import Head from "next/head";

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="pl-4 pr-4">
      <Head>
        <title>{process.env.siteTitle}</title>
        <meta name="description" content={process.env.siteDescription} />
        <meta property="og:title" content={process.env.siteTitle} />
        <meta property="og:description" content={process.env.siteDescription} />
        <meta
          property="og:image"
          content={`${process.env.siteUrl}/icon.webp`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@9sako6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex items-center justify-center">
        <div className="md:w-2xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
