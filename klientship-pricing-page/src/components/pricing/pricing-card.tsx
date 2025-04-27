"use client";

import { useState } from "react";
import { Check, Edit, Trash2, ZapIcon, Star, Crown, ArrowRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePricingStore } from "@/lib/store/pricing-store";
import { Feature, PricingCard as PricingCardType } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PricingCardProps = {
  card: PricingCardType;
  onEdit: (card: PricingCardType) => void;
};

export function PricingCard({ card, onEdit }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const removeCard = usePricingStore((state) => state.removeCard);

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  // Determine if this is a "best value" card based on multiple properties
  const isBestValue = card.premium && card.popular;

  return (
    <motion.div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-3 -right-3 flex gap-2 z-50"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full shadow-md"
                    onClick={() => onEdit(card)}
                    aria-label="Edit card"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit card</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    className="rounded-full shadow-md"
                    onClick={() => removeCard(card.id)}
                    aria-label="Delete card"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete card</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Best Value Ribbon - Only shows if card is premium AND popular */}
      {isBestValue && (
        <div className="absolute -left-2 top-6 z-20">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-4 py-1 rounded-r-md shadow-md">
            BEST VALUE
          </div>
          <div className="absolute top-0 left-0 w-2 h-2 -translate-y-full bg-amber-800 clip-corner"></div>
        </div>
      )}

      <Card className={cn(
        "h-full transition-all overflow-hidden backdrop-blur-sm relative flex flex-col",
        "border-2 hover:shadow-xl",
        card.premium ? "border-indigo-500/50 dark:border-indigo-400/30 shadow-lg shadow-indigo-200/30 dark:shadow-indigo-900/10" : "border-gray-200 dark:border-gray-800",
        card.featured ? "bg-gradient-to-b from-neutral-900 to-neutral-800 text-white dark:from-neutral-800 dark:to-neutral-950 dark:text-gray-100" : ""
      )}>
        {/* Badge container */}
        <div className="absolute right-3 top-3 z-10 flex gap-2 items-end">
          {card.popular && (
            <motion.div 
              className="flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full text-xs font-medium shadow-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
            >
              <Star size={12} aria-hidden="true" /> 
              <span>Popular</span>
            </motion.div>
          )}
          
          {card.premium && (
            <motion.div 
              className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full text-xs font-medium shadow-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
            >
              <Crown size={12} aria-hidden="true" /> 
              <span>Premium</span>
            </motion.div>
          )}
          
          {card.featured && (
            <motion.div 
              className="flex items-center gap-1 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium shadow-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 10 }}
            >
              <ZapIcon size={12} aria-hidden="true" /> 
              <span>Featured</span>
            </motion.div>
          )}
        </div>

        <CardHeader className="pb-3 pt-6">
          <div className="w-full aspect-[1.91/1] bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-4 relative">
            {/* Use Next.js Image for better performance */}
            {card.image && (
              <Image 
                src={card.image}
                alt={`${card.title} image`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform hover:scale-105 duration-500"
                priority={isBestValue} // Prioritize loading for best value cards
              />
            )}
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">
            {card.title}
          </CardTitle>
          
          <CardDescription className={cn(
            "mt-2 mb-2",
            card.featured ? "text-gray-300 dark:text-gray-300" : "text-gray-600 dark:text-gray-400"
          )}>
            {card.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div 
            className="text-4xl font-bold mb-4 text-center"
            aria-label={`Price: ${card.price}`}
          >
            {card.price}
          </div>
          
          <ul className="space-y-2 mt-4" aria-label="Features included">
            {card.features.map((feature: Feature, index) => (
              <motion.li 
                key={feature.id} 
                className="flex items-start gap-2"
                custom={index}
                variants={featureVariants}
                initial="hidden"
                animate="visible"
              >
                <Check 
                  className={cn(
                    "h-5 w-5 mt-0.5 flex-shrink-0",
                    card.featured ? "text-green-400 dark:text-green-400" : "text-green-500 dark:text-green-400"
                  )}
                  aria-hidden="true"
                /> 
                <span className={cn(
                  "text-sm",
                  card.featured ? "text-gray-300 dark:text-gray-300" : "text-gray-600 dark:text-gray-300"
                )}>
                  {feature.name}
                </span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter className="mt-auto pt-4 pb-6">
          <div className="w-full space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-md blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <Button 
                className={cn(
                  "w-full py-5 text-base font-semibold relative",
                  "bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white",
                  "border-2 border-transparent",
                )}
                onClick={() => window.open(`/services/${card.id}`, "_blank")}
                aria-label={`Learn more about ${card.title}`}
              >
                <span className="flex items-center justify-center">
                  Know More
                  <ArrowRightIcon className="w-5 h-5 ml-2 animate-pulse" />
                </span>
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className={cn(
                  "w-full transition-all py-6 text-base font-semibold shadow-lg",
                  card.featured 
                    ? "bg-white text-black hover:bg-gray-200 dark:bg-gray-100 dark:hover:bg-gray-200" 
                    : card.premium 
                      ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white" 
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                )}
                onClick={() => window.open(card.ctaLink || "#", "_blank")}
                aria-label={`${card.cta} for ${card.title}`}
              >
                {card.cta}
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 