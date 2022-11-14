import Router from "next/router";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";

import { apiAuth, apiQuestions } from "../services/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";

interface IProviderData {
  children: ReactNode;
}

interface IUserData {
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface ILoginUser {
  email: string;
  password: string;
}

interface IAuthContextData {
  signOut: () => void;
  user: IUserData;
  signIn({ email, password }: ILoginUser): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

export function signOut() {
  destroyCookie(null, "answered:token")

  Router.push("/login")
}

export function AuthProvider({ children }: IProviderData) {

  const [user, setUser] = useState<IUserData>()

  useEffect(() => {
    const { "answered:token": token } = parseCookies()

    if (token) {
      apiAuth.get("/profile").then(res => {
        const { data } = res

        setUser(data)
      })
    }
  }, [])

  async function signIn({ email, password }: ILoginUser) {
    const { data } = await apiAuth.post("/login", { email, password })

    setUser(data.user)

    setCookie(undefined, "answered:token", data.token, {
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: "/"
    })

    apiQuestions.defaults.headers["Authorization"] = `Bearer ${data.token}`
    apiAuth.defaults.headers["Authorization"] = `Bearer ${data.token}`

    Router.push("/home")
  }

  return (
    <AuthContext.Provider value={{ signOut, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)