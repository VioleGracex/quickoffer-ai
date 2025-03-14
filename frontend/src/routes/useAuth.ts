import { useState } from "react";
import api from "../api/axios";

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sign-In Function
  const signIn = async (email: string, password: string): Promise<any> => {
    setLoading(true);
    setError(null);
    try {
      // Create the form data in URL-encoded format
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      // Request to the /token endpoint with application/x-www-form-urlencoded
      const response = await api.post<any>("/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.access_token);
      return response.data; // Return the response (containing the access token)
    } catch (err) {
      // Handle error
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign-Up Function
  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<any> => {
    setLoading(true);
    setError(null);
    try {
      // Request to the /users/ endpoint to create a new user
      const response = await api.post<any>("/users/", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // Return the user data from the response
    } catch (err) {
      // Handle error
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
  };

  return { signIn, signUp, logout, loading, error };
};

export default useAuth;
