import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import type { PostComment, User } from "@/types";

export const postCommentConverter: FirestoreDataConverter<PostComment> = {
  toFirestore(post: PostComment): DocumentData {
    return {
      message: post.message,
      userRef: post.userRef,
      createdAt: post.createdAt,
      published: post.published,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PostComment {
    const data = snapshot.data(options);
    return {
      message: data.message,
      userRef: data.userRef,
      createdAt: data.createdAt,
      published: data.published,
    };
  },
};

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      updatedAt: user.updatedAt,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);
    return {
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL,
      emailVerified: data.emailVerified,
      isAnonymous: data.isAnonymous,
      updatedAt: data.updatedAt,
    };
  },
};
