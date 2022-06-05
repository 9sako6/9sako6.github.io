import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
