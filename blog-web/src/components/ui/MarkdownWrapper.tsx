import { ReactNode } from "react";
import "zenn-content-css";

type Props = {
  children?: ReactNode;
};

export const MarkdownWrapper = ({ children }: Props): JSX.Element => {
  return <div className="znc">{children}</div>;
};
