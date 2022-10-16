import { Comment } from "@/types/comment";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useComment = (slug: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getComments = async (): Promise<Comment[]> => {
    const db = getFirestore();
    const q = query(
      collection(db, "comments"),
      where("slug", "==", slug),
      orderBy("createdAt", "asc")
    );
    const snapshot = await getDocs(q).finally(() => {
      setIsLoading(false);
    });
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
      slug: doc.data().slug,
      userId: doc.data().userId,
      photoURL: doc.data().photoURL,
      displayName: doc.data().displayName,
      published: doc.data().published,
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    }));
  };

  const addComment = async (
    comment: Omit<
      Comment,
      | "id"
      | "userId"
      | "photoURL"
      | "displayName"
      | "createdAt"
      | "updatedAt"
      | "published"
    >,
    user: User
  ) => {
    const db = getFirestore();

    return await addDoc(collection(db, "comments"), {
      ...comment,
      userId: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      published: true,
      // Firestore converts Date object to timestamp automatically.
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(async () => {
      const newComments = await getComments();
      setComments(newComments);
    });
  };

  useEffect(() => {
    getComments().then((newComments) => setComments(newComments));
  }, []);

  return [comments, addComment, isLoading] as const;
};
