import { useState } from 'react';
import api from '../api/axios'; // Ensure this path is correct

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
}

interface Token {
  access_token: string;
  token_type: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async (token: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get<User>('/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
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

      const response = await api.post<Token>('/token', formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      console.log("Token set:", access_token);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
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
      setError(err.response?.data?.detail || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = (): void => {
    localStorage.removeItem('token');
    setUser(null);
    console.log("User signed out, token removed");
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    fetchUserDetails,
    userExists, // Expose the userExists function
  };
};

export default useAuth;