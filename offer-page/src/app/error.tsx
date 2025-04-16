// app/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-[hsl(var(--destructive))]" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Something went wrong!</h2>
        <p className="text-muted-foreground">
          An error occurred while loading the dashboard. Please try again.
        </p>
        <Button onClick={() => reset()} variant="default">Try again</Button>
      </div>
    </div>
  )
}