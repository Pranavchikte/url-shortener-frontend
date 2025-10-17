// components/nav-bar.tsx
"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useAuth } from "@/app/contexts/AuthContext";
import { LogoutButton } from "./LogoutButton";
import {
  IconHome,
  IconLink,
  IconDashboard, // <-- Make sure this is imported
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

export function NavBar() {
  const { isAuthenticated } = useAuth();

  const baseLinks = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "Features",
      icon: <IconLink className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/#features",
    },
  ];

  // FIX: Added the "Dashboard" link to the authenticated user's navigation.
  const authLinks = [
    ...baseLinks,
    {
      title: "Dashboard",
      icon: <IconDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/dashboard", 
    },
  ];

  const publicLinks = [
    ...baseLinks,
    {
      title: "Login",
      icon: <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/login",
    },
    {
      title: "Register",
      icon: <IconUserPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/signup",
    },
  ];

  const linksToShow = isAuthenticated ? authLinks : publicLinks;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <FloatingDock
          mobileClassName="translate-y-0"
          items={linksToShow}
        />
      </div>
      
      {isAuthenticated && <LogoutButton />}
    </>
  );
}