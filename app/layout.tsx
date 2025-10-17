// app/layout.tsx
import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Toaster } from "react-hot-toast"; // Use react-hot-toast's Toaster
import { AuthProvider } from "./contexts/AuthContext"; // <-- IMPORT OUR NEW PROVIDER

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* WRAP THE ENTIRE APP WITH THE AUTH PROVIDER */}
        <AuthProvider>
          {children}
          <Toaster position="bottom-center" />
        </AuthProvider>
      </body>
    </html>
  )
}