"use client";

import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationClass, setAnimationClass] = useState('translate-y-20 opacity-0');

  // Calculate scroll progress (0-100)
  const calculateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollProgress(scrollPercent);
    
    // Control visibility and animation
    if (scrollTop > 300) {
      if (!isVisible) {
        setIsVisible(true);
        setTimeout(() => {
          setAnimationClass('translate-y-0 opacity-100');
        }, 10);
      }
    } else {
      if (isVisible) {
        setAnimationClass('translate-y-20 opacity-0');
        setTimeout(() => {
          setIsVisible(false);
        }, 300); // Match transition duration
      }
    }
  };

  useEffect(() => {
    // Initial check on mount
    calculateScrollProgress();
    
    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress);
    
    // Cleanup
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-12 h-12 bg-primary/10 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-ring z-40 group ${animationClass}`}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      {/* Progress circle */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle 
          cx="50" 
          cy="50" 
          r="46" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="text-gray opacity-20"
        />
        <circle 
          cx="50" 
          cy="50" 
          r="46" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="289.27"
          strokeDashoffset={289.27 - (289.27 * scrollProgress) / 100}
          className="text-primary transition-all duration-200"
        />
      </svg>

      {/* Arrow icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary group-hover:-translate-y-2/3 transition-transform duration-300" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>

      {/* Tooltip */}
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-sm pointer-events-none">
        Back to top
      </span>
    </button>
  );
};

export default ScrollToTop; 