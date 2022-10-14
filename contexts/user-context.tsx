import { createFirebaseApp } from "@/firebase/client-app";
import type { User } from "@firebase/auth";
import { createContext, ReactNode } from "react";
import { useAuth } from "../hooks/use-auth";

type ProviderProps = {
  user?: User;
  loading: boolean;
};

export const UserContext = createContext<ProviderProps>({ loading: true });

type UserProviderProps = {
  children?: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  createFirebaseApp();
  const [user, loading] = useAuth();

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
