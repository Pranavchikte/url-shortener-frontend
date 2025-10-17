// components/QRCodeModal.tsx
"use client";

import { X, Download } from "lucide-react";
import { ShortenedURL } from "@/lib/api";
import Image from "next/image"; // Use Next.js Image for optimization

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: ShortenedURL | null;
  qrCodeDataUrl: string; // FIX: Add a prop to receive the QR code image data
}

export function QRCodeModal({ isOpen, onClose, link, qrCodeDataUrl }: QRCodeModalProps) {
  if (!isOpen || !link) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative rounded-lg bg-zinc-900 p-8 shadow-xl border border-zinc-800 w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold text-white">Your QR Code</h2>
        <p className="mt-2 text-sm text-zinc-400">Scan this code to access your short link.</p>

        <div className="mt-6 flex flex-col items-center gap-6">
          {/* FIX: Display the QR code image */}
          {qrCodeDataUrl ? (
            <Image
              src={qrCodeDataUrl}
              alt={`QR Code for ${link.short_url}`}
              width={256}
              height={256}
              className="rounded-md"
            />
          ) : (
            <div className="h-64 w-64 bg-zinc-800 rounded-md flex items-center justify-center">
              <p className="text-zinc-500">Generating...</p>
            </div>
          )}

          {/* FIX: Add a download button */}
          <a
            href={qrCodeDataUrl}
            download={`${link.short_code}-qrcode.png`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-zinc-200"
          >
            <Download className="h-4 w-4" />
            Download QR Code
          </a>
        </div>
      </div>
    </div>
  );
}