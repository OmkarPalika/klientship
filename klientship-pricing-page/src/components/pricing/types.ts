export type Feature = {
  id: string;
  name: string;
  included: boolean;
};

export type PricingCardType = {
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

// Store-related types
export interface PricingStore {
  cards: PricingCardType[];
  categories: Category[];
  addCard: (card: PricingCardType) => void;
  updateCard: (id: string, cardData: Partial<PricingCardType>) => void;
  removeCard: (id: string) => void;
  addCategory: (category: Category) => void;
  addFeature: (cardId: string, feature: Feature) => void;
  updateFeature: (cardId: string, featureId: string, featureData: Partial<Feature>) => void;
  removeFeature: (cardId: string, featureId: string) => void;
} 