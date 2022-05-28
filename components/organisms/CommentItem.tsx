import { getUser } from "@/lib/firebase/users";
import { PostComment } from "@/types";
import { useEffect, useState } from "react";
import type { User } from "@/types";

type Props = PostComment;

export const CommentItem = ({
  message,
  createdAt,
  userRef,
}: Props): JSX.Element => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getUser(userRef.id).then((snapshot) => {
      if (snapshot.exists()) setUser(snapshot.data());
    });
  });

  return (
    <div className="pb-8">
      <div className="flex items-center">
        <img className="rounded-full w-10" src={user?.photoURL || ""}></img>
        <p className="p-2">{user?.displayName}</p>
      </div>
      <div>
        <p>{message}</p>
        {/* {createdAt.toDate()} */}
      </div>
    </div>
  );
};
