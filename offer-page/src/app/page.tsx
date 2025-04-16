// app/page.tsx
'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import FeatureDialog from '@/components/FeatureDialog'
import FeatureCard from '@/components/FeatureCard'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'
import ThemeToggler from '@/components/ThemeToggler'

// Define Feature type
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
      image: '/shopify.jpg',
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
      image: '/wordpress.jpg',
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
      image: '/android.jpg',
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

  const loadFeatures = useCallback(async () => {
    setIsLoading(true)
    try {
      const savedFeatures = localStorage.getItem('features')
      if (savedFeatures) {
        const parsedFeatures = JSON.parse(savedFeatures)
        const mergedFeatures = [
          ...defaultFeatures,
          ...parsedFeatures.filter((f: Feature) => 
            !defaultFeatures.some(df => df.id === f.id)
          )
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setFeatures(mergedFeatures)
      } else {
        setFeatures(defaultFeatures)
        localStorage.setItem('features', JSON.stringify(defaultFeatures))
      }
    } catch (error) {
      toast.error('Error loading services', {
        description: 'Please try refreshing the page.'
      })
      console.error('Error loading services:', error)
      setFeatures(defaultFeatures)
    } finally {
      setIsLoading(false)
    }
  }, [defaultFeatures])

  useEffect(() => {
    loadFeatures()
  }, [loadFeatures])

  const handleAddFeature = useCallback(async (feature: Omit<Feature, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newFeature: Feature = {
        ...feature,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      setFeatures(prev => [...prev, newFeature])
      setIsDialogOpen(false)
      
      toast.success('Service Added', {
        description: `${feature.title} has been added successfully.`
      })
    } catch (error) {
      toast.error('Error adding service', {
        description: 'Please try again.'
      })
      console.error('Error adding service:', error)
    }
  }, [])

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
    const featureToDelete = features.find(f => f.id === id)
    setFeatures(prev => prev.filter(f => f.id !== id))
    
    toast.error('Service Removed', {
      description: `${featureToDelete?.title} has been removed.`
    })
  }

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature(feature)
    setIsDialogOpen(true)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col theme-transition">
      <Toaster position="top-center" />
      
      <div className="fixed-bottom-right">
        <ThemeToggler />
        <Button
          onClick={() => {
            setEditingFeature(null)
            setIsDialogOpen(true)
          }}
          className="rounded-full shadow-lg bg-primary/90 hover:bg-primary transition-all duration-300"
          size="icon"
        >
          <PlusIcon className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Header section */}
      <header className="border-b border-gray-800 py-6 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Logo />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          {/* Title section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Services Catalog
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Designing Exceptional Web Experiences that Bring More Happiness to the Digital World.
            </p>
          </motion.div>

          {/* Features grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : features.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-lg">No services yet. Click &ldquo;Add Service&rdquo; to get started.</p>
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
                />
              ))}
            </motion.div>
          )}

          {/* Offer section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center bg-gradient-to-b from-transparent to-green-950/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-green-400">Limited Period Offer</h2>
            <p className="text-gray-400 mb-6">Book our services at special discounted prices. Offer ends soon!</p>
          </motion.div>
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