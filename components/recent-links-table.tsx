// components/recent-links-table.tsx
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { ShortenedURL } from "@/lib/api";

interface RecentLinksTableProps {
  links: ShortenedURL[];
}

export function RecentLinksTable({ links }: RecentLinksTableProps) {
  if (links.length === 0) {
    return (
      <div className="mx-auto mt-10 w-full max-w-5xl px-4 text-center">
        {/* FIX: Replaced ' with &apos; to fix the unescaped entity error. */}
        <p className="text-zinc-500">You haven&apos;t shortened any links yet. Create one above to see it here!</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl px-4">
      <div className="glass-card overflow-x-auto scrollbar-hide">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-zinc-800">
              <TableHead className="text-zinc-400">Short Link</TableHead>
              <TableHead className="text-zinc-400">Original Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow 
                key={link.short_code} 
                className="transition-colors hover:bg-white/5 border-b border-zinc-800/50"
              >
                <TableCell className="font-mono">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(link.short_url);
                        toast.success("Short link copied!");
                      }}
                      className="inline-flex items-center rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:bg-white/5 transition-colors"
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </button>
                    <a 
                      href={link.short_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="truncate hover:underline text-zinc-300"
                    >
                      {link.short_url}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="truncate">
                  <a 
                    href={link.original_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:underline text-zinc-400"
                  >
                    {link.original_url}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}