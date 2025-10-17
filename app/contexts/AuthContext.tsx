// app/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, AuthCredentials, AuthResponse } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Define the shape of our context's state
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // When the app loads, try to get the token from localStorage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (credentials: AuthCredentials) => {
    try {
      const response = await loginUser(credentials);
      setToken(response.access_token);
      // Store the token in localStorage to persist the session
      localStorage.setItem('authToken', response.access_token);
      toast.success("Logged in successfully!");
      // Redirect to the home page after login
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
      throw error; // Re-throw the error so the form can handle its loading state
    }
  };

  const logout = () => {
    setToken(null);
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    toast.success("Logged out successfully.");
    router.push('/login');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};