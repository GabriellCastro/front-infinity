"use client";

import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { api } from "../api/index";
import { User } from "../types/User";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

interface IAuthContext {
  user: User;
  setUser: (user: User) => void;
  signOut: () => void;
}

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      api
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error: any) => {
          console.log(error.response);
          destroyCookie(null, "token");
          router.push("/login");
        });
    }
    // eslint-disable-next-line
  }, []);

  const signOut = () => {
    destroyCookie(null, "token");
    setUser({} as User);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
