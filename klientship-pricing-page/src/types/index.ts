/**
 * Re-export all types from specific domain files for easier imports
 */

// Re-export all pricing types
export * from './pricing';

// Additional types not in domain-specific files
export type PricingCardFormData = {
  title: string;
  description: string;
  price: string;
  image: string;
};

export type Feature = {
  id: string;
  name: string;
  included: boolean;
};

export type PricingCard = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  features: Feature[];
  cta: string;
  ctaLink: string;
  category: string;
  featured?: boolean;
  premium?: boolean;
  popular?: boolean;
};

export type PricingCardStore = {
  cards: PricingCard[];
  categories: string[];
  addCard: (card: PricingCard) => void;
  updateCard: (id: string, cardData: Partial<PricingCard>) => void;
  removeCard: (id: string) => void;
  addFeature: (cardId: string, feature: Feature) => void;
  updateFeature: (cardId: string, featureId: string, featureData: Partial<Feature>) => void;
  removeFeature: (cardId: string, featureId: string) => void;
  addCategory: (category: string) => void;
}; 

