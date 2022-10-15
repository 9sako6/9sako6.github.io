import { Comment } from "@/types/comment";
import dayjs from "dayjs";

type Props = Comment;

export const CommentItem = ({
  id,
  text,
  displayName,
  photoURL,
  createdAt,
}: Props) => {
  return (
    <a href={`#${id}`}>
      <div
        className="rounded flex py-4 w-full hover:bg-gradient-to-r from-white via-zinc-100 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
        id={id}
        data-testid="comment-item"
      >
        <div>
          <img
            alt={displayName || "user icon"}
            className="rounded-full w-12 h-12 mr-4 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200
            dark:from-gray-800 dark:via-gray-700 dark:to-gray-600"
            src={photoURL || ""}
          />
        </div>
        <div className="w-full">
          <div>
            <div>{displayName}</div>
            <div className="font-mono text-xs">
              {dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss Z[Z]")}
            </div>
          </div>
          <div className="py-4">
            {text.split("\n").map((line, index) => (
              <p key={`${id}-paragraph-${index}`}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};
