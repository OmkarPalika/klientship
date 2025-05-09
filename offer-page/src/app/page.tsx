'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import FeatureDialog from '@/components/FeatureDialog'
import FeatureCard from '@/components/FeatureCard'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'
import ThemeToggler from '@/components/ThemeToggler'
import ScrollUpButton from '@/components/ScrollUpButton'

export type Feature = {
  id: string
  title: string
  description: string
  price?: string
  image?: string
  keyFeatures?: string[]
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const defaultFeatures = useMemo(() => [
    {
      id: '1',
      title: 'Shopify eCommerce Website',
      description: 'Create a powerful Shopify store for seamless shopping.',
      price: 'INR 1999',
      image: 'https://klientship.online/social-bubble/assets/images/posters/shopify_ecommerce.jpg',
      keyFeatures: [
        'E-commerce Store Setup',
        'Payment Gateway Integration',
        'Header Design & Setup',
        '1 Revision',
        'Product Setup (up to 5 products)'
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'WordPress eCommerce Website',
      description: 'Create your complete online store with WooCommerce integration.',
      price: 'INR 9999',
      image: 'https://klientship.online/social-bubble/assets/images/posters/wordpress_ecommerce%20copy.jpg',
      keyFeatures: [
        'WooCommerce Installation',
        'Payment Gateway Setup',
        'Product Category Setup',
        '3 Revisions',
        'Custom Theme Setup'
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Custom Android App Development',
      description: 'Convert your business idea into a full-featured Android application.',
      price: 'INR 9999',
      image: 'https://klientship.online/social-bubble/assets/images/posters/android_app.png',
      keyFeatures: [
        'App UI/UX Design',
        'Core Functionality',
        'Database Integration',
        'Performance Optimization',
        'Play Store Submission'
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ], [])

  const loadFeatures = useCallback(() => {
    setIsLoading(true)
    try {
      const savedFeatures = localStorage.getItem('features')
      if (savedFeatures) {
        try {
          const parsedFeatures: Feature[] = JSON.parse(savedFeatures)
          const merged = [
            ...defaultFeatures,
            ...parsedFeatures.filter(f => !defaultFeatures.some(df => df.id === f.id))
          ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          setFeatures(merged)
        } catch (err) {
          console.error('Failed to parse features:', err)
          localStorage.removeItem('features')
          setFeatures(defaultFeatures)
        }
      } else {
        setFeatures(defaultFeatures)
        localStorage.setItem('features', JSON.stringify(defaultFeatures))
      }
    } catch (err) {
      console.error('Error loading features:', err)
      toast.error('Error loading services', {
        description: 'Please try refreshing the page.'
      })
      setFeatures(defaultFeatures)
    } finally {
      setIsLoading(false)
    }
  }, [defaultFeatures])

  useEffect(() => {
    loadFeatures()
  }, [loadFeatures])

  useEffect(() => {
    localStorage.setItem('features', JSON.stringify(features))
  }, [features])

  const handleAddFeature = async (feature: Omit<Feature, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newFeature: Feature = {
      ...feature,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setFeatures(prev => [...prev, newFeature])
    setIsDialogOpen(false)
    toast.success('Service Added', {
      description: `${feature.title} has been added successfully.`
    })
  }

  const handleUpdateFeature = (updatedFeature: Feature) => {
    setFeatures(prev =>
      prev.map(f =>
        f.id === updatedFeature.id
          ? { ...updatedFeature, updatedAt: new Date().toISOString() }
          : f
      )
    )
    setIsDialogOpen(false)
    setEditingFeature(null)
    toast.success('Service Updated', {
      description: `${updatedFeature.title} has been updated successfully.`
    })
  }

  const handleDeleteFeature = (id: string) => {
    const feature = features.find(f => f.id === id)
    setFeatures(prev => prev.filter(f => f.id !== id))
    toast.error('Service Removed', {
      description: `${feature?.title} has been removed.`
    })
  }

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature(feature)
    setIsDialogOpen(true)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi, I would like to connect with you.')
    window.open(`https://wa.me/+919999999999?text=${message}`, '_blank')
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex flex-col theme-transition">
      <Toaster position="top-center" />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-4 z-[999]">
        <ScrollUpButton />
        <button
          onClick={() => {
            setEditingFeature(null)
            setIsDialogOpen(true)
          }}
          className="pr-8 rounded-full w-14 h-14 flex items-center justify-center bg-[hsl(var(--primary))]/90 hover:bg-[hsl(var(--primary))] transition-all shadow-lg"
          aria-label="Add Service"
        >
          <svg
            className="w-6 h-6 text-[hsl(var(--primary-foreground))]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <header className="border-b border-[hsl(var(--border))] py-6 backdrop-blur-sm bg-[hsl(var(--background))]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Logo
            src="https://klientship.online/social-bubble/assets/images/logo.png"
            height={60}
            width={60}
          />
          <div className='flex gap-4'>
            <Button
              className='bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary-foreground))] transition-all hover:scale-105'
              onClick={handleWhatsApp}
              aria-label="Contact us on WhatsApp"
            >
              Contact Us
            </Button>
            <ThemeToggler />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--muted-foreground))]">
              Limited Period Offer
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              Avail our services at special discounted rates. Offer ends soon!
            </p>
          </motion.div>

          {/* Services */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--primary))]"></div>
            </div>
          ) : features.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16"
            >
              <p className="text-[hsl(var(--muted-foreground))] text-lg">No services yet. Click "Add Service" to get started.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  onEdit={handleEditFeature}
                  onDelete={handleDeleteFeature}
                  index={features.indexOf(feature)}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />

      <FeatureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={(feature) => {
          if ('id' in feature) {
            handleUpdateFeature(feature as Feature)
          } else {
            handleAddFeature(feature)
          }
        }}
        feature={editingFeature}
      />
    </div>
  )
}