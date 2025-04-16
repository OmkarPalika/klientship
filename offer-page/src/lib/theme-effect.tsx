'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function ThemeEffect() {
  const { setTheme } = useTheme()

  useEffect(() => {
    if (!localStorage.getItem('offer-page-theme')) {
      setTheme('light')
    }
  }, [setTheme])

  return null
}

