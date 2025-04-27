"use client";

import { useState } from "react";
import { Check, Edit, Trash2, Star, Crown, Info, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Feature, PricingCard as PricingCardType } from "@/types/pricing";

type PricingCardProps = {
  card: PricingCardType;
  onEdit: (card: PricingCardType) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
};

export function PricingCard({ card, onEdit, onDelete, isAdmin = false }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  // Determine if this is a "best value" card based on card properties
  const isBestValue = card.premium && card.popular;

  return (
    <motion.div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Edit/Delete Controls - Only visible when in admin mode and on hover */}
      <AnimatePresence>
        {isHovered && isAdmin && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-3 -right-3 flex gap-2 z-50"
            role="group"
            aria-label="Card actions"
          >
            <TooltipProvider delayDuration={300}>
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
                <TooltipContent side="top">
                  <p>Edit card</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {onDelete && (
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      className="rounded-full shadow-md"
                      onClick={() => onDelete(card.id)}
                      aria-label="Delete card"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Delete card</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
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
        {/* Badge container with fixed height to ensure consistent spacing */}
        <div className="absolute right-3 top-3 z-10 h-8 flex justify-end">
          {card.popular && !card.premium && (
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
          
          {card.premium && !card.popular && (
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
          
          {isBestValue && (
            <motion.div 
              className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-indigo-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 10 }}
            >
              <Star size={12} aria-hidden="true" /> 
              <Crown size={12} className="ml-0.5" aria-hidden="true" />
            </motion.div>
          )}
        </div>

        <CardHeader className="pb-2 pt-6 space-y-3">
          <div className="w-full aspect-[1.91/1] bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-2 relative">
            {/* Using Next.js Image for better performance */}
            {card.image && (
              <Image 
                src={card.image}
                alt={`${card.title} image`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform hover:scale-105 duration-500"
                priority={isBestValue}
              />
            )}
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">
            {card.title}
          </CardTitle>
          
          <CardDescription className={cn(
            "line-clamp-2 min-h-[40px]",
            card.featured ? "text-gray-300 dark:text-gray-300" : "text-gray-600 dark:text-gray-400"
          )}>
            {card.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow pt-2 pb-0">
          <div 
            className="text-3xl font-bold mb-4 text-center"
            aria-label={`Price: ${card.price}`}
          >
            {card.price}
          </div>
          
          <ul className="space-y-1.5 min-h-[180px]" aria-label="Features included">
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
                    "h-4 w-4 mt-0.5 flex-shrink-0",
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
        
        <CardFooter className="mt-auto pt-3 pb-4">
          <div className="w-full space-y-3">
            {/* Know More Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-md blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>
              <Button 
                className="w-full py-5 text-base font-semibold relative bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white"
                onClick={() => window.open(`/services/${card.id}`, "_blank")}
                aria-label={`Learn more about ${card.title}`}
              >
                <span className="flex items-center justify-center">
                  <Info className="w-5 h-5 mr-2" />
                  Know More
                </span>
              </Button>
            </motion.div>
            
            {/* Main CTA Button */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className={cn(
                  "w-full transition-all py-5 text-base font-semibold shadow-lg",
                  card.featured 
                    ? "bg-white text-black hover:bg-gray-200 dark:bg-gray-100 dark:hover:bg-gray-200" 
                    : card.premium 
                      ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white" 
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                )}
                onClick={() => window.open(card.ctaLink || "#", "_blank")}
                aria-label={`${card.cta} for ${card.title}`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {card.cta}
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
      
      <style jsx global>{`
        .clip-corner {
          clip-path: polygon(0 0, 100% 100%, 100% 0);
        }
      `}</style>
    </motion.div>
  );
} 