// app/page.tsx
"use client";

import { useMemo } from "react";
import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/hero";
import { ShortenForm } from "@/components/shorten-form";
import { RecentLinksTable } from "@/components/recent-links-table";
import { shortenUrl } from "@/lib/api";
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useLinks } from "@/app/contexts/LinksContext";

export default function HomePage() {
  const { links, addLink } = useLinks();

  const handleShortenUrl = async (originalUrl: string) => {
    try {
      const newLink = await shortenUrl(originalUrl);
      addLink(newLink); // <-- THE FIX IS HERE. This adds the new link to the UI.
      toast.success("Link shortened successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  
  const recentActiveLinks = useMemo(() => {
    return links
      .filter(link => link.is_active)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }, [links]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        <NavBar />
        <Hero />
        <div className="mt-8">
          <ShortenForm onUrlShortened={handleShortenUrl} />
        </div>
        <div className="mt-16 pb-16">
          <RecentLinksTable links={recentActiveLinks} />
        </div>
      </main>
    </ProtectedRoute>
  );
}