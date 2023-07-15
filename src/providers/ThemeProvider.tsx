"use client";

import { ThemeProvider as Provider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <Provider defaultTheme="dark" attribute="class">
      {children}
    </Provider>
  );
};
