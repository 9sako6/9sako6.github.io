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
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@9sako6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex items-center justify-center">
        <div className="md:max-w-5xl w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
