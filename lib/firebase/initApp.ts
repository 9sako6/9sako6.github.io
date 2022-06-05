import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZBWMFMT7QUWFTj7jQH_XlztZijZ5k90M",
  authDomain: "sako6-blog.firebaseapp.com",
  projectId: "sako6-blog",
  storageBucket: "sako6-blog.appspot.com",
  messagingSenderId: "90882494024",
  appId: "1:90882494024:web:54eff6f33a1cad7796127d",
  measurementId: "G-MTV6VLT7LC",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  // Connect to an emulator.
  const auth = getAuth();
  connectAuthEmulator(auth, "http://localhost:9099");
  const db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8080);
}
