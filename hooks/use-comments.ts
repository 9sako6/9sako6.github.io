import { getComments, createComment } from "@/lib/firebase/comments";
import { useEffect, useState } from "react";
import { PostComment } from "@/types";

export function useComments(
  slug: string
): [PostComment[], typeof createComment] {
  const [comments, setComments] = useState(new Array<PostComment>());

  useEffect(() => {
    getComments(slug)
      .then((comments) => setComments(comments))
      .catch((error) => console.error(error));
  }, []);

  return [comments, createComment];
}
