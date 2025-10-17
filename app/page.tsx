// app/page.tsx
"use client";

import { useState } from "react";
import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/hero";
import { ShortenForm } from "@/components/shorten-form";
import { RecentLinksTable } from "@/components/recent-links-table";
import { shortenUrl, ShortenedURL } from "@/lib/api";
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/ProtectedRoute"; // <-- IMPORT THE GUARD

export default function HomePage() {
  const [links, setLinks] = useState<ShortenedURL[]>([]);

  const handleShortenUrl = async (originalUrl: string) => {
    try {
      const newLink = await shortenUrl(originalUrl);
      setLinks((prevLinks) => [newLink, ...prevLinks]);
      toast.success("Link shortened successfully!");
    } catch (error) {
      toast.error("Failed to shorten link. Please check the URL and try again.");
    }
  };

  return (
    // WRAP YOUR PAGE CONTENT WITH THE PROTECTEDROUTE COMPONENT
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        <NavBar />
        <Hero />
        <div className="mt-8">
          <ShortenForm onUrlShortened={handleShortenUrl} />
        </div>
        <div className="mt-16 pb-16">
          <RecentLinksTable links={links} />
        </div>
      </main>
    </ProtectedRoute>
  );
}