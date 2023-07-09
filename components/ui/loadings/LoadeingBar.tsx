type Props = {
  className?: string;
};

export const LoadingBar = ({ className }: Props) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200
      dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 ${className}`}
    ></div>
  );
};
