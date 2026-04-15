import type { User } from "@/types";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextValue {
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
  register: (
    email: string,
    name: string,
    password: string,
    isVendor: boolean,
  ) => { success: boolean; error?: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface StoredUser extends User {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  return JSON.parse(localStorage.getItem("eventiq_users") ?? "[]");
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem("eventiq_users", JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("eventiq_session");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("eventiq_session", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("eventiq_session");
    }
  }, [currentUser]);

  function login(
    email: string,
    password: string,
  ): { success: boolean; error?: string } {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) return { success: false, error: "Invalid email or password." };
    const { password: _pw, ...user } = found;
    setCurrentUser(user);
    return { success: true };
  }

  function logout(): void {
    setCurrentUser(null);
  }

  function register(
    email: string,
    name: string,
    password: string,
    isVendor: boolean,
  ): { success: boolean; error?: string } {
    const users = getStoredUsers();
    if (users.some((u) => u.email === email)) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }
    const newUser: StoredUser = { email, name, password, isVendor };
    saveStoredUsers([...users, newUser]);
    const { password: _pw, ...user } = newUser;
    setCurrentUser(user);
    return { success: true };
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
