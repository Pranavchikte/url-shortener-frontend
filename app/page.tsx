// app/page.tsx
"use client";

import { useState } from "react";
import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/hero";
import { ShortenForm } from "@/components/shorten-form";
import { RecentLinksTable } from "@/components/recent-links-table";
import { shortenUrl, ShortenedURL } from "@/lib/api"; // Assumes lib/api.ts exists
import toast from "react-hot-toast";

export default function HomePage() {
  // Central state for all links created in this session
  const [links, setLinks] = useState<ShortenedURL[]>([]);

  // Function to pass to the form for making the API call
  const handleShortenUrl = async (originalUrl: string) => {
    try {
      const newLink = await shortenUrl(originalUrl);
      // Add the newly created link to the top of our list
      setLinks((prevLinks) => [newLink, ...prevLinks]);
      toast.success("Link shortened successfully!");
    } catch (error) {
      toast.error("Failed to shorten link. Please check the URL and try again.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <NavBar />
      <Hero />
      <div className="mt-8">
        {/* We pass the handler function to your original form */}
        <ShortenForm onUrlShortened={handleShortenUrl} />
      </div>
      <div className="mt-16 pb-16">
        {/* The table will now display the live data from our state */}
        <RecentLinksTable links={links} />
      </div>
    </main>
  );
}