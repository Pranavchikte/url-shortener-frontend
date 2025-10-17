import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { LinksProvider } from "./contexts/LinksContext"; // FIX: Import the new LinksProvider

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          {/* FIX: Wrap the app with LinksProvider INSIDE AuthProvider */}
          <LinksProvider>
            {children}
            <Toaster position="bottom-center" />
          </LinksProvider>
        </AuthProvider>
      </body>
    </html>
  )
}