"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Copy, QrCode, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for clicks per day (last 14 days)
const clicksPerDay = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  clicks: Math.floor(Math.random() * 200) + 20,
}))

// Mock data for recent clicks
const recentClicks = [
  { ts: "2 mins ago", ip: "192.168.0.1", ref: "twitter.com", device: "Chrome on Windows", qr: false },
  { ts: "10 mins ago", ip: "66.249.66.1", ref: "google.com", device: "Safari on iOS", qr: true },
  { ts: "1 hour ago", ip: "10.0.0.2", ref: "direct", device: "Firefox on Linux", qr: false },
]

export default function AnalyticsPage() {
  // State to track if URL was copied
  const [copied, setCopied] = useState(false)
  
  // Sample URLs for demonstration
  const original = "https://example.com/some/very/long/url"
  const short = (typeof window !== "undefined" ? window.location.origin : "https://sho.rt") + "/bn41a"

  // Handle copy to clipboard functionality
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(short)
      setCopied(true)
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      {/* Sticky header with back button and title */}
      <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-border/50 bg-background/60 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <Link href="/" className="absolute left-4">
            <Button variant="secondary" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h2 className="text-center text-lg font-semibold md:text-xl">Analytics Dashboard</h2>
        </div>
      </div>

      {/* URL info card */}
      <Card className="glass-card">
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-base text-muted-foreground">Link Overview</CardTitle>
          <Badge>Active</Badge>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="min-w-0">
            <div className="font-mono text-xl">{short}</div>
            <a
              href={original}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
            >
              {original}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Short URL
                </>
              )}
            </Button>
            <Button className="rounded-full" asChild>
              <Link href="/">Create New Link</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4,813</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Last Clicked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2 minutes ago</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">QR Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-3xl font-bold">
              128
              <QrCode className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart card */}
      <Card className="glass-card mt-6">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Clicks per Day</CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ChartContainer config={{ clicks: { label: "Clicks", color: "hsl(var(--chart-1))" } }} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clicksPerDay} margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="clicks" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent clicks table */}
      <Card className="glass-card mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Recent Clicks</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Timestamp</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Referrer</TableHead>
              <TableHead>Device / QR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentClicks.map((c, i) => (
              <TableRow key={i} className="transition-colors hover:bg-white/5">
                <TableCell>{c.ts}</TableCell>
                <TableCell className="font-mono">{c.ip}</TableCell>
                <TableCell className="truncate">{c.ref}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <span className="text-muted-foreground">{c.device}</span>
                  {c.qr && <QrCode className="h-4 w-4 text-muted-foreground" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  )
}