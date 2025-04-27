"use client";

import { useState, useEffect } from "react";
import { PricingHeader } from "./pricing-header";
import { PricingFilter } from "./PricingFilter";
import { PricingGrid } from "./PricingGrid";
import { EditCardModal } from "./EditCardModal";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { PricingCard } from "@/types/pricing";
import { usePricingStore } from "@/lib/store/pricing-store";

// Empty card template for new cards
const emptyCardTemplate: PricingCard = {
  id: "",
  title: "",
  description: "",
  price: "",
  features: [],
  image: "/placeholder.svg",
  ctaLink: "",
  cta: "Get Started",
  category: "ecommerce",
};

// Generate fixed animation values on the server
// These values will be consistent across both server and client renders
const serverGeneratedAnimationData = {
  // Fixed promotion end date (30 days from a fixed reference date)
  promotionEnd: {
    date: new Date('2025-05-17T00:00:00Z'),
    isoString: '2025-05-17T00:00:00.000Z',
    formatted: 'May 17, 2025'
  },
  particles: Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: (i * 50) % 1000,
    initialY: (i * 30) % 500,
    initialOpacity: 0.2 + ((i * 0.15) % 0.5),
    initialScale: 0.1 + ((i * 0.04) % 0.9),
    animateX: [
      (i * 50) % 1000,
      ((i + 5) * 50) % 1000,
      ((i + 10) * 50) % 1000,
    ],
    animateY: [
      (i * 30) % 500,
      ((i + 5) * 30) % 500,
      ((i + 10) * 30) % 500,
    ],
    duration: 20 + ((i * 5) % 30),
  }))
};

export function PricingPage() {
  // State variables
  const [activeTab, setActiveTab] = useState("all");
  const [editingCard, setEditingCard] = useState<PricingCard | null>(null);
  const [isNewCard, setIsNewCard] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Get data from store
  const cards = usePricingStore((state) => state.cards);
  const categories = usePricingStore((state) => state.categories);
  const updateCard = usePricingStore((state) => state.updateCard);
  const removeCard = usePricingStore((state) => state.removeCard);
  const addCard = usePricingStore((state) => state.addCard);
  
  const [filteredCards, setFilteredCards] = useState<PricingCard[]>(cards);
  
  // Filter cards when tab changes
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredCards(cards);
    } else {
      setFilteredCards(cards.filter((card) => card.category === activeTab));
    }
  }, [activeTab, cards]);
  
  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // Check on mount
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Announce filter changes to screen readers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const announcement = document.getElementById('filter-announcement');
      if (announcement) {
        announcement.textContent = `Showing ${filteredCards.length} ${activeTab === 'all' ? 'services' : activeTab} services`;
      }
    }
  }, [filteredCards, activeTab]);
  
  // Handler functions
  const handleAddCard = () => {
    const newCardId = `card-${Date.now()}`;
    const newCard = { 
      ...emptyCardTemplate,
      id: newCardId 
    };
    
    setIsNewCard(true);
    setEditingCard(newCard);
  };
  
  const handleSaveCard = (card: PricingCard) => {
    if (isNewCard) {
      addCard(card);
      setIsNewCard(false);
    } else {
      updateCard(card.id, card);
    }
  };
  
  const handleDeleteCard = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      removeCard(id);
    }
  };
  
  const handleEditCard = (card: PricingCard) => {
    if (isAdmin) {
      setIsNewCard(false);
      setEditingCard(card);
    }
  };
  
  const numberOfColumns = isDesktop ? Math.min(3, cards.length) : 1;

  return (
    <>
      {/* Improved custom cursor */}
      <CustomCursor 
        color="var(--cursor-color, rgba(56, 189, 248, 0.3))" 
        size={32} 
        damping={8} 
        stiffness={300}
        trailLength={5}
      />
      
      <main className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-950">
        {/* Pricing Header */}
        <PricingHeader 
          onAddCard={isAdmin ? handleAddCard : undefined} 
          animationData={serverGeneratedAnimationData} 
        />
        
        {/* Pricing Content */}
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
            {/* Admin toggle */}
            <div className="absolute right-6 top-0 z-10 flex items-center space-x-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-2 rounded-md shadow-md transition-all duration-300">
              <button 
                onClick={() => setIsAdmin(!isAdmin)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  isAdmin 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
                aria-pressed={isAdmin}
              >
                {isAdmin ? "Admin Mode" : "Viewer Mode"}
              </button>
            </div>
            
            {/* Filter section */}
            <PricingFilter 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              categories={categories}
              cards={cards}
              filteredCards={filteredCards}
              isDesktop={isDesktop}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
            />
            
            {/* Grid of pricing cards */}
            <PricingGrid 
              cards={cards}
              filteredCards={filteredCards}
              isAdmin={isAdmin}
              onAddCard={handleAddCard}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              numberOfColumns={numberOfColumns}
            />
          </div>
        </div>
      </main>
      
      {/* Edit modal */}
      {editingCard && (
        <EditCardModal 
          card={editingCard}
          onClose={() => {
            setEditingCard(null);
            setIsNewCard(false);
          }}
          onSave={handleSaveCard}
          categories={categories}
          isNewCard={isNewCard}
        />
      )}
      
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