"use client";

import { useMemo } from "react";
import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/hero";
import { ShortenForm } from "@/components/shorten-form";
import { RecentLinksTable } from "@/components/recent-links-table";
import { shortenUrl } from "@/lib/api";
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useLinks } from "@/app/contexts/LinksContext"; // FIX: Import the new useLinks hook

export default function HomePage() {
  // FIX: Get the master list of links and the 'addLink' function from our global context.
  const { links, addLink } = useLinks();

  // FIX: This function now calls the API and then updates the global state.
  const handleShortenUrl = async (originalUrl: string) => {
    try {
      const newLink = await shortenUrl(originalUrl);
      // Update the central "whiteboard" with the new link.
      addLink(newLink);
      toast.success("Link shortened successfully!");
    } catch (error: any) {
      if (error.response?.status !== 401) {
        toast.error(error.message || "Failed to shorten link.");
      }
    }
  };
  
  // FIX: Create a derived list of the 5 most recent active links from the global state.
  const recentActiveLinks = useMemo(() => {
    return links
      .filter(link => link.is_active) // Only include active links
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) // Sort by newest first
      .slice(0, 5); // Take the first 5
  }, [links]); // This list will automatically recalculate whenever the global 'links' state changes.

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        <NavBar />
        <Hero />
        <div className="mt-8">
          <ShortenForm onUrlShortened={handleShortenUrl} />
        </div>
        <div className="mt-16 pb-16">
          {/* Pass the newly derived recent links to the table */}
          <RecentLinksTable links={recentActiveLinks} />
        </div>
      </main>
    </ProtectedRoute>
  );
}