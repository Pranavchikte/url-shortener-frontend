"use client";

import { Copy, ExternalLink, QrCode, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { ShortenedURL } from "@/lib/api";
import { Switch } from "./ui/switch";
import Link from "next/link";

interface DashboardTableProps {
  links: ShortenedURL[];
  onToggleStatus: (shortCode: string) => void;
  onShowQRCode: (link: ShortenedURL) => void;
  onDeleteLink: (link: ShortenedURL) => void;
}

function truncateUrl(url: string, maxLength = 40): string {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + "...";
}

export function DashboardTable({ links, onToggleStatus, onShowQRCode, onDeleteLink }: DashboardTableProps) {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Short link copied to clipboard.");
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-lg">
        <Link className="mx-auto h-12 w-12 text-zinc-500" href="/" />
        <h3 className="mt-4 text-lg font-semibold text-white">No links yet</h3>
        <p className="mt-2 text-sm text-zinc-400">
          You haven&apos;t created any short links. Get started by creating your first one.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-zinc-200"
          >
            Shorten a Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/50">
            <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">Short Link</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">Original Link</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">Status</th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr
              key={link.short_code}
              className={`transition-colors hover:bg-white/5 ${
                index !== links.length - 1 ? "border-b border-border/30" : ""
              }`}
            >
              <td className="px-4 py-4">
                <a
                  href={link.short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline"
                >
                  <span className="text-zinc-400">sho.rt/</span>
                  <span className="text-white font-bold">{link.short_code}</span>
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                </a>
              </td>
              <td className="px-4 py-4">
                <a
                  href={link.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.original_url}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  {truncateUrl(link.original_url, 40)}
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                </a>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-center">
                  <Switch
                    checked={link.is_active}
                    onCheckedChange={() => onToggleStatus(link.short_code)}
                    aria-label="Toggle link status"
                  />
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleCopy(link.short_url)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-white/10 hover:border-primary/50 active:scale-95"
                    aria-label="Copy short link"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onShowQRCode(link)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-white/10 hover:border-primary/50 active:scale-95"
                    aria-label="Show QR code"
                  >
                    <QrCode className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteLink(link)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-transparent bg-transparent p-2 text-xs font-medium text-red-500 transition-all hover:bg-red-500/10 active:scale-95"
                    aria-label="Delete link"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
