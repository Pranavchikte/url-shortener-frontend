// components/LogoutButton.tsx
"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { IconLogout } from "@tabler/icons-react";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Logout"
    >
      <IconLogout className="h-6 w-6" />
    </button>
  );
}