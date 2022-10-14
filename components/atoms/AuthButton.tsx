import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { useUser } from "@/hooks/use-user";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export const AuthButton = () => {
  const { user, loading } = useUser();
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth);
  };

  if (loading) {
    return <span>Loading ...</span>;
  }

  if (user) {
    return (
      <button className="hover:underline" onClick={handleSignOut}>
        Sign out
      </button>
    );
  }

  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "redirect",
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  };
  return <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />;
};
