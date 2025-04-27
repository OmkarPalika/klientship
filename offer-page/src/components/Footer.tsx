// components/Footer.tsx
import React from 'react'
import Link from 'next/link'
import { Linkedin, Facebook, Instagram } from 'lucide-react'
import Logo from './Logo'
import { Button } from './ui/button'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--background))] border-t border-[hsl(var(--border))] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Logo
              src="https://klientship.online/social-bubble/assets/images/logo-white.png"
              height={70}
              width={70}
            />
            <p className="text-[hsl(var(--muted-foreground))] text-sm mt-4">
              Designing Exceptional Web Experiences that Bring More Happiness to the Digital World.
            </p>
            <div className="flex gap-4 items-center">
              <Image
                src="https://klientship.online/social-bubble/assets/images/partners/shopify-certified-partner.png"
                alt="Partner 1"
                width={20}
                height={20}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="https://klientship.online/social-bubble/assets/images/partners/aws-partner.png"
                alt="Partner 2"
                width={20}
                height={20}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="https://klientship.online/social-bubble/assets/images/partners/razorpay.png"
                alt="Partner 3"
                width={20}
                height={20}
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-[hsl(var(--foreground))] mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-[hsl(var(--muted-foreground))] text-sm">
              <li><Link href="#" className="hover:text-[hsl(var(--foreground))] transition">Parent Company</Link></li>
              <li><Link href="#" className="hover:text-[hsl(var(--foreground))] transition">Terms and Conditions</Link></li>
              <li><Link href="#" className="hover:text-[hsl(var(--foreground))] transition">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[hsl(var(--foreground))] mb-4">COMPANY</h3>
            <ul className="space-y-2 text-[hsl(var(--muted-foreground))] text-sm">
              <li><Link href="#" className="hover:text-[hsl(var(--foreground))] transition">About us</Link></li>
              <li><Link href="#" className="hover:text-[hsl(var(--foreground))] transition">Services</Link></li>
              <li><Link href="#" className="hover:text-[hsl(var(--foreground))] transition">Our Subsidiaries</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[hsl(var(--foreground))] mb-4">RESOURCES</h3>
            <ul className="space-y-2 text-[hsl(var(--muted-foreground))] text-sm">
              <li><Link href="#" className="hover:text-[hsl(var(--foreground))] transition">Refund Policy</Link></li>
              <li><Link href="#" className="hover:text-[hsl(var(--foreground))] transition">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[hsl(var(--muted-foreground))] text-sm">Copyright © 2025 Klientship Technologies</p>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">CIN: U72900KA2022PTC162006</p>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Linkedin className="h-4 w-4 text-blue-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Facebook className="h-4 w-4 text-blue-400" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Instagram className="h-4 w-4 text-red-400" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}