"use client";

import "./globals.css";
import { UserProvider } from "@/contexts/user-context";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
