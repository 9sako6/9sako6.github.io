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
