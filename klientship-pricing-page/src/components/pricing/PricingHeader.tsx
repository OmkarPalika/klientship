"use client";

import { useEffect, useState, useRef } from "react";
import { Clock, PlusCircle, Sparkles, CalendarDays, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type PricingHeaderProps = {
  onAddCard?: () => void;
};

export function PricingHeader({ onAddCard }: PricingHeaderProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{
    initialX: number;
    initialY: number;
    opacity: number;
    scale: number;
    animateX: number[];
    animateY: number[];
    duration: number;
  }>>([]); 
  
  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
    
    // Initialize particles only on the client side
    const particlesArray = Array.from({ length: 20 }).map(() => ({
      initialX: Math.random() * 1000,
      initialY: Math.random() * 500,
      opacity: 0.2 + Math.random() * 0.5,
      scale: 0.1 + Math.random() * 0.9,
      animateX: [
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000,
      ],
      animateY: [
        Math.random() * 500,
        Math.random() * 500,
        Math.random() * 500,
      ],
      duration: 20 + Math.random() * 30,
    }));
    setParticles(particlesArray);
  }, []);

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

  // Static end date - same for server and client to avoid hydration mismatch
  // Using a fixed date 30 days from a specific reference date
  const endDateRef = useRef(new Date("2025-05-16"));
  const formattedDate = endDateRef.current.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.section
      ref={ref}
      className="max-w-6xl mx-auto pt-24 pb-16 text-center px-6 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-labelledby="pricing-heading"
    >
      {/* Enhanced dynamic particles effect with more colorful particles */}
      {isClient && particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute h-2 w-2 rounded-full ${
            i % 3 === 0 
              ? "bg-gradient-to-r from-teal-400 to-indigo-500" 
              : i % 3 === 1 
                ? "bg-gradient-to-r from-fuchsia-400 to-indigo-500" 
                : "bg-gradient-to-r from-amber-400 to-rose-500"
          }`}
          initial={{ 
            x: particle.initialX, 
            y: particle.initialY,
            opacity: particle.opacity,
            scale: particle.scale,
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

      {/* Enhanced interactive mouse-following highlight */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 via-teal-300/20 to-purple-500/20 filter blur-3xl opacity-40 pointer-events-none"
        style={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      
      {/* Additional animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated circles */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -top-32 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-amber-500/5 to-rose-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Promotional content container with improved styling */}
      <motion.div 
        className="relative mx-auto max-w-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl z-10"
        variants={itemVariants}
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
          boxShadow: "0 20px 60px -15px rgba(0,0,0,0.1), 0 8px 20px -5px rgba(0,0,0,0.07)"
        }}
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden -z-10 opacity-80">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-80 bg-gradient-to-br from-teal-400/20 to-purple-500/20 blur-3xl rounded-full opacity-50 dark:from-teal-400/10 dark:to-purple-500/10"
            style={{
              transform: `translate(-50%, ${scrollY * 0.05}px) rotate(${scrollY * 0.01}deg)`,
            }}
          ></div>
          
          <div 
            className="absolute bottom-0 right-0 w-full max-w-md h-60 bg-gradient-to-tl from-indigo-400/20 to-teal-500/20 blur-3xl rounded-full opacity-40 dark:from-indigo-400/10 dark:to-teal-500/10"
            style={{
              transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.03}px)`,
            }}
          ></div>
          
          {/* Add new gradient elements */}
          <div 
            className="absolute -left-10 top-1/3 w-40 h-40 bg-gradient-to-r from-amber-400/20 to-rose-500/20 blur-3xl rounded-full opacity-60 dark:opacity-30"
            style={{
              transform: `translateY(${scrollY * -0.04}px) rotate(${scrollY * -0.02}deg)`,
            }}
          ></div>
          
          <div 
            className="absolute -right-10 top-2/3 w-40 h-40 bg-gradient-to-r from-fuchsia-400/20 to-indigo-500/20 blur-3xl rounded-full opacity-60 dark:opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.06}px) rotate(${scrollY * 0.03}deg)`,
            }}
          ></div>
        </div>
        
        {/* Promotion tag with shimmer effect */}
        <motion.div 
          className="flex justify-center mb-5"
          variants={itemVariants}
        >
          <Badge variant="outline" className="relative bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 py-1.5 px-3 gap-1.5 rounded-full overflow-hidden group">
            <Sparkles className="w-4 h-4 animate-pulse" aria-hidden="true" />
            <span>Limited Time Offer</span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1500 ease-in-out" />
          </Badge>
        </motion.div>

        {/* Animated heading with gradient text */}
        <motion.h1 
          id="pricing-heading"
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-indigo-500 to-purple-600 dark:from-teal-400 dark:via-indigo-300 dark:to-purple-400"
          variants={itemVariants}
          style={{
            backgroundSize: "200% 200%",
            animation: "gradientShift 8s ease infinite",
          }}
        >
          Special Pricing Offer
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Take advantage of our exclusive discounted rates on professional web and app development services. Perfect for businesses looking to establish or enhance their digital presence.
        </motion.p>
        
        {/* Time-limited offer indicators with micro-animations */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50/70 dark:bg-gray-800/50 py-2 px-4 rounded-full hover:shadow-md transition-all"
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            <span>Limited time promotion</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50/70 dark:bg-gray-800/50 py-2 px-4 rounded-full hover:shadow-md transition-all"
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <CalendarDays className="w-4 h-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            <span>Offer ends <time dateTime={endDateRef.current.toISOString()}>{formattedDate}</time></span>
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
                className="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 group relative overflow-hidden"
              >
                <Star className="h-4 w-4 mr-2 text-amber-500 group-hover:rotate-45 transition-transform" />
                Request Consultation
                
                {/* Button shine effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Trust indicators with scroll-based animations */}
      <motion.div
        className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        variants={itemVariants}
        style={{
          opacity: Math.min(1, Math.max(0, (scrollY - 100) / 300)),
          transform: `translateY(${Math.max(0, 50 - scrollY / 10)}px)`,
        }}
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
      
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </motion.section>
  );
} 