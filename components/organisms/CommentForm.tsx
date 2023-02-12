"use client";

import { useInput } from "@/hooks/use-input";
import { useUser } from "@/hooks/use-user";
import { CommentTextarea, SendButton, SignInButton } from "../atoms";
import { LoadingCommentTextarea } from "../loadings/LoadingCommentTextarea";
import { CommentItem } from "../atoms/CommentItem";
import { useComment } from "@/hooks/use-comment";
import { LoadingCommentItem } from "../loadings/LoadingCommentItem";
import { useState } from "react";

type Props = {
  slug: string;
};

export const CommentForm = ({ slug }: Props) => {
  const { user, loading: userLoading } = useUser();
  const [comments, createComment, isCommentsLoading] = useComment(slug);
  const [inputText, setInputText, handleInput] = useInput();
  const isInvalid = inputText.length === 0 || inputText.length > 400;
  const [isSending, setIsSending] = useState(false);

  const addComment = async () => {
    // Unauthorized user
    if (!user || userLoading) return;
    if (isInvalid) return;

    setIsSending(true);

    await createComment(
      {
        text: inputText,
        slug,
      },
      user
    ).finally(() => {
      setIsSending(false);
    });

    setInputText("");
  };

  return (
    <div className="h-full w-full py-24">
      <div className="mb-8">
        {isCommentsLoading && <LoadingCommentItem />}
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>
      {!user && !userLoading && (
        <div className="w-full">
          <LoadingCommentTextarea />
          <div className="grid place-content-center py-3">
            Please sign in to leave comments.
          </div>
          <SignInButton />
        </div>
      )}
      {!user && userLoading && <LoadingCommentTextarea />}
      {user && (
        <div className="">
          <CommentTextarea
            value={inputText}
            handleInput={handleInput}
            photoURL={user.photoURL}
            displayName={user.displayName}
          />
          <div className="text-right py-3">
            <SendButton
              disabled={isInvalid}
              handleClick={addComment}
              processing={isSending}
            />
          </div>
        </div>
      )}
    </div>
  );
};
