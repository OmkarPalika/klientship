// components/ScrollAnimatedSection.tsx
'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollAnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollAnimatedSection({ 
  children, 
  className = '',
  delay = 0
}: ScrollAnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
