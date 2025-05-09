// components/FeatureDialog.tsx
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { type Feature } from '@/app/page'
import { X } from 'lucide-react'

interface FeatureDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (feature: Omit<Feature, 'id' | 'createdAt' | 'updatedAt'> | Feature) => void
  feature: Feature | null
}

type FormData = {
  title: string
  description: string
  price: string
  keyFeatures: string[]
  image: string
}

export default function FeatureDialog({ open, onOpenChange, onSave, feature }: FeatureDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    keyFeatures: [''],
    image: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (feature) {
      setFormData({
        title: feature.title,
        description: feature.description,
        price: feature.price || '',
        keyFeatures: feature.keyFeatures || [''],
        image: feature.image || ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        keyFeatures: [''],
        image: ''
      })
    }
  }, [feature, open])

  const handleChange = (
    name: keyof FormData,
    value: string | string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleKeyFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.keyFeatures]
    updatedFeatures[index] = value
    handleChange('keyFeatures', updatedFeatures)
  }

  const addKeyFeature = () => {
    handleChange('keyFeatures', [...formData.keyFeatures, ''])
  }

  const removeKeyFeature = (index: number) => {
    const updatedFeatures = formData.keyFeatures.filter((_, i) => i !== index)
    handleChange('keyFeatures', updatedFeatures.length > 0 ? updatedFeatures : [''])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim()) return

    setIsSubmitting(true)
    try {
      const filteredKeyFeatures = formData.keyFeatures.filter(item => item.trim() !== '')

      const submissionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: formData.price.trim() || undefined,
        keyFeatures: filteredKeyFeatures.length > 0 ? filteredKeyFeatures : undefined,
        image: formData.image.trim() || undefined,
        ...(feature && { id: feature.id })
      }

      onSave(submissionData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[hsl(var(--background))] text-[hsl(var(--foreground))] border-[hsl(var(--border))]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--foreground))]">{feature ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="image" className="text-[hsl(var(--muted-foreground))]">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="Enter image URL or path"
                type="url"
                className="bg-[hsl(var(--input))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title" className="text-[hsl(var(--muted-foreground))]">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter service title"
                required
                autoFocus
                maxLength={100}
                className="bg-[hsl(var(--input))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-[hsl(var(--muted-foreground))]">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter service description"
                required
                rows={3}
                maxLength={500}
                className="bg-[hsl(var(--input))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price" className="text-[hsl(var(--muted-foreground))]">Price (with currency)</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="e.g. INR 1999"
                maxLength={20}
                className="bg-[hsl(var(--input))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label className="text-[hsl(var(--muted-foreground))]">Key Features</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addKeyFeature}
                  disabled={formData.keyFeatures.length >= 10}
                  className="h-8 text-xs bg-transparent border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
                >
                  Add Feature
                </Button>
              </div>

              <div className="space-y-2">
                {formData.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      maxLength={100}
                      className="bg-[hsl(var(--input))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeKeyFeature(index)}
                      disabled={formData.keyFeatures.length === 1}
                      className="h-10 w-10 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-transparent border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary-foreground))]"
            >
              {isSubmitting ? 'Saving...' : feature ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}