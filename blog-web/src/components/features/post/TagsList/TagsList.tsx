import { Tag } from "./Tag";
import styles from "./TagsList.module.scss";

export type Props = {
  tags: string[];
};

export const TagsList: React.FC<Props> = ({ tags }) => {
  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <Tag tag={tag} key={tag} />
      ))}
    </div>
  );
};
