import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import firebaseConfig from "@/firebase.json";
import { readFileSync } from "fs";

export const initializeFirebaseTestEnv = async () => {
  return await initializeTestEnvironment({
    projectId: "test-project",
    firestore: {
      rules: readFileSync(firebaseConfig.firestore.rules, "utf-8"),
      port: firebaseConfig.emulators.firestore.port,
      host: "localhost",
    },
  });
};
