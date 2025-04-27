/**
 * Consolidated type definitions for pricing components
 */

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

export type Category = {
  id: string;
  name: string;
};

export interface PricingStore {
  cards: PricingCard[];
  categories: Category[];
  addCard: (card: PricingCard) => void;
  updateCard: (id: string, cardData: Partial<PricingCard>) => void;
  removeCard: (id: string) => void;
  addCategory: (category: Category) => void;
  addFeature: (cardId: string, feature: Feature) => void;
  updateFeature: (cardId: string, featureId: string, featureData: Partial<Feature>) => void;
  removeFeature: (cardId: string, featureId: string) => void;
} 