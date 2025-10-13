// components/shorten-form.tsx
"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
// The ResultCard is no longer needed here, as the table will show all results.
import toast from "react-hot-toast";

// Define the props our component will accept from the parent page
interface ShortenFormProps {
  onUrlShortened: (originalUrl: string) => Promise<void>;
}

export function ShortenForm({ onUrlShortened }: ShortenFormProps) {
  // This state is only for the input field itself
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

  // This is the key change: we replace the fake logic with our API call
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    // Call the function passed down from app/page.tsx
    await onUrlShortened(url.trim());
    setIsLoading(false);
    setUrl(""); // Clear the input after submission
  };

  return (
    <div className="flex w-full flex-col items-center px-4">
      {/* Your original, styled input component remains unchanged */}
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      
      {/* We no longer show a single result card here. The table below will show all results. */}
    </div>
  );
}