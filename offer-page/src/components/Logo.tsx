// components/Logo.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export default function Logo(props: { src: string | StaticImport }) {
  return (
    <Link href="/" className="flex items-center">
      <Image 
        src={props.src} 
        width={70} 
        height={70} 
        alt='Logo'
        style={{ width: 'auto', height: 'auto' }}
        priority
      />
    </Link>
  )
}
