// src/context/ScrollContext.tsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useScroll, MotionValue } from 'framer-motion';

interface ScrollContextProps {
  scrollY: MotionValue<number>;
  threshold: number;
  heroRef: React.RefObject<HTMLDivElement>;
}

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollY } = useScroll();
  const [threshold, setThreshold] = useState<number>(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const calculateThreshold = () => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.getBoundingClientRect().height;
      setThreshold(0.7 * heroHeight);
    }
  };

  useEffect(() => {
    calculateThreshold();
    window.addEventListener('resize', calculateThreshold);
    return () => window.removeEventListener('resize', calculateThreshold);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY, threshold, heroRef }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};
