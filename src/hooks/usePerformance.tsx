
import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Web Vitals tracking
    if ('web-vital' in window) {
      return;
    }

    // Simple performance monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          // Track key metrics
          const metrics = {
            dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
            tcp: navEntry.connectEnd - navEntry.connectStart,
            ttfb: navEntry.responseStart - navEntry.requestStart,
            download: navEntry.responseEnd - navEntry.responseStart,
            domReady: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
            loadComplete: navEntry.loadEventEnd - navEntry.fetchStart,
          };
          
          // In production, send to analytics
          if (process.env.NODE_ENV === 'production') {
            // Analytics tracking would go here
            console.log('Performance metrics:', metrics);
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['navigation', 'measure'] });
    } catch (error) {
      // Fallback for older browsers
      console.warn('Performance Observer not supported');
    }

    return () => observer.disconnect();
  }, []);
};
