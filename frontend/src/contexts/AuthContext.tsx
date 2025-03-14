import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../api/axios"; // Ensure this path is correct

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking a token in local storage)
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found in localStorage:", token);
      checkUserExists(token);
    } else {
      console.log("No token found in localStorage.");
    }
  }, []);

  const checkUserExists = async (token: string) => {
    try {
      console.log("Checking if user exists with token:", token);
      const response = await api.get("/users/me", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      console.error(response.status);
      if (response.status === 200) {
        console.log("User exists. Setting isAuthenticated to true.");
        setIsAuthenticated(true);
      } else {
        console.log("User does not exist or invalid token. Signing out.");
        signOut();
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      signOut(); // Force sign out if the user does not exist
    }
  };


  const signIn = () => {
    // Perform login logic and set isAuthenticated to true
    console.log("Logging in. Setting isAuthenticated to true.");
    setIsAuthenticated(true);
  };

  const signOut = () => {
    // Perform logout logic and set isAuthenticated to false
    console.log("Logging out. Removing token from localStorage and setting isAuthenticated to false.");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}