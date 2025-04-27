"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePricingStore } from "@/lib/store/pricing-store";
import { PricingCard } from "@/components/pricing/pricing-card";
import { PricingHeader } from "@/components/pricing/pricing-header";
import { PricingCard as PricingCardType } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight, HelpCircle, Filter, Eye, Settings2, Sparkles } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Type definition for category items
interface Category {
  id: string;
  name: string;
}

// Mock data for categories (in a real app this would be imported)
const categories: Category[] = [
  { id: "website", name: "Website" },
  { id: "landing-page", name: "Landing Page" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "design", name: "Design" },
  { id: "branding", name: "Branding" },
  { id: "marketing", name: "Marketing" },
  { id: "seo", name: "SEO" },
  { id: "other", name: "Other" },
];

// Custom hook for media queries (in a real app this would be imported)
function useCustomMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      setMatches(media.matches);
      
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };
      
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
    return undefined;
  }, [query]);
  
  return matches;
}

export function PricingGrid() {
  const [activeTab, setActiveTab] = useState("all");
  const [editingCard, setEditingCard] = useState<PricingCardType | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const cards = usePricingStore((state) => state.cards);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: false,
  });
  
  const [filteredCards, setFilteredCards] = useState<PricingCardType[]>(cards);
  const isDesktop = useCustomMediaQuery("(min-width: 768px)");
  
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredCards(cards);
    } else {
      setFilteredCards(cards.filter((card) => card.category === activeTab));
    }
  }, [activeTab, cards]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const announcement = document.getElementById('filter-announcement');
      if (announcement) {
        announcement.textContent = `Showing ${filteredCards.length} ${activeTab === 'all' ? 'services' : activeTab} services`;
      }
    }
  }, [filteredCards, activeTab]);
  
  const handleAddCard = () => {
    const newCard: PricingCardType = {
      id: `card-${Date.now()}`,
      title: "New Service",
      description: "Description of your new service",
      price: "499",
      features: [
        { id: "feature-1", name: "Feature 1", included: true },
        { id: "feature-2", name: "Feature 2", included: true },
        { id: "feature-3", name: "Feature 3", included: true }
      ],
      image: "/placeholder.svg",
      ctaLink: "#",
      cta: "Get Started",
      category: "other",
    };
    
    usePricingStore.getState().addCard(newCard);
  };
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  useEffect(() => {
    document.body.style.cursor = "none";
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setCursorVariant("hover");
      }
    };
    
    const handleMouseOut = () => {
      setCursorVariant("default");
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);
  
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(56, 189, 248, 0.2)",
      mixBlendMode: "screen" as const,
      borderRadius: "50%",
      border: "2px solid rgba(56, 189, 248, 0.6)",
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(56, 189, 248, 0.4)",
      mixBlendMode: "screen" as const,
      borderRadius: "50%",
      border: "2px solid rgba(56, 189, 248, 0.8)",
    }
  };

  const numberOfColumns = isDesktop ? Math.min(3, cards.length) : 1;

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
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.5
        }}
      />
      
      <div className="relative py-16 min-h-screen overflow-hidden">
        {/* Background gradient effects */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[1000px] h-[1000px] opacity-20 dark:opacity-10 blur-3xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-indigo-500 to-teal-500 animate-slow-spin" />
          </div>
          <div className="absolute bottom-0 right-0 -translate-x-1/4 translate-y-1/4 w-[800px] h-[800px] opacity-20 dark:opacity-10 blur-3xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500 animate-slow-spin-reverse" />
          </div>
        </div>
        
        <div className="sr-only" aria-live="polite" id="filter-announcement"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="absolute right-6 top-0 z-10 flex items-center space-x-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-2 rounded-md shadow-md transition-all duration-300">
            <Switch 
              id="admin-mode" 
              checked={isAdmin} 
              onCheckedChange={setIsAdmin} 
            />
            <Label htmlFor="admin-mode" className="text-sm font-medium flex items-center">
              {isAdmin ? (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center"
                >
                  <Settings2 className="h-4 w-4 mr-1 text-indigo-600" /> Admin
                </motion.span>
              ) : (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center"
                >
                  <Eye className="h-4 w-4 mr-1 text-gray-600" /> Viewer
                </motion.span>
              )}
            </Label>
          </div>
          
          <PricingHeader onAddCard={isAdmin ? handleAddCard : undefined} />
          
          <div className="max-w-6xl mx-auto px-6">
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
                  <ChevronRight className={`h-4 w-4 transition-transform ${filterOpen ? 'rotate-90' : ''}`} />
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
                    
                    {categories.map((category) => {
                      const count = cards.filter(card => card.category === category.id).length;
                      return (
                        <TabsTrigger 
                          key={category.id} 
                          value={category.id}
                          className="data-[state=active]:bg-teal-600 data-[state=active]:text-white capitalize"
                          disabled={count === 0}
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
                    {activeTab === "all" ? "All Services" : activeTab}
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
            
            <div className="sr-only" aria-live="polite">
              Showing {filteredCards.length} results
            </div>
            
            <motion.div
              ref={ref}
              className={cn(
                "grid gap-6 mb-8",
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
                        "flex",
                        card.featured && "order-first md:order-none md:transform md:scale-105 md:z-10"
                      )}
                    >
                      <Card className="flex-1 relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800">
                        {card.featured && (
                          <motion.div 
                            className="absolute right-2 top-2 z-10"
                            initial={{ rotate: -20, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500,
                              damping: 15,
                              repeat: Infinity,
                              repeatType: "reverse",
                              repeatDelay: 5
                            }}
                          >
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-md">
                              <Sparkles className="h-3 w-3 mr-1" /> Featured
                            </div>
                          </motion.div>
                        )}
                        <PricingCard 
                          card={card} 
                          onEdit={() => setEditingCard(card)}
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
                  onClick={handleAddCard}
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
          </div>
        </div>
        
        <AnimatePresence>
          {editingCard && (
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-xl"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <h2 className="text-xl font-bold mb-4">Edit Service</h2>
                <p>Editing: {editingCard.title}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingCard(null)}
                    className="hover:scale-105 transition-transform"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setEditingCard(null)}
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 hover:scale-105 transition-transform"
                  >
                    Save Changes
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx global>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slow-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .animate-slow-spin {
          animation: slow-spin 30s linear infinite;
        }
        
        .animate-slow-spin-reverse {
          animation: slow-spin-reverse 25s linear infinite;
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
        }
      `}</style>
    </>
  );
}