// components/ConfirmDeleteModal.tsx
"use client";

import { AlertTriangle} from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative rounded-lg bg-zinc-900 p-8 shadow-xl border border-zinc-800 w-full max-w-md">
        <div className="flex items-start gap-4">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
            <AlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
          </div>
          <div className="mt-0 text-left">
            <h3 className="text-base font-semibold leading-6 text-white">
              Delete Link
            </h3>
            <div className="mt-2">
              <p className="text-sm text-zinc-400">
                Are you sure you want to permanently delete this link? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-row-reverse gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}