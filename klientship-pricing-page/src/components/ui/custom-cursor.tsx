"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type CustomCursorProps = {
  color?: string;
  size?: number;
  outline?: boolean;
  damping?: number;
  stiffness?: number;
  mass?: number;
  showOnMobile?: boolean;
  trailLength?: number;
};

export function CustomCursor({
  color = "rgba(56, 189, 248, 0.4)",
  size = 32,
  outline = true,
  damping = 8, // Reduced for faster response
  stiffness = 300, // Increased for better responsiveness
  mass = 0.3, // Reduced for quicker movements
  showOnMobile = false,
  trailLength = 5,
}: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent cursor on initial load
  const [trail, setTrail] = useState<Array<{x: number, y: number}>>([]);
  
  useEffect(() => {
    // Update cursor state based on device
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    
    // Disable cursor when device is mobile
    if (isMobile && !showOnMobile) {
      document.body.style.cursor = "auto";
      return;
    }
    
    // Hide default cursor
    document.body.style.cursor = "none";
    
    // Handle mouse movement with higher precision
    const handleMouseMove = (e: MouseEvent) => {
      const newPos = {
        x: e.clientX,
        y: e.clientY
      };
      
      setMousePosition(newPos);
      
      // Update trail positions
      setTrail(prev => {
        const newTrail = [...prev, newPos];
        // Keep only the last N positions for the trail
        if (newTrail.length > trailLength) {
          return newTrail.slice(newTrail.length - trailLength);
        }
        return newTrail;
      });
    };
    
    // Handle hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.getAttribute("tabindex") === "0" ||
        target.classList.contains("hoverable")
      ) {
        setCursorVariant("hover");
      }
    };
    
    const handleMouseOut = () => {
      setCursorVariant("default");
    };
    
    // Better pointer events handling with passive flag for performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", checkDevice);
    };
  }, [isMobile, showOnMobile, trailLength]);
  
  const cursorVariants = {
    default: {
      x: mousePosition.x - size / 2,
      y: mousePosition.y - size / 2,
      height: size,
      width: size,
      backgroundColor: color,
      mixBlendMode: "multiply" as const,
      borderRadius: "50%",
      border: outline ? `2px solid ${color.replace(/[^,]+(?=\))/, "0.8")}` : "none",
    },
    hover: {
      x: mousePosition.x - (size * 1.5) / 2,
      y: mousePosition.y - (size * 1.5) / 2,
      height: size * 1.5,
      width: size * 1.5,
      backgroundColor: color.replace(/[^,]+(?=\))/, "0.6"),
      mixBlendMode: "multiply" as const,
      borderRadius: "50%",
      border: outline ? `2px solid ${color.replace(/[^,]+(?=\))/, "0.9")}` : "none",
    }
  };

  if (isMobile && !showOnMobile) return null;

  return (
    <>
      {/* Render the trail particles */}
      {trail.map((position, index) => {
        // Calculate size and opacity based on position in trail
        const scale = 0.1 + (index / trail.length) * 0.9;
        const opacity = 0.1 + (index / trail.length) * 0.4;
        
        return (
          <motion.div
            key={index}
            className="fixed top-0 left-0 pointer-events-none z-40"
            style={{
              x: position.x - (size * scale) / 2,
              y: position.y - (size * scale) / 2,
              height: size * scale,
              width: size * scale,
              opacity,
              backgroundColor: color,
              mixBlendMode: "multiply",
              borderRadius: "50%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />
        );
      })}
      
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          damping,
          stiffness,
          mass,
          restDelta: 0.0001, // Higher precision for smoother following
          restSpeed: 0.0001
        }}
        aria-hidden="true"
      />
    </>
  );
} 