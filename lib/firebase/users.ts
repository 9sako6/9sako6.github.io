import type { User } from "@/types";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  FieldValue,
} from "firebase/firestore";
import { userConverter } from "./converters";

type UserObject = Omit<
  User,
  "createdAt" | "updatedAt" | "photoURL" | "displayName"
> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  photoURL: string | null;
  displayName: string | null;
};

function isUser(user: any): user is User {
  return !!(user.uid && user.email && user.photoURL && user.photoURL);
}

export async function createUser(user: UserObject) {
  const db = getFirestore();
  if (!user.photoURL) user.photoURL = "/images/default-icon.png";
  if (!user.displayName) user.displayName = "匿名コロッケ";
  if (!isUser(user)) return;

  setDoc(
    doc(db, "users", user.uid).withConverter(userConverter),
    user,
    { merge: true }
  );
}

export async function getUser(uid: string) {
  const db = getFirestore();
  return getDoc(doc(db, "users", uid).withConverter(userConverter));
}
