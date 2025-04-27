import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PricingStore } from '@/types/pricing';
import { initialCards } from '@/lib/data';

// Create the store
export const usePricingStore = create<PricingStore>()(
  persist(
    (set) => ({
      cards: initialCards,
      categories: [
        { id: "ecommerce", name: "E-commerce" },
        { id: "business", name: "Business" },
        { id: "android", name: "Android App" },
        { id: "other", name: "Other" },
      ],
      addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      updateCard: (id, cardData) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, ...cardData } : card
          ),
        })),
      removeCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      addFeature: (cardId, feature) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? { ...card, features: [...card.features, feature] }
              : card
          ),
        })),
      updateFeature: (cardId, featureId, featureData) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  features: card.features.map((feature) =>
                    feature.id === featureId
                      ? { ...feature, ...featureData }
                      : feature
                  ),
                }
              : card
          ),
        })),
      removeFeature: (cardId, featureId) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  features: card.features.filter(
                    (feature) => feature.id !== featureId
                  ),
                }
              : card
          ),
        })),
    }),
    {
      name: 'pricing-store', // name for persisting in localStorage
    }
  )
); 