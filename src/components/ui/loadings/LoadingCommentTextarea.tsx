import { LoadingBar } from "./LoadeingBar";

export const LoadingCommentTextarea = () => (
  <div className="w-full">
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
    <div className="w-full mt-36">
      <LoadingBar className="rounded mb-2 h-4 w-1/6 ml-auto" />
    </div>
  </div>
);
