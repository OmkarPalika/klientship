// components/FeatureCard.tsx
'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EditIcon, Trash2Icon, MessageSquare } from 'lucide-react'
import { type Feature } from '@/app/page'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { toast } from 'sonner'

interface FeatureCardProps {
  feature: Feature
  onEdit: (feature: Feature) => void
  onDelete: (id: string) => void
}

export default function FeatureCard({ feature, onEdit, onDelete }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleKnowMore = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      toast.success(`Exploring ${feature.title}`, {
        description: 'Our team will contact you shortly with more details.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${feature.title}. Please provide more information.`
    )
    window.open(`https://wa.me/+919999999999?text=${message}`, '_blank')
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      if (window.confirm('Are you sure you want to delete this service?')) {
        await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API call
        onDelete(feature.id)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full bg-gray-900/95 border-gray-800 overflow-hidden relative group rounded-lg flex flex-col">
        <div className={cn(
          "absolute top-3 right-3 flex gap-2 transition-all duration-300 z-10",
          isHovered ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-2"
        )}>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full bg-black/70 backdrop-blur-sm border-gray-700 text-white hover:bg-black/90 hover:scale-110 transition-all"
            onClick={() => onEdit(feature)}
            disabled={isLoading}
          >
            <EditIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full bg-black/70 backdrop-blur-sm border-gray-700 text-red-500 hover:text-red-400 hover:bg-black/90 hover:scale-110 transition-all"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
        
        {/* Card Image with enhanced overlay */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-800">
          <Image 
            src={feature.image || '/placeholder.jpg'} 
            alt={feature.title}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered ? "scale-110" : "scale-100"
            )}
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent transition-opacity duration-300",
            isHovered ? "opacity-80" : "opacity-60"
          )} />
        </div>
        
        <CardContent className="flex-grow p-6">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{feature.description}</p>
          
          {feature.price && (
            <p className="text-2xl font-bold text-white my-4 group-hover:text-green-400 transition-colors">
              {feature.price}
            </p>
          )}
          
          {feature.keyFeatures && feature.keyFeatures.length > 0 && (
            <div className="space-y-2">
              <p className="font-medium text-sm text-gray-400">Key Features:</p>
              <ul className="space-y-1">
                {feature.keyFeatures.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex gap-2 p-4 pt-0">
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-105"
            onClick={handleKnowMore}
            disabled={isLoading}
          >
            Know more
          </Button>
          <Button 
            className="flex-1 bg-transparent border border-green-600 text-green-500 hover:bg-green-600/10 transition-all hover:scale-105"
            onClick={handleWhatsApp}
            disabled={isLoading}
          >
            WhatsApp now
            <MessageSquare className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
