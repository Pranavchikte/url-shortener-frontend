// app/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, AuthCredentials } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // FIX: Implemented the full login logic.
  const login = async (credentials: AuthCredentials) => {
    try {
      const response = await loginUser(credentials);
      setToken(response.access_token);
      localStorage.setItem('authToken', response.access_token);
      toast.success("Logged in successfully!");
      router.push('/'); // Redirect to the homepage after login
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
      throw error;
    }
  };

  // FIX: Implemented the full logout logic.
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    toast.success("Logged out successfully.");
    router.push('/login');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};