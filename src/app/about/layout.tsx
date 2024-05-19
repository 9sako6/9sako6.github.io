import { Metadata } from "next/types";
import { ReactNode } from "react";
import "zenn-content-css";

type Props = {
  children?: ReactNode;
};

const MdxLayout = ({ children }: Props) => {
  return <div className="znc">{children}</div>;
};

export default MdxLayout;

export const metadata = {
  title: `About me - ${process.env.siteTitle}`,
} satisfies Metadata;
