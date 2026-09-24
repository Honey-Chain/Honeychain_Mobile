import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/src/api/auth-storage";

type AuthContextValue = {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await getAccessToken();

        setTokenState(storedToken);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const setToken = async (newToken: string) => {
    await setAccessToken(newToken);

    setTokenState(newToken);
  };

  const logout = async () => {
    await removeAccessToken();

    setTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        isAuthenticated: Boolean(token),
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}