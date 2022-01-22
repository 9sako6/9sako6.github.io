import styles from "./Body.module.css";

type Props = {
  html: string;
};

export const Body = ({ html }: Props): JSX.Element => {
  return (
    <div
      className={styles.postBody}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
