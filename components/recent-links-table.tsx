// components/recent-links-table.tsx
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, ExternalLink } from "lucide-react"; // FIX: Import ExternalLink
import toast from "react-hot-toast";
import { ShortenedURL } from "@/lib/api";

interface RecentLinksTableProps {
  links: ShortenedURL[];
}

// FIX: Add the truncateUrl helper function
function truncateUrl(url: string, maxLength = 40): string {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + "...";
}

export function RecentLinksTable({ links }: RecentLinksTableProps) {
  if (links.length === 0) {
    return (
      <div className="mx-auto mt-10 w-full max-w-5xl px-4 text-center">
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
                      className="inline-flex items-center gap-2 truncate hover:underline text-zinc-300"
                    >
                      <span className="text-zinc-400">sho.rt/</span>
                      <span className="text-white font-bold">{link.short_code}</span>
                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                    </a>
                  </div>
                </TableCell>
                <TableCell className="truncate">
                  {/* FIX: Apply the same truncation and styling as the dashboard */}
                  <a 
                    href={link.original_url} 
                    target="_blank" 
                    rel="noreferrer"
                    title={link.original_url} 
                    className="inline-flex items-center gap-2 hover:underline text-zinc-400"
                  >
                    {truncateUrl(link.original_url, 40)}
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
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