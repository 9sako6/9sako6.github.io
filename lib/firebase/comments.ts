import {
  collection,
  getDocs,
  getFirestore,
  doc,
  addDoc,
  Firestore,
  getDoc,
  FieldValue,
} from "firebase/firestore";
import { PostComment } from "@/types";
import { postCommentConverter } from "./converter";

const commentsCollection = (db: Firestore, slug: string) =>
  collection(db, "posts", slug, "comments");

export async function getComments(slug: string): Promise<PostComment[]> {
  const comments: PostComment[] = [];
  const db = getFirestore();
  const commentsSnapshot = await getDocs(
    commentsCollection(db, slug).withConverter(postCommentConverter)
  );

  commentsSnapshot.forEach((doc) => {
    const comment = doc.data();
    comments.push({ ...comment });
  });

  return comments;
}

export async function createComment(
  slug: string,
  comment: Omit<PostComment, "createdAt"> & { createdAt: FieldValue }
) {
  const db = getFirestore();
  const docRef = await addDoc(commentsCollection(db, slug), comment);
  return docRef;
}
