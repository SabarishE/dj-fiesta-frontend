import { useToast } from "@chakra-ui/react";
import { NEXT_URL } from "config";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export interface AuthInterface {
  user: string | null;
  error: string | null;
  register: (user: UserInterface) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface UserInterface {
  username: string;
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //   register user

  const register = async (user: UserInterface) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      toast({ title: `Registered successfully`, status: "success" });
      router.push("/account/dashboard");
    } else {
      toast({ title: `${data.message}`, status: "error" });
      setError(data.message);
    }
  };

  //   login user

  const login = async (email: string, password: string) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password: password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
    }
  };

  //   logout user

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    const data = await res.json();

    if (res.ok) {
      setUser(null);
      router.push("/");
    } else {
      setError(data.message);
    }
  };

  //   Check user logged in

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
