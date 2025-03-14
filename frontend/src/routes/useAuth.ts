import { useState, useEffect } from 'react';
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

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<Token>('/token', { email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      await fetchUserDetails(access_token);
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
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    } else {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;
