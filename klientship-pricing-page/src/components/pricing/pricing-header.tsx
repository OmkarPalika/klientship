import { Clock, PlusCircle, Sparkles, CalendarDays, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";

// Add seeded random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Simple random number generator with seed
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // Get random number in range
  nextInRange(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

// Create a single instance with fixed seed
const rng = new SeededRandom(42);

// Generate particle positions once for both server and client
const particlePositions = Array.from({ length: 20 }, () => ({
  initialX: rng.nextInRange(0, 1000),
  initialY: rng.nextInRange(0, 500),
  initialOpacity: 0.2 + rng.next() * 0.5,
  initialScale: 0.1 + rng.next() * 0.9,
  animateX: [
    rng.nextInRange(0, 1000),
    rng.nextInRange(0, 1000),
    rng.nextInRange(0, 1000),
  ],
  animateY: [
    rng.nextInRange(0, 500),
    rng.nextInRange(0, 500),
    rng.nextInRange(0, 500),
  ],
  duration: 20 + rng.next() * 30,
}));

type PricingHeaderProps = {
  onAddCard?: () => void;
  animationData?: {
    promotionEnd?: {
      date: Date;
      isoString: string;
      formatted: string;
    };
    particles: {
      id: number;
      initialX: number;
      initialY: number;
      initialOpacity: number;
      initialScale: number;
      animateX: number[];
      animateY: number[];
      duration: number;
    }[];
  };
};

// Add a hook to check if component has mounted (client-side only)
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  return hasMounted;
}

export function PricingHeader({ onAddCard, animationData }: PricingHeaderProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const hasMounted = useHasMounted();

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Calculate promotion end date (30 days from now) - only used if no server data
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 30);
  const defaultFormattedDate = defaultEndDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Use server-provided date if available, otherwise use client-generated date
  const endDate = animationData?.promotionEnd?.date || defaultEndDate;
  const endDateIso = animationData?.promotionEnd?.isoString || endDate.toISOString();
  const formattedDate = animationData?.promotionEnd?.formatted || defaultFormattedDate;

  return (
    <motion.section
      ref={ref}
      className="max-w-6xl mx-auto pt-20 pb-16 text-center px-6 relative overflow-hidden bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-labelledby="pricing-heading"
    >
      {/* Only render animations when client-side */}
      {hasMounted && (
        <>
          {/* Dynamic particles effect - use server-generated values if available */}
          {(animationData?.particles || particlePositions).map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 dark:from-teal-600 dark:to-indigo-600"
              initial={{ 
                x: particle.initialX, 
                y: particle.initialY,
                opacity: particle.initialOpacity,
                scale: particle.initialScale,
              }}
              animate={{
                x: particle.animateX,
                y: particle.animateY,
                opacity: [0.2, 0.5, 0.2],
                scale: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Interactive mouse-following highlight - adjusted for dark theme */}
          <motion.div 
            className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/20 to-teal-300/30 dark:from-indigo-700/20 dark:to-teal-500/20 filter blur-3xl opacity-40 pointer-events-none"
            style={{
              x: mousePosition.x - 400,
              y: mousePosition.y - 400,
            }}
            transition={{ type: "spring", damping: 20 }}
            suppressHydrationWarning
          />
        </>
      )}

      <div className="relative">
        {/* Enhanced background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-80 bg-gradient-to-br from-teal-400/20 to-purple-500/20 dark:from-teal-600/20 dark:to-purple-700/20 blur-3xl rounded-full opacity-50 -z-10"
          style={hasMounted ? {
            transform: `translate(-50%, ${scrollY * 0.05}px) rotate(${scrollY * 0.01}deg)`,
          } : {}}
          suppressHydrationWarning
        ></div>
        
        <div className="absolute bottom-0 right-0 w-full max-w-md h-60 bg-gradient-to-tl from-indigo-400/20 to-teal-500/20 dark:from-indigo-600/20 dark:to-teal-700/20 blur-3xl rounded-full opacity-40 -z-10"
          style={hasMounted ? {
            transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.03}px)`,
          } : {}}
          suppressHydrationWarning
        ></div>
        
        {/* Promotion tag with shimmer effect */}
        <motion.div 
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <Badge variant="outline" className="relative bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 py-1.5 px-3 gap-1.5 rounded-full overflow-hidden group">
            <Sparkles className="w-4 h-4 animate-pulse" aria-hidden="true" />
            <span>Limited Time Offer</span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1500 ease-in-out" />
          </Badge>
        </motion.div>

        {/* Animated heading with gradient text */}
        <motion.h1 
          id="pricing-heading"
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-indigo-500 to-purple-600 dark:from-teal-500 dark:via-indigo-400 dark:to-purple-500"
          variants={itemVariants}
          style={{
            backgroundSize: "200% 200%",
            animation: "gradientShift 8s ease infinite",
          }}
        >
          Limited Period Offer
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Avail our services at special discounted rates. Offer ends soon!
        </motion.p>
        
        {/* Time-limited offer indicators with micro-animations */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 px-4 rounded-full hover:shadow-md transition-all"
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            <span>Limited time promotion</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 px-4 rounded-full hover:shadow-md transition-all"
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <CalendarDays className="w-4 h-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            <span>
              Offer ends <time dateTime={endDateIso}>{formattedDate}</time>
            </span>
          </motion.div>
        </motion.div>
        
        {/* CTA Buttons with enhanced animations */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          {onAddCard && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                onClick={onAddCard}
                className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all group relative overflow-hidden"
              >
                <PlusCircle className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
                Add Custom Service
                
                {/* Button shine effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </Button>
            </motion.div>
          )}
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="#pricing-contact" passHref>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 group relative overflow-hidden border-gray-200 dark:border-gray-700"
              >
                <Star className="h-4 w-4 mr-2 text-amber-500 group-hover:rotate-45 transition-transform" />
                Request Consultation
                
                {/* Button shine effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Trust indicators with scroll-based animations */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
          variants={itemVariants}
          style={hasMounted ? {
            opacity: Math.min(1, Math.max(0, (scrollY - 100) / 300)),
            transform: `translateY(${Math.max(0, 50 - scrollY / 10)}px)`,
          } : {}}
          suppressHydrationWarning
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Trusted by businesses worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Replace with actual logos */}
            <motion.div 
              className="h-8 w-24 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded"
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            ></motion.div>
            <motion.div 
              className="h-8 w-20 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded" 
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }}
            ></motion.div>
            <motion.div 
              className="h-8 w-28 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded"
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
            ></motion.div>
            <motion.div 
              className="h-8 w-24 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded"
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 