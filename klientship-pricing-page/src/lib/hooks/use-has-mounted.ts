import { useState, useEffect } from 'react';

/**
 * Hook to determine if the component has mounted client-side
 * Useful for avoiding hydration mismatches with dynamic content
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  return hasMounted;
} 