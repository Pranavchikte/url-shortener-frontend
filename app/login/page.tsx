// app/login/page.tsx
"use client";

import { AuthFormComponent } from "@/components/auth-form";
import { AuthCredentials } from "@/lib/auth";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext"; // <-- IMPORT OUR NEW HOOK

export default function LoginPage() {
  const auth = useAuth(); // <-- GET THE CONTEXT

  const handleLogin = async (credentials: AuthCredentials) => {
    // Call the login function from the context
    await auth.login(credentials);
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