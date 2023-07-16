import "@/styles/globals.css";
import "@/styles/nprogress.css";
import "@/styles/rehype-prism-plus.css";
import "@/styles/prism.css";
import "@/styles/mermaid.css";
import "@/styles/footnote.css";

import { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";

import { Noto_Serif_JP } from "next/font/google";

const notoSerifJp = Noto_Serif_JP({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.siteTitle,
  description: process.env.siteDescription,
  applicationName: process.env.siteTitle,
  authors: [{ name: "9sako6", url: process.env.siteUrl }],
  creator: "9sako6",
  generator: "Next.js",
  viewport: { width: "device-width", initialScale: 1 },
  keywords: ["software engineer", "web development", "blog"],
  icons: [`${process.env.siteUrl}/favicon.ico`],
  openGraph: {
    type: "website",
    url: process.env.siteUrl,
    title: process.env.siteTitle,
    description: process.env.siteDescription,
    siteName: process.env.siteTitle,
    images: [
      {
        url: `${process.env.siteUrl}/icon.webp`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@9sako6",
    creator: "@9sako6",
    images: `${process.env.siteUrl}/icon.webp`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSerifJp.className}`}>
      <body className="pl-4 pr-4">
        <ThemeProvider>
          <Header />
        </ThemeProvider>
        <main className="flex items-center justify-center">
          <div className="md:max-w-5xl w-full">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
