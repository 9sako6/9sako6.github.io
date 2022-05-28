import { DocumentReference, Timestamp } from "firebase/firestore";

export type Post = Metadata & { slug: string };

export type PostComment = {
  message: string;
  createdAt: Timestamp;
  userRef: DocumentReference;
  published: boolean; // 論理削除フラグ
};
