"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext'; // We need to know if the user is authenticated
import { getUserLinks, ShortenedURL } from '@/lib/api'; // Import the fetch function and type

// Define the shape of our new context
interface LinksContextType {
  links: ShortenedURL[];
  isLoading: boolean;
  addLink: (newLink: ShortenedURL) => void;
  updateLink: (updatedLink: ShortenedURL) => void;
  removeLink: (shortCode: string) => void;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export const LinksProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<ShortenedURL[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // This effect fetches all links when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      getUserLinks()
        .then(data => {
          setLinks(data);
        })
        .catch(error => {
          console.error("Failed to fetch links for context:", error);
          // Don't show a toast here to avoid annoying the user on every load
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If the user logs out, clear the links from state
      setLinks([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]); // This effect re-runs whenever the user's auth state changes

  // Function to add a new link to our central list
  const addLink = (newLink: ShortenedURL) => {
    setLinks(prevLinks => [newLink, ...prevLinks]);
  };

  // Function to update an existing link in our list
  const updateLink = (updatedLink: ShortenedURL) => {
    setLinks(prevLinks => 
      prevLinks.map(link => 
        link.short_code === updatedLink.short_code ? updatedLink : link
      )
    );
  };

  // Function to remove a link from our list
  const removeLink = (shortCode: string) => {
    setLinks(prevLinks => prevLinks.filter(link => link.short_code !== shortCode));
  };

  return (
    <LinksContext.Provider value={{ links, isLoading, addLink, updateLink, removeLink }}>
      {children}
    </LinksContext.Provider>
  );
};

// Custom hook to easily use the LinksContext
export const useLinks = () => {
  const context = useContext(LinksContext);
  if (context === undefined) {
    throw new Error('useLinks must be used within a LinksProvider');
  }
  return context;
};
