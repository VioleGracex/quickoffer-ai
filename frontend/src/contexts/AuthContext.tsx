import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import useAuth from "../routes/useAuth";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticationStatus: (status: boolean) => void; // Function to set auth status
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { signOut, userExists, user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking a token in local storage)
    const token = localStorage.getItem('token');
    console.log(userExists());
    if (token && userExists()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]); // Re-run this effect when `user` changes

  const setAuthenticationStatus = (status: boolean) => {
    setIsAuthenticated(status);
    if (!status) {
      //signOut();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticationStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}