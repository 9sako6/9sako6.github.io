import "prismjs/themes/prism-okaidia.min.css";
import "../../node_modules/katex/dist/katex.min.css";

type Props = {
  html: string;
};

export const PostBody = ({ html }: Props): JSX.Element => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
