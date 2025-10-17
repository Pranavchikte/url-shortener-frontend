// app/dashboard/page.tsx
"use client";

import { useState, useMemo } from "react";
import { NavBar } from "@/components/nav-bar";
import { DashboardTable } from "@/components/dashboard-table";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { toggleLinkStatus, deleteLink, ShortenedURL } from "@/lib/api";
import toast from "react-hot-toast";
import { TableSkeleton } from "@/components/TableSkeleton";
import { QRCodeModal } from "@/components/QRCodeModal";
import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { toDataURL } from 'qrcode';
import { cn } from "@/lib/utils";
import { useLinks } from "@/app/contexts/LinksContext";

export default function DashboardPage() {
  const { links, isLoading, updateLink, removeLink } = useLinks();
  
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<ShortenedURL | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const handleToggleStatus = async (shortCode: string) => {
    try {
      const updatedLink = await toggleLinkStatus(shortCode);
      updateLink(updatedLink); 
      toast.success(`Link is now ${updatedLink.is_active ? 'active' : 'inactive'}.`);
    } catch (_error) { // <-- FIX #1 IS HERE
      toast.error("Failed to update link status.");
    }
  };

  const handleShowQRCode = async (link: ShortenedURL) => {
    setSelectedLink(link);
    try {
      const dataUrl = await toDataURL(link.short_url, {
        width: 256,
        margin: 2,
        color: { dark: "#FFFFFF", light: "#18181B" },
      });
      setQrCodeDataUrl(dataUrl);
      setIsQrModalOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate QR code.");
    }
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
    setSelectedLink(null);
    setQrCodeDataUrl('');
  };

  const handleOpenDeleteDialog = (link: ShortenedURL) => {
    setSelectedLink(link);
    setIsDeleteDialogOpen(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setSelectedLink(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteLink = async () => {
    if (!selectedLink) return;

    try {
      await deleteLink(selectedLink.short_code);
      removeLink(selectedLink.short_code); 
      toast.success("Link deleted successfully!");
    } catch (_error) { // <-- FIX #2 IS HERE
      toast.error("Failed to delete link.");
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const filteredLinks = useMemo(() => {
    if (filter === 'active') {
      return links.filter(link => link.is_active);
    }
    if (filter === 'inactive') {
      return links.filter(link => !link.is_active);
    }
    return links;
  }, [links, filter]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background">
        <NavBar />
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Your Links</h1>
              <p className="mt-2 text-muted-foreground">
                Manage and track all your shortened links in one place.
              </p>
            </div>

            <div className="mb-6 flex items-center gap-2">
              <button onClick={() => setFilter('all')} className={cn("rounded-full px-4 py-2 text-sm font-medium transition-colors", filter === 'all' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700')}>All</button>
              <button onClick={() => setFilter('active')} className={cn("rounded-full px-4 py-2 text-sm font-medium transition-colors", filter === 'active' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700')}>Active</button>
              <button onClick={() => setFilter('inactive')} className={cn("rounded-full px-4 py-2 text-sm font-medium transition-colors", filter === 'inactive' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700')}>Inactive</button>
            </div>
            
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <DashboardTable 
                links={filteredLinks}
                onToggleStatus={handleToggleStatus}
                onShowQRCode={handleShowQRCode}
                onDeleteLink={handleOpenDeleteDialog}
              />
            )}
          </div>
        </section>

        <QRCodeModal 
          isOpen={isQrModalOpen} 
          onClose={handleCloseQrModal}
          link={selectedLink}
          qrCodeDataUrl={qrCodeDataUrl}
        />

        <ConfirmDeleteModal
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteLink}
        />
      </main>
    </ProtectedRoute>
  );
}