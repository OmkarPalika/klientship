import { PricingCard } from "@/types/pricing";
import { v4 as uuidv4 } from "uuid"; // We'll need to install this

export const initialCards: PricingCard[] = [
  // Basic Shopify eCommerce Website
  {
    id: uuidv4(),
    title: "Shopify eCommerce Website",
    description: "Create a powerful Shopify store for seamless shopping.",
    price: "INR 1999",
    image: "/shopify-basic.webp",
    features: [
      { id: uuidv4(), name: "E-commerce Store Setup", included: true },
      { id: uuidv4(), name: "Payment Gateway Integration", included: true },
      { id: uuidv4(), name: "Header Design & Setup", included: true },
      { id: uuidv4(), name: "5 Features", included: true },
      { id: uuidv4(), name: "Product Setup (up to 5 products)", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20Shopify%20eCommerce%20Website",
    category: "ecommerce",
    premium: false,
    popular: false,
  },
  
  // WordPress eCommerce Website
  {
    id: uuidv4(),
    title: "WordPress eCommerce Website",
    description: "Build an online store with easy admin and efficiency, optimized for sales.",
    price: "INR 2999",
    image: "/wordpress-basic.webp",
    features: [
      { id: uuidv4(), name: "Free Domain & Hosting", included: true },
      { id: uuidv4(), name: "Storefront Design", included: true },
      { id: uuidv4(), name: "Header Design & Setup", included: true },
      { id: uuidv4(), name: "5 Features", included: true },
      { id: uuidv4(), name: "Product Setup (up to 5 products)", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20WordPress%20eCommerce%20Website",
    category: "ecommerce",
    premium: false,
    popular: false,
  },
  
  // Business Portfolio Website
  {
    id: uuidv4(),
    title: "Business Portfolio Website",
    description: "Showcase your business and services with a stunning, professional website.",
    price: "INR 3999",
    image: "/business-basic.webp",
    features: [
      { id: uuidv4(), name: "Free Domain & Hosting", included: true },
      { id: uuidv4(), name: "One page with 5 sections", included: true },
      { id: uuidv4(), name: "Contact Form Integration", included: true },
      { id: uuidv4(), name: "5 Features", included: true },
      { id: uuidv4(), name: "Professional Portfolio Design", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20Business%20Portfolio%20Website",
    category: "business",
    premium: false,
    popular: false,
  },
  
  // Premium Shopify Website
  {
    id: uuidv4(),
    title: "Premium Shopify eCommerce Website",
    description: "Launch your eCommerce business with a custom designed, high-converting Shopify store.",
    price: "INR 19,999",
    image: "/shopify-premium.webp",
    features: [
      { id: uuidv4(), name: "Complete Shopify Store Setup", included: true },
      { id: uuidv4(), name: "Custom Payment Gateway Integration", included: true },
      { id: uuidv4(), name: "Header & Navigation Design", included: true },
      { id: uuidv4(), name: "5 Resources", included: true },
      { id: uuidv4(), name: "Product Setup (up to 10 products)", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20Premium%20Shopify%20eCommerce%20Website",
    category: "ecommerce",
    premium: true,
    popular: false,
  },
  
  // Premium WordPress Website
  {
    id: uuidv4(),
    title: "Premium WordPress Website",
    description: "Power your business with a dynamic, SEO-friendly WordPress site designed for growth.",
    price: "INR 24,999",
    image: "/wordpress-premium.webp",
    features: [
      { id: uuidv4(), name: "Free Domain & Hosting for One Year", included: true },
      { id: uuidv4(), name: "Responsive Storefront Design", included: true },
      { id: uuidv4(), name: "3 Revisions", included: true },
      { id: uuidv4(), name: "Payment Gateway Integration", included: true },
      { id: uuidv4(), name: "Up to 10 Products Setup", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20Premium%20WordPress%20Website",
    category: "ecommerce",
    premium: true,
    popular: false,
  },
  
  // Premium Business Portfolio
  {
    id: uuidv4(),
    title: "Premium Business Portfolio",
    description: "Create a striking professional online presence with a talented portfolio website.",
    price: "INR 34,999",
    image: "/business-premium.webp",
    features: [
      { id: uuidv4(), name: "Free Domain & Hosting for One Year", included: true },
      { id: uuidv4(), name: "Custom 5-Page Website Design", included: true },
      { id: uuidv4(), name: "Contact Form & Chatbot Integration", included: true },
      { id: uuidv4(), name: "5 Revisions", included: true },
      { id: uuidv4(), name: "Mobile & Tablet Optimized Layout", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20Premium%20Business%20Portfolio",
    category: "business",
    premium: true,
    featured: true,
    popular: true,
  },
  
  // Basic Android App Development
  {
    id: uuidv4(),
    title: "Basic Android App",
    description: "Launch your mobile app with our basic Android development service.",
    price: "INR 2,999",
    image: "/android-basic.webp",
    features: [
      { id: uuidv4(), name: "Free Play Store Publishing", included: true },
      { id: uuidv4(), name: "Mobile Optimized Interface", included: true },
      { id: uuidv4(), name: "Custom UI/UX Design", included: true },
      { id: uuidv4(), name: "3 Resources", included: true },
      { id: uuidv4(), name: "Responsive for All Screen Sizes", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20Basic%20Android%20App",
    category: "android",
    premium: false,
    popular: false,
  },
  
  // Premium Android App Development
  {
    id: uuidv4(),
    title: "Premium Android App",
    description: "Launch your mobile app with our premium Android development service.",
    price: "INR 9,999",
    image: "/android-premium.webp",
    features: [
      { id: uuidv4(), name: "Free Play Store Publishing", included: true },
      { id: uuidv4(), name: "Mobile Optimized Interface", included: true },
      { id: uuidv4(), name: "Custom UI/UX Design", included: true },
      { id: uuidv4(), name: "3 Resources", included: true },
      { id: uuidv4(), name: "Responsive for All Screen Sizes", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20Premium%20Android%20App",
    category: "android",
    premium: true,
    popular: false,
  },
  
  // Custom Android App Development
  {
    id: uuidv4(),
    title: "Custom Android App",
    description: "Develop a fully customized Android app tailored to your specific business needs.",
    price: "Let's Talk",
    image: "/android-custom.webp",
    features: [
      { id: uuidv4(), name: "Free Play Store Publishing", included: true },
      { id: uuidv4(), name: "Mobile Optimized Interface", included: true },
      { id: uuidv4(), name: "Custom UI/UX Design", included: true },
      { id: uuidv4(), name: "3 Revisions", included: true },
      { id: uuidv4(), name: "Responsive for All Screen Sizes", included: true },
    ],
    cta: "Whatsapp now",
    ctaLink: "https://wa.me/1234567890?text=I'm%20interested%20in%20Custom%20Android%20App",
    category: "android",
    premium: true,
    popular: true,
  },
]; 