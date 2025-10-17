"use client"

import type React from "react"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
// import { useSearchParams } from "next/navigation"
import Toaster from "@/components/ui/toaster"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const searchParams = useSearchParams()

  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
          {/* eslint-disable-next-line @next/next/no-head-element */}
          <div id="toaster-root">{Toaster()}</div>
        </Suspense>
      </body>
    </html>
  )
}
