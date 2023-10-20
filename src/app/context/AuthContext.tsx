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
  loadTasks: () => void;
  tasks: any;
  tasksToDo: any;
  tasksInProgress: any;
  tasksReview: any;
  tasksDone: any;
}

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [tasks, setTasks] = useState([] as any);
  const router = useRouter();

  const tasksToDo = tasks.filter((task: any) => task.status === "TODO");
  const tasksInProgress = tasks.filter(
    (task: any) => task.status === "IN_PROGRESS"
  );
  const tasksReview = tasks.filter((task: any) => task.status === "REVIEW");
  const tasksDone = tasks.filter((task: any) => task.status === "DONE");

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      api
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setUser(data.data);
        })
        .catch((error: any) => {
          console.log(error.response);
          destroyCookie(null, "token");
          router.push("/login");
        });
    }
    // eslint-disable-next-line
  }, []);

  const loadTasks = () => {
    if (user) {
      api
        .get(`/tasks/all/${user.id}`)
        .then(({ data }) => {
          setTasks(data.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line
  }, [user]);

  const signOut = () => {
    destroyCookie(null, "token");
    setUser({} as User);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signOut,
        loadTasks,
        tasks,
        tasksToDo,
        tasksDone,
        tasksInProgress,
        tasksReview,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
