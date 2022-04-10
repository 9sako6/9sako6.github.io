import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const MarkdownWrapper = ({ children }: Props): JSX.Element => {
  return <div className="markdown">{children}</div>;
};
