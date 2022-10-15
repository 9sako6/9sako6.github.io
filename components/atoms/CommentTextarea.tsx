import type { HandleInput } from "@/hooks/use-input";
import { SignOutButton } from ".";

type Props = {
  value: string;
  handleInput: HandleInput;
  photoURL: string | null;
  displayName: string | null;
};

export const CommentTextarea = ({
  value,
  handleInput,
  photoURL,
  displayName,
}: Props) => {
  return (
    <div>
      <div className="flex">
        <div>
          <img
            alt={displayName || "user icon"}
            className="rounded-full w-12 h-12 mr-2 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200
            dark:from-gray-800 dark:via-gray-700 dark:to-gray-600"
            src={photoURL || ""}
          />
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 justify-between items-center">
            <div className="pl-2">{displayName}</div>
            <div className="text-right">
              <SignOutButton />
            </div>
          </div>
          <div>
            <textarea
              data-testid="comment-textarea"
              value={value}
              onChange={handleInput}
              className="p-2 text-lg w-full outline-none bg-transparent"
              maxLength={400}
              rows={8}
              placeholder="What are your thoughts?"
            />
          </div>
        </div>
      </div>
      <div className="font-mono text-right text-sm text-zinc-400 dark:text-gray-400">
        {value.length}/400
      </div>
    </div>
  );
};
