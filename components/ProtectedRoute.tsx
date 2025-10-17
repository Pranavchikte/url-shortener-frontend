// components/ProtectedRoute.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Get both isAuthenticated and the new isLoading state
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // IMPORTANT: Only run this check if loading is complete
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // If we are still loading, show a loading message
  if (isLoading) {
    return <p className="text-white text-center mt-20">Authenticating...</p>;
  }

  // If loading is done and the user is authenticated, show the page
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If loading is done and user is not authenticated, render nothing while redirect happens
  return null;
}