// components/Logo.tsx
import React from 'react'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span className="font-bold text-2xl text-white">
        <span className="text-yellow-400">S</span>ocial
        <span className="text-yellow-400">B</span>ubble
      </span>
    </Link>
  )
}
