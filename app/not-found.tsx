import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">404</p>
        <h1 className="brand-gradient-text mt-2 text-4xl font-bold md:text-5xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <Link href="/">
            <Button className="rounded-full">Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
