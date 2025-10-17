"use client";

import { AuthFormComponent } from "@/components/auth-form";
import { AuthCredentials } from "@/lib/auth";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext"; 
import toast from "react-hot-toast";

export default function LoginPage() {
  const auth = useAuth(); // <-- GET THE CONTEXT

  const handleLogin = async (credentials: AuthCredentials) => {
    try {
      await auth.login(credentials);
    } catch (error: unknown) { // <-- FIX IS HERE
      // Type guard to ensure 'error' is an object with a 'message' property
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred during login.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <AuthFormComponent mode="login" onSubmit={handleLogin} />
      <p className="text-center text-sm text-neutral-400 mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}