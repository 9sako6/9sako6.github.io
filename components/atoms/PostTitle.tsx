import styles from "./PostTitle.module.css";

type Props = {
  title: string;
};

export const PostTitle = ({ title }: Props): JSX.Element => {
  return (
    <div className={styles.postTitle}>
      <h1>{title}</h1>
    </div>
  );
};
