import { LoadingBar } from "./LoadeingBar";

export const LoadingCommentItem = () => (
  <div className="w-full py-4">
    <div className="flex">
      <div>
        <LoadingBar className="rounded-full w-12 h-12 mr-2" />
      </div>
      <div className="w-full">
        <LoadingBar className="rounded mb-2 h-4 w-5/6" />
        <LoadingBar className="rounded mb-2 h-4 w-4/6" />
        <LoadingBar className="rounded mb-2 h-4 w-2/6" />
      </div>
    </div>
  </div>
);
