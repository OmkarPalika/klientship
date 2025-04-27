"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePricingStore } from "@/lib/store/pricing-store";
import { Feature, PricingCard } from "@/types/pricing";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PricingCardFormData = {
  title: string;
  description: string;
  price: string;
  image: string;
  cta: string;
  ctaLink: string;
  category: string;
  premium: boolean;
  popular: boolean;
  featured: boolean;
  newCategory?: string;
};

type PricingCardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCard: PricingCard | null;
};

export function PricingCardDialog({ open, onOpenChange, editingCard }: PricingCardDialogProps) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [categoryMode, setCategoryMode] = useState<"existing" | "new">("existing");

  const { addCard, updateCard, categories, addCategory } = usePricingStore();

  const form = useForm<PricingCardFormData>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      image: "",
      cta: "Whatsapp now",
      ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20your%20service",
      category: "ecommerce",
      premium: false,
      popular: false,
      featured: false,
      newCategory: "",
    },
  });

  // Reset form fields and populate with editing card data when dialog opens or editingCard changes
  useEffect(() => {
    if (open) {
      if (editingCard) {
        form.reset({
          title: editingCard.title || "",
          description: editingCard.description || "",
          price: editingCard.price || "",
          image: editingCard.image || "",
          cta: editingCard.cta || "Whatsapp now",
          ctaLink: editingCard.ctaLink || "https://wa.me/1234567890?text=I'm%20interested%20in%20your%20service",
          category: editingCard.category || "ecommerce",
          premium: editingCard.premium || false,
          popular: editingCard.popular || false,
          featured: editingCard.featured || false,
        });
        setFeatures(editingCard.features || []);
        setCategoryMode("existing");
      } else {
        form.reset({
          title: "",
          description: "",
          price: "",
          image: "",
          cta: "Whatsapp now",
          ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20your%20service",
          category: "ecommerce",
          premium: false,
          popular: false,
          featured: false,
          newCategory: "",
        });
        setFeatures([]);
        setCategoryMode("existing");
      }
    }
  }, [open, editingCard, form]);

  const onSubmit = (data: PricingCardFormData) => {
    // Handle new category if added
    let finalCategory = data.category;
    if (categoryMode === "new" && data.newCategory) {
      addCategory({
        id: uuidv4(),
        name: data.newCategory
      });
      finalCategory = data.newCategory;
    }

    if (editingCard) {
      updateCard(editingCard.id, {
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image,
        cta: data.cta,
        ctaLink: data.ctaLink,
        category: finalCategory,
        premium: data.premium,
        popular: data.popular,
        featured: data.featured,
        features: features.map(f => ({
          id: uuidv4(),
          name: f.name,
          included: true
        }))
      });
    } else {
      addCard({
        id: uuidv4(),
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image,
        cta: data.cta,
        ctaLink: data.ctaLink,
        category: finalCategory,
        premium: data.premium,
        popular: data.popular,
        featured: data.featured,
        features: features.map(f => ({
          id: uuidv4(),
          name: f.name,
          included: true
        }))
      });
    }

    onOpenChange(false);
  };

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      { id: uuidv4(), name: "", included: true }
    ]);
  };

  const handleFeatureChange = (id: string, name: string) => {
    setFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, name } : feature
      )
    );
  };

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter((feature) => feature.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingCard ? "Edit" : "Add"} Pricing Card</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium">Title</Label>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium">Price</Label>
                    <FormControl>
                      <Input placeholder="Enter price (e.g. INR 1999)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium">Description</Label>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed description"
                      className="min-h-[80px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium">Image URL</Label>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cta"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium">CTA Button Text</Label>
                    <FormControl>
                      <Input placeholder="Enter CTA text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ctaLink"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium">CTA Button Action URL</Label>
                    <FormControl>
                      <Input placeholder="Enter URL for button click" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border p-4 rounded-md">
              <Label className="text-sm font-medium mb-2 block">Category</Label>

              <Tabs
                value={categoryMode}
                onValueChange={(value) => setCategoryMode(value as "existing" | "new")}
                className="mb-4"
              >
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="existing">Existing Category</TabsTrigger>
                  <TabsTrigger value="new">Add New Category</TabsTrigger>
                </TabsList>
              </Tabs>

              {categoryMode === "existing" ? (
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          {categories.map((category) => (
                            <option key={category.toString()} value={category.toString()}>{category.toString()}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="newCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter new category name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="border p-4 rounded-md">
              <Label className="text-sm font-medium mb-2 block">Card Status Options</Label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="premium"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-indigo-50 dark:bg-indigo-950/30">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label className="font-medium">Premium</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Highlights high-value or premium services with indigo accents
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="popular"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-amber-50 dark:bg-amber-950/30">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label className="font-medium">Popular</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Shows a &quot;Popular&quot; badge to highlight frequently chosen options
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-purple-50 dark:bg-purple-950/30">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label className="font-medium">Featured</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Applies dark background for maximum emphasis and special focus
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4 border p-4 rounded-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Features</h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              {features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <Input
                    value={feature.name}
                    onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
                    placeholder="Feature description"
                    className="flex-1"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveFeature(feature.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove feature</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}

              {features.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No features added yet. Click &quot;Add Feature&quot; to add some.
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingCard ? "Update" : "Create"} Card
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 