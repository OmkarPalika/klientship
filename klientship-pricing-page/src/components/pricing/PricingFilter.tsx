"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Filter, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Category, PricingCard } from "@/types/pricing";

type PricingFilterProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  categories: Category[];
  cards: PricingCard[];
  filteredCards: PricingCard[];
  isDesktop: boolean;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
};

export function PricingFilter({
  activeTab,
  setActiveTab,
  categories,
  cards,
  filteredCards,
  isDesktop,
  filterOpen,
  setFilterOpen,
}: PricingFilterProps) {
  // Get categories with cards
  const categoriesWithCards = categories.filter(category => 
    cards.some(card => card.category === category.id)
  );

  return (
    <section aria-labelledby="filter-heading" className="mb-12">
      <h2 id="filter-heading" className="sr-only">Filter services</h2>
      
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={() => setFilterOpen(!filterOpen)}
          className="w-full flex items-center justify-between glass-morphism"
          aria-expanded={filterOpen}
          aria-controls="category-filters"
        >
          <span className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter by category
          </span>
          <ChevronRight 
            className={`h-4 w-4 transition-transform duration-300 ${filterOpen ? 'rotate-90' : ''}`} 
          />
        </Button>
      </div>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: filterOpen || isDesktop ? "auto" : 0,
          opacity: filterOpen || isDesktop ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        id="category-filters"
        className="overflow-hidden"
      >
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mx-auto flex flex-wrap justify-center gap-1 p-1 mb-2">
            <TabsTrigger 
              value="all"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              All Services
              <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                {cards.length}
              </span>
            </TabsTrigger>
            
            {/* Only show categories that have cards */}
            {categoriesWithCards.map((category) => {
              const count = cards.filter(card => card.category === category.id).length;
              
              // Skip if there are no cards in this category
              if (count === 0) return null;
              
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white capitalize"
                >
                  {category.name}
                  <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </motion.div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Showing:</span>
          <motion.span 
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-medium text-teal-600 dark:text-teal-400 capitalize"
          >
            {activeTab === "all" 
              ? "All Services" 
              : categories.find(c => c.id === activeTab)?.name || activeTab}
          </motion.span>
          <motion.span 
            key={filteredCards.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400"
          >
            ({filteredCards.length} items)
          </motion.span>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Learn about our pricing</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs p-1">
                <p className="font-medium mb-1">Understanding our pricing:</p>
                <ul className="text-xs space-y-1">
                  <li>• <span className="font-medium">Premium</span>: High-quality, full-featured services</li>
                  <li>• <span className="font-medium">Popular</span>: Most frequently chosen by customers</li>
                  <li>• <span className="font-medium">Featured</span>: Special highlighted offerings</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Separator className="mt-4" />
    </section>
  );
} 