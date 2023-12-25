"use client";

import { useEffect } from "react";

type Props = {
  html: string;
};

export const Body = ({ html }: Props): JSX.Element => {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return <div className="znc" dangerouslySetInnerHTML={{ __html: html }} />;
};
