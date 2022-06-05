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
  User | undefined,
  () => void,
  () => void
] {
  const [authUser, setAuthUser] = useState<FirestoreUser>();
  const [userRef, setUserRef] = useState<DocumentReference<User>>();
  const [user, setUser] = useState<User>();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        const snapshot = await getUser(user.uid);
        // TODO: ページ移動のたびにこの関数が走ってるけどいいのか？
        console.log('snapshot', snapshot, snapshot.exists())

        if (snapshot.exists()) {
          // NOTE: User exists in Firestore.
          setUserRef(snapshot.ref);
          setUser(snapshot.data());
        } else if (user.email) {
          // NOTE: Create a user whtn the first sign in.
          await createUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
            emailVerified: user.emailVerified,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          const snapshot = await getUser(user.uid);
          if (snapshot.exists()) {
            setUserRef(snapshot.ref);
            setUser(snapshot.data());
          };
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

  return [authUser, userRef, user, handleSignIn, handleSignOut];
}
