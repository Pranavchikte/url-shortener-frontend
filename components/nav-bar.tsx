"use client";

import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconChartBar,
  IconLink,
  IconDashboard,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

export function NavBar() {
  // State to track active menu item (preserved from original)
  const [active, setActive] = useState<string | null>(null);

  // Define navigation links with all important routes
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Features",
      icon: (
        <IconLink className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/#features",
    },
    {
      title: "Analytics",
      icon: (
        <IconChartBar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/#features",
    },
    {
      title: "Pricing",
      icon: (
        <div className="flex h-full w-full items-center justify-center text-lg font-bold text-neutral-500 dark:text-neutral-300">
          $
        </div>
      ),
      href: "/pricing",
    },
    {
      title: "Dashboard",
      icon: (
        <IconDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "Login",
      icon: (
        <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/login",
    },
    {
      title: "Register",
      icon: (
        <IconUserPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/register",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <FloatingDock
        // Position at bottom center for mobile/desktop accessibility
        mobileClassName="translate-y-0"
        items={links}
      />
    </div>
  );
}