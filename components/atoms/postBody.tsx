import "prismjs/themes/prism-okaidia.min.css";
import "../../node_modules/katex/dist/katex.min.css";
import styles from "./PostBody.module.css";

type Props = {
  html: string;
};

export const PostBody = ({ html }: Props): JSX.Element => {
  return (
    <div
      className={styles.postBody}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
