// components/ProtectedRoute.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // This effect runs when the component mounts.
    // If the user is not authenticated, it redirects them to the login page.
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // If the user is authenticated, render the children (the actual page content).
  // Otherwise, render a loading message or null to prevent a flash of content.
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <p className="text-white text-center mt-20">Loading...</p>;
}