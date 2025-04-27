'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { type Feature } from '@/app/page'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { toast } from 'sonner'

interface FeatureCardProps {
  feature: Feature
  onEdit: (feature: Feature) => void
  onDelete: (id: string) => void
  index: number
}

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="ml-2 h-4 w-4 fill-current" aria-hidden="true">
    <path d="M16 .003C7.165.003.003 7.165.003 16S7.165 31.997 16 31.997A15.9 15.9 0 0026.293 27.1l3.563 1.127-1.163-3.48A15.93 15.93 0 0032 16C32 7.165 24.837.003 16 .003zM16 29.29c-3.021 0-5.826-.892-8.195-2.41L4.8 27.2l.905-2.66a13.13 13.13 0 01-2.005-6.972C3.7 9.548 9.548 3.7 16 3.7s12.3 5.848 12.3 12.3c0 2.659-.837 5.12-2.26 7.126l.665 1.996-2.067-.654a12.296 12.296 0 01-8.638 4.823zM22.47 19.865c-.37-.186-2.194-1.08-2.535-1.204-.34-.124-.588-.186-.837.187s-.963 1.204-1.182 1.454c-.218.248-.435.28-.805.094s-1.57-.577-2.994-1.843c-1.107-.99-1.854-2.212-2.07-2.58-.218-.37-.023-.57.163-.755.167-.166.37-.43.556-.645.186-.217.248-.372.372-.62.124-.248.062-.466-.031-.65s-.837-2.02-1.147-2.764c-.3-.724-.605-.624-.837-.634l-.714-.01c-.248 0-.65.093-.991.466s-1.3 1.27-1.3 3.09c0 1.82 1.33 3.58 1.516 3.826.186.248 2.63 4.02 6.368 5.636 3.738 1.618 3.738 1.08 4.412 1.006.674-.072 2.194-.89 2.506-1.755.31-.868.31-1.612.217-1.756-.094-.14-.34-.217-.71-.403z"/>
  </svg>
)

export default function FeatureCard({ feature, onEdit, onDelete }: FeatureCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleKnowMore = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
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
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919999999999'
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      if (window.confirm('Are you sure you want to delete this service?')) {
        await new Promise(resolve => setTimeout(resolve, 300))
        onDelete(feature.id)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full bg-[hsl(var(--card))]/95 border-[hsl(var(--border))] overflow-hidden relative group rounded-lg flex flex-col">
        <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full bg-[hsl(var(--background))]/70 backdrop-blur-sm border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background))]/90 transition-colors"
            onClick={() => onEdit(feature)}
            disabled={isLoading}
            aria-label="Edit service"
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full bg-[hsl(var(--background))]/70 backdrop-blur-sm border-[hsl(var(--border))] text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))]/90 hover:bg-[hsl(var(--background))]/90 transition-colors"
            onClick={handleDelete}
            disabled={isLoading}
            aria-label="Delete service"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative h-48 w-full overflow-hidden bg-[hsl(var(--muted))]">
          <Image
            src={feature.image || '/placeholder.jpg'}
            alt={feature.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        </div>

        <CardContent className="flex-grow p-6">
          <h3 className="text-xl font-bold mb-2 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
            {feature.title}
          </h3>
          <p className="text-[hsl(var(--muted-foreground))] mb-4 line-clamp-2">{feature.description}</p>

          {feature.price && (
            <p className="text-2xl font-bold text-[hsl(var(--foreground))] my-4 group-hover:text-[hsl(var(--primary))] transition-colors">
              {feature.price}
            </p>
          )}

          {feature.keyFeatures && feature.keyFeatures.length > 0 ? (
            <div className="space-y-2">
              <p className="font-medium text-sm text-[hsl(var(--muted-foreground))]">Key Features:</p>
              <ul className="space-y-1">
                {feature.keyFeatures.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm"
                  >
                    <span className="text-[hsl(var(--primary))] mr-2" aria-hidden="true">✓</span>
                    <span className="text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-[hsl(var(--muted-foreground))] italic">No key features listed.</p>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 p-4 pt-0">
          <Button
            className="flex-1 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary-foreground))] transition-colors"
            onClick={handleKnowMore}
            disabled={isLoading}
          >
            Know more
          </Button>
          <Button
            className="flex-1 bg-transparent border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 transition-colors"
            onClick={handleWhatsApp}
            disabled={isLoading}
          >
            WhatsApp now
            <WhatsAppIcon />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}