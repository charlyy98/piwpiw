import { useState, useEffect } from 'react';

// Responsive breakpoints matching Tailwind CSS
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  const [breakpoint, setBreakpoint] = useState('lg');

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      // Determine current breakpoint
      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    }

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper functions
  const isMobile = windowSize.width < breakpoints.md;
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isDesktop = windowSize.width >= breakpoints.lg;
  const isLargeDesktop = windowSize.width >= breakpoints.xl;

  const getGridCols = (cols) => {
    const { mobile = 1, tablet = 2, desktop = cols || 4 } = 
      typeof cols === 'object' ? cols : { desktop: cols };

    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getSpacing = (spacing) => {
    const { mobile = 'sm', desktop = spacing || 'md' } = 
      typeof spacing === 'object' ? spacing : { desktop: spacing };

    return isMobile ? mobile : desktop;
  };

  return {
    windowSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    getGridCols,
    getSpacing,
  };
}
