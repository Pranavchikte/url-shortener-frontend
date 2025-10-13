// components/shorten-form.tsx
"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import toast from "react-hot-toast";

interface ShortenFormProps {
  onUrlShortened: (originalUrl: string) => Promise<void>;
}

export function ShortenForm({ onUrlShortened }: ShortenFormProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const placeholders = [
    "Enter your long link to shorten it",
    "Paste a link from YouTube",
    "Got a long Google Docs URL?",
    "Shorten your GitHub repository link",
    "Make your links tiny and easy to share",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // FIX: Use isLoading to prevent multiple submissions while one is in progress.
    if (isLoading) return;

    if (!url.trim()) {
      // FIX: Use the toast variable to show an error message.
      toast.error("Please enter a URL to shorten.");
      return;
    }

    setIsLoading(true);
    await onUrlShortened(url.trim());
    setIsLoading(false);
    setUrl("");
  };

  return (
    <div className="flex w-full flex-col items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}