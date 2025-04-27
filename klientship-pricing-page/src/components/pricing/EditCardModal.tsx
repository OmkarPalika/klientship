"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PricingCard, Category } from "@/types/pricing";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Trash2 } from "lucide-react";

type EditCardModalProps = {
  card: PricingCard | null;
  onClose: () => void;
  onSave: (card: PricingCard) => void;
  categories: Category[];
  isNewCard?: boolean;
};

export function EditCardModal({ card, onClose, onSave, categories, isNewCard = false }: EditCardModalProps) {
  const [editedCard, setEditedCard] = useState<PricingCard | null>(card);
  const [newFeature, setNewFeature] = useState("");

  if (!editedCard) return null;

  const handleSave = () => {
    if (editedCard) {
      onSave(editedCard);
      onClose();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedCard((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    setEditedCard((prev) => {
      if (!prev) return null;
      
      const newFeatureObj = {
        id: `feature-${Date.now()}`,
        name: newFeature.trim(),
        included: true
      };
      
      return {
        ...prev,
        features: [...prev.features, newFeatureObj]
      };
    });
    
    setNewFeature("");
  };

  const handleRemoveFeature = (id: string) => {
    setEditedCard((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        features: prev.features.filter(f => f.id !== id)
      };
    });
  };

  const handleToggleOption = (option: 'featured' | 'premium' | 'popular') => {
    setEditedCard((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [option]: !prev[option]
      };
    });
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-lg w-full max-w-lg border border-gray-200 dark:border-gray-800 shadow-xl max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          role="dialog"
          aria-labelledby="edit-card-title"
          aria-describedby="edit-card-description"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 id="edit-card-title" className="text-xl font-bold">
              {isNewCard ? "Add New Service" : "Edit Service"}
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <p id="edit-card-description" className="sr-only">
            {isNewCard ? "Add a new service with details below" : "Edit the service details below"}
          </p>
          
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Service Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={editedCard.title} 
                onChange={handleInputChange}
                placeholder="Enter service title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={editedCard.description} 
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter service description"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input 
                  id="price" 
                  name="price" 
                  value={editedCard.price} 
                  onChange={handleInputChange}
                  placeholder="$99"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  defaultValue={editedCard.category}
                  onValueChange={(value) => setEditedCard(prev => prev ? {...prev, category: value} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cta">Call to Action</Label>
              <Input 
                id="cta" 
                name="cta" 
                value={editedCard.cta} 
                onChange={handleInputChange}
                placeholder="Get Started"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="ctaLink">CTA Link</Label>
              <Input 
                id="ctaLink" 
                name="ctaLink" 
                value={editedCard.ctaLink} 
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                name="image" 
                value={editedCard.image} 
                onChange={handleInputChange}
                placeholder="/images/service.jpg"
              />
            </div>
            
            <div className="mt-2">
              <Label className="mb-3 block">Options</Label>
              <div className="flex items-center space-x-6 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured"
                    checked={!!editedCard.featured}
                    onCheckedChange={() => handleToggleOption('featured')}
                  />
                  <Label htmlFor="featured" className="cursor-pointer text-sm">Featured</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="premium"
                    checked={!!editedCard.premium}
                    onCheckedChange={() => handleToggleOption('premium')}
                  />
                  <Label htmlFor="premium" className="cursor-pointer text-sm">Premium</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="popular"
                    checked={!!editedCard.popular}
                    onCheckedChange={() => handleToggleOption('popular')}
                  />
                  <Label htmlFor="popular" className="cursor-pointer text-sm">Popular</Label>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Label className="block mb-2">Features</Label>
              
              <ul className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {editedCard.features.map((feature) => (
                  <li key={feature.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                    <span className="text-sm">{feature.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveFeature(feature.id)}
                      className="h-7 w-7 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                      aria-label={`Remove feature: ${feature.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center space-x-2">
                <Input
                  id="new-feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a new feature"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                />
                <Button 
                  onClick={handleAddFeature}
                  variant="outline"
                  className="shrink-0"
                  aria-label="Add feature"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="hover:scale-105 transition-transform"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 hover:scale-105 transition-transform"
            >
              Save Changes
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 