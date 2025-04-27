"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { PricingCard } from "./PricingCard";
import { PricingCard as PricingCardType } from "@/types/pricing";

type PricingGridProps = {
  cards: PricingCardType[];
  filteredCards: PricingCardType[];
  isAdmin: boolean;
  onAddCard: () => void;
  onEditCard: (card: PricingCardType) => void;
  onDeleteCard: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  numberOfColumns: number;
};

export function PricingGrid({
  filteredCards,
  isAdmin,
  onAddCard,
  onEditCard,
  onDeleteCard,
  setActiveTab,
  numberOfColumns
}: PricingGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const scrollVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <>
      <div className="sr-only" aria-live="polite">
        Showing {filteredCards.length} results
      </div>
      
      <motion.div
        ref={ref}
        className={cn(
          "grid gap-6 mb-8 h-full",
          numberOfColumns === 1 && "grid-cols-1",
          numberOfColumns === 2 && "grid-cols-1 md:grid-cols-2",
          numberOfColumns === 3 && "grid-cols-1 md:grid-cols-3"
        )}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <AnimatePresence mode="popLayout">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className={cn(
                  "flex h-full",
                  card.featured && "order-first md:order-none md:transform md:scale-105 md:z-10"
                )}
              >
                <Card className="flex-1 relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 flex flex-col h-full">
                  <PricingCard 
                    card={card} 
                    onEdit={onEditCard}
                    onDelete={isAdmin ? onDeleteCard : undefined}
                    isAdmin={isAdmin}
                  />
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full py-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No services found in this category.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('all')}
                className="glass-morphism"
              >
                View all services
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {isAdmin && filteredCards.length > 0 && (
        <motion.div 
          className="mt-12 text-center"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.2 }}
          variants={scrollVariants}
        >
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Manage your services
          </p>
          <Button
            variant="outline"
            onClick={onAddCard}
            className="mx-auto glass-morphism hover:scale-105 transition-transform"
          >
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Add Custom Service
            </motion.div>
          </Button>
        </motion.div>
      )}
    </>
  );
} 