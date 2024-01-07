import "@/styles/footnote.css";
import "@/styles/globals.css";
import "@/styles/znc.css";
import "@/styles/nprogress.css";
import "@/styles/rehype-prism-plus.css";

import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { Metadata } from "next";

import { Noto_Serif_JP } from "next/font/google";
import { ToolMenu } from "@/components/ui/ToolMenu";

const notoSerifJp = Noto_Serif_JP({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});

import type { Viewport } from "next";

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(process.env.siteUrl || "http://localhost:3000"),
  title: process.env.siteTitle,
  description: process.env.siteDescription,
  applicationName: process.env.siteTitle,
  authors: [{ name: "9sako6", url: process.env.siteUrl }],
  creator: "9sako6",
  generator: "Next.js",
  keywords: ["software engineer", "web development", "blog"],
  icons: ["/favicon.ico"],
  openGraph: {
    type: "website",
    url: "/",
    title: process.env.siteTitle,
    description: process.env.siteDescription,
    siteName: process.env.siteTitle,
    images: [
      {
        url: "/icon.obake.png",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@9sako6",
    creator: "@9sako6",
    images: "/icon.obake.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSerifJp.className}`}>
      <body className="m-auto pl-4 pr-4 md:pl-8 md:pr-8 md:max-w-5xl">
        <Header />
        <main className="flex items-center justify-center">
          <div className="w-full">{children}</div>
        </main>
        <Footer />
        <div className="md:hidden fixed bottom-0 left-0 right-0">
          <ToolMenu />
        </div>
      </body>
    </html>
  );
}
