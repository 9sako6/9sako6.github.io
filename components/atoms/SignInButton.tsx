import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import Image from "next/image";

export const SignInButton = () => {
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  return (
    <div className="grid place-content-center" data-testid="sign-in-button">
      <div
        className="h-10 w-40 relative"
        role="button"
        onClick={handleGoogleSignIn}
      >
        <Image
          className="cursor-pointer object-contain"
          src="/vendor/btn_google_signin_light_normal_web@2x.png"
          fill
          alt="Sign in with Google"
        />
      </div>
    </div>
  );
};
