// components/nav-bar.tsx
"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useAuth } from "@/app/contexts/AuthContext"; // Import our auth hook
import { LogoutButton } from "./LogoutButton"; // Import our new logout button
import {
  IconHome,
  IconLink,
  IconDashboard,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

export function NavBar() {
  // Get the authentication state from our context
  const { isAuthenticated } = useAuth();

  // Define links that are always visible
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

  // Define links only for authenticated (logged-in) users
  const authLinks = [
    ...baseLinks,
    {
      title: "Dashboard",
      icon: <IconDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/dashboard", // We will build this page next
    },
  ];

  // Define links only for public (logged-out) users
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
      href: "/signup", // Corrected path to match our page
    },
  ];

  // Dynamically choose which set of links to display
  const linksToShow = isAuthenticated ? authLinks : publicLinks;

  return (
    <>
      {/* The FloatingDock now displays the correct links */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <FloatingDock
          mobileClassName="translate-y-0"
          items={linksToShow}
        />
      </div>
      
      {/* The LogoutButton only appears if the user is logged in */}
      {isAuthenticated && <LogoutButton />}
    </>
  );
}