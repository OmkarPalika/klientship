'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    console.log('Switching to theme:', newTheme)
    setTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm border-border/40 
                hover:bg-card/90 transition-all duration-300 hover:scale-105 active:scale-95
                hover:shadow-lg hover:border-primary/20 flex items-center justify-center"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        <SunIcon 
          className="absolute h-full w-full text-amber-500 transition-transform duration-500
                     rotate-0 scale-100 dark:-rotate-90 dark:scale-0 light:rotate-0 light:scale-100"
          strokeWidth={2}
        />
        <MoonIcon 
          className="absolute h-full w-full text-slate-700 transition-transform duration-500
                     rotate-90 scale-0 dark:rotate-0 dark:scale-100 dark:text-slate-200"
          strokeWidth={2}
        />
      </div>
    </Button>
  )
}