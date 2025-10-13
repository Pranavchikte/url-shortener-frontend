"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, QrCode, BarChartBig as ChartBarBig } from "lucide-react"
import toast from "react-hot-toast" // Replaced with react-hot-toast

type Props = {
  shortUrl: string
  originalUrl: string
  createdAt: Date
}

export function ResultCard({ shortUrl, originalUrl, createdAt }: Props) {
  // Removed useToast hook
  const [qr, setQr] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { toDataURL } = await import("qrcode")
        const dataUrl = await toDataURL(shortUrl, {
          width: 128,
          margin: 1,
          color: { dark: "#ffffff", light: "#00000000" },
        })
        if (!cancelled) setQr(dataUrl)
      } catch {
        setQr(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [shortUrl])

  return (
    <Card className="glass-card mx-auto mt-6 max-w-3xl">
      <CardHeader>
        <CardTitle className="text-left text-sm text-muted-foreground">Your shortened link is ready</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="min-w-0">
          <div className="truncate font-mono text-xl">{shortUrl}</div>
          <a
            href={originalUrl}
            target="_blank"
            rel="noreferrer"
            className="truncate text-sm text-muted-foreground hover:underline"
            title={originalUrl}
          >
            {originalUrl}
          </a>
          <div className="mt-1 text-xs text-muted-foreground/80">Created {createdAt.toLocaleString()}</div>
        </div>

        <div className="flex items-center gap-3">
          {qr ? (
            <a href={qr} download="qrcode.png" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qr || "/placeholder.svg"}
                alt="QR code for short url"
                className="h-20 w-20 rounded-md border border-border/50"
              />
            </a>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-md border border-border/50 text-xs text-muted-foreground">
              <QrCode className="h-5 w-5" />
            </div>
          )}

          <Button
            variant="secondary"
            className="rounded-full"
            onClick={async () => {
              await navigator.clipboard.writeText(shortUrl)
              toast.success("Short URL copied to clipboard.") // Updated toast call
            }}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>

          <a href="/analytics" className="hidden md:block">
            <Button className="rounded-full">
              <ChartBarBig className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </a>
        </div>
      </CardContent>
      <CardFooter className="md:hidden">
        <a href="/analytics" className="w-full">
          <Button className="w-full rounded-full">
            <ChartBarBig className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}