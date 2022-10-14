import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { isDevelopment } from "@/lib/is-development";

export const createFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCAJBUPEPlarUayszqCjAe_XrzOSW1emZE",
    authDomain: "blog-9sako6-d28a4.firebaseapp.com",
    projectId: "blog-9sako6-d28a4",
    storageBucket: "blog-9sako6-d28a4.appspot.com",
    messagingSenderId: "70849853386",
    appId: "1:70849853386:web:5caa9626be1426e0d84133",
    measurementId: "G-34XZQLD7ZR",
  };

  let app: FirebaseApp | undefined;

  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);

    if (typeof window !== "undefined") {
      getAnalytics(app);

      if (isDevelopment) {
        // Connect to an emulator.
        const auth = getAuth();
        connectAuthEmulator(auth, "http://localhost:9099");
        const db = getFirestore();
        connectFirestoreEmulator(db, "localhost", 8083);
      }
    }
  }

  return app;
};
