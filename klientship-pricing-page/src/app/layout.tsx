import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import Link from "next/link";
import { StickyHeader } from "@/components/ui/sticky-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klientship - Web Development & App Development Services",
  description: "Professional web development and app development services for your business.",
  keywords: "web development, app development, ecommerce, business website, android app",
  authors: [{ name: "Klientship Technologies" }],
  openGraph: {
    type: "website",
    title: "Klientship - Web Development & App Development Services",
    description: "Professional web development and app development services for your business.",
    url: "https://klientship.com/",
    siteName: "Klientship"
  },
  twitter: {
    card: "summary_large_image",
    title: "Klientship - Web Development & App Development Services",
    description: "Professional web development and app development services for your business."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StickyHeader>
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/" className="font-bold text-xl tracking-tight" aria-label="S_CRL DIGITAL - Homepage">S_CRL</Link>
                <div className="text-xs tracking-tight">DIGITAL</div>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link href="/contact" className="bg-teal-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors">
                  Contact us
                </Link>
              </div>
            </div>
          </StickyHeader>
          
          <main id="main-content">
            {children}
          </main>
          
          <footer className="bg-neutral-900 text-white py-12" role="contentinfo">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Link href="/" className="font-bold text-xl tracking-tight" aria-label="S_CRL DIGITAL - Homepage">S_CRL</Link>
                    <div className="text-xs tracking-tight">DIGITAL</div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Designing Functional Web Experiences That Bring More Response to the Digital World.
                  </p>
                </div>
                
                <nav aria-label="Quick Links">
                  <h3 className="font-medium mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link href="/parent-company" className="hover:text-white transition-colors">
                        Parent Company
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-white transition-colors">
                        Terms and Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </nav>
                
                <nav aria-label="Company Info">
                  <h3 className="font-medium mb-4">Company</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link href="/about" className="hover:text-white transition-colors">
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="hover:text-white transition-colors">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/subsidiaries" className="hover:text-white transition-colors">
                        Our Subsidiaries
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
                <p>Copyright © {new Date().getFullYear()} Klientship Technologies. All rights reserved.</p>
              </div>
            </div>
          </footer>
          
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
} 