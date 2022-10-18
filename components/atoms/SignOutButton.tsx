import { useUser } from "@/hooks/use-user";
import { getAuth, signOut } from "firebase/auth";
import { SignOutIcon } from "../icons/SignOutIcon";
import { LoadingBar } from "../loadings/LoadeingBar";

export const SignOutButton = () => {
  const auth = getAuth();
  const { user, loading } = useUser();
  if (!user && !loading) return null;
  if (loading) return <LoadingBar className="rounded h-3 w-20" />;

  return (
    <button
      className="hover:underline"
      aria-label="sign out button"
      onClick={() => signOut(auth)}
    >
      <span className="flex items-center">
        <SignOutIcon /> Sign out
      </span>
    </button>
  );
};
