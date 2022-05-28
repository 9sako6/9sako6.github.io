import type { User } from "@/types";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  FieldValue,
} from "firebase/firestore";
import { userConverter } from "./converter";

export async function createUser(
  user: Omit<User, "updatedAt"> & { updatedAt: FieldValue }
) {
  const db = getFirestore();
  return setDoc(doc(db, "users", user.uid), user);
}

export async function getUser(uid: string) {
  const db = getFirestore();
  return getDoc(doc(db, "users", uid).withConverter(userConverter));
}
