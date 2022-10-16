import { SendIcon } from "../icons/SendIcon";
import { LoadingBar } from "../loadings/LoadeingBar";

type Props = {
  handleClick: () => void;
  disabled: boolean;
  processing: boolean;
};

export const SendButton = ({ handleClick, disabled, processing }: Props) => {
  if (processing) {
    return (
      <div className="text-right">
        <LoadingBar className="ml-auto rounded w-20 h-8" />
      </div>
    );
  }

  return (
    <button
      className={`h-8 py-1 px-3 rounded w-20 bg-gray-700 text-white dark:bg-gray-800 ${
        disabled
          ? "dark:text-zinc-600 text-zinc-500"
          : "cursor-pointer dark:hover:bg-gray-700 dark:text-zinc-300 hover:bg-gray-600"
      }`}
      onClick={handleClick}
      disabled={disabled || processing}
    >
      <span className="flex items-center">
        <SendIcon />
        <span className="pl-1">Send</span>
      </span>
    </button>
  );
};
