/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios'; // Ensure this path is correct

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  bio: string;
  is_active: boolean;
  is_superuser: boolean;
}

interface Token {
  access_token: string;
  token_type: string;
}

interface DecodedToken {
  exp: number;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

  const fetchUserDetails = async (token: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get<User>('/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    } finally {
      setLoading(false);
    }
  };

  const userExists = (): boolean => {
    return user !== null;
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);  // Use "username" for OAuth2 and set it to the email
      formData.append("password", password);

      const response = await api.post<Token>('users/token', formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      console.log("Token set:", access_token);
      fetchUserDetails(access_token);
    } catch (err: any) {
      if (err.message === "Network Error" || err.message.includes("ERR_CONNECTION_REFUSED")) {
        setError("Сервер недоступен. Пожалуйста, попробуйте позже.");
      } else {
        setError(err.response?.data?.detail || err.message);
      }
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: { email: string; password: string; first_name: string; last_name: string }): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.post<User>('/users/', userData);
      console.log("User signed up:", userData);
    } catch (err: any) {
      if (err.message === "Network Error" || err.message.includes("ERR_CONNECTION_REFUSED")) {
        setError("Сервер недоступен. Пожалуйста, попробуйте позже.");
      } else {
        setError(err.response?.data?.detail || err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    setIsAuthenticated(false);
    console.log("User signed out, token removed");
  };

  const updateUser = async (id: number | undefined, userData: Partial<User>): Promise<void> => {
    if (!id) throw new Error("User ID is required");
    setLoading(true);
    setError(null);
    try {
      const response = await api.put<User>(`/users/${id}`, userData);
      setUser(response.data);
      console.log("User updated:", response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        setLoading(false);
      } else {
        fetchUserDetails(token);
      }
    } else {
      setLoading(false);
    }
  }, []); // Only run once when the component is mounted

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateUser,
    fetchUserDetails,
    userExists,
  };
};

export default useAuth;