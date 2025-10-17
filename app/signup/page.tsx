// app/signup/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { AuthFormComponent } from "@/components/auth-form";
import { registerUser, AuthCredentials } from "@/lib/auth";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (credentials: AuthCredentials) => {
    try {
      await registerUser(credentials);
      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    } catch (error: unknown) { // <-- FIX IS HERE
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred during sign up.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <AuthFormComponent mode="signup" onSubmit={handleSignUp} />
      <p className="text-center text-sm text-neutral-400 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}