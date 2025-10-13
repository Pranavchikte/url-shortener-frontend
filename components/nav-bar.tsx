// components/nav-bar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

export function NavBar() {
  // FIX: Removed unused 'active' and 'setActive' state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 mx-auto transition-all duration-300 ease-in-out",
        scrolled ? "top-6 max-w-3xl" : "top-0 max-w-full"
      )}
    >
      <Menu
        setActive={() => {}} // Pass an empty function as setActive is required by the Menu component
        className={cn(
          "flex items-center justify-between gap-4 border-transparent",
          scrolled
            ? "rounded-full border dark:border-white/[0.2] bg-white dark:bg-black shadow-lg"
            : "border-none bg-transparent shadow-none"
        )}
      >
        <Link href="/" className="ml-4 text-lg font-bold brand-gradient-text">
          Linkly
        </Link>
        <div className="flex items-center justify-center gap-4">
          <MenuItem setActive={() => {}} active={null} item="Features">
            <div className="flex flex-col space-y-4 p-4 text-sm">
              <HoveredLink href="/#features">URL Shortening</HoveredLink>
              <HoveredLink href="/#features">Custom Links</HoveredLink>
              <HoveredLink href="/#features">Analytics & Tracking</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={() => {}} active={null} item="Pricing">
            <div className="flex flex-col space-y-4 p-4 text-sm">
              <HoveredLink href="/pricing">Hobby</HoveredLink>
              <HoveredLink href="/pricing">Pro</HoveredLink>
              <HoveredLink href="/pricing">Enterprise</HoveredLink>
            </div>
          </MenuItem>
          <HoveredLink href="/dashboard">Dashboard</HoveredLink>
        </div>
        <Button className="mr-4 rounded-full" size="sm">
          Get Started
        </Button>
      </Menu>
    </div>
  );
}