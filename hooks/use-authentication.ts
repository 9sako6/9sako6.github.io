import {
  onAuthStateChanged,
  User as FirestoreUser,
  signInWithRedirect,
  GoogleAuthProvider,
  getAuth,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { createUser, getUser } from "@/lib/firebase/users";
import { DocumentReference, serverTimestamp } from "firebase/firestore";
import { User } from "@/types";

export function useAuthentication(): [
  FirestoreUser | undefined,
  DocumentReference<User> | undefined,
  () => void,
  () => void
] {
  const [authUser, setAuthUser] = useState<FirestoreUser>();
  const [userRef, setUserRef] = useState<DocumentReference<User>>();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setAuthUser(user);

        if (user.uid && user.email) {
          createUser({
            uid: user.uid,
            displayName: user.displayName || "匿名コロッケ",
            email: user.email,
            photoURL: user.photoURL || "/images/default-icon.png",
            isAnonymous: user.isAnonymous,
            emailVerified: user.emailVerified,
            updatedAt: serverTimestamp(),
          });

          getUser(user.uid).then((snapshot) => {
            if (snapshot.exists()) {
              setUserRef(snapshot.ref);
            }
          });
        }
      }
    });
  }, []);

  const handleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  const handleSignOut = () => {
    signOut(auth);
    setAuthUser(undefined);
  };

  return [authUser, userRef, handleSignIn, handleSignOut];
}
