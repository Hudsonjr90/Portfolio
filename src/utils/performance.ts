// Performance utilities for scroll optimization

export const addPassiveEventListener = (
  element: Element | Window,
  event: string,
  handler: EventListener,
  options: AddEventListenerOptions = {}
) => {
  const passiveOptions = {
    passive: true,
    ...options
  };
  
  element.addEventListener(event, handler, passiveOptions);
  
  return () => {
    element.removeEventListener(event, handler, passiveOptions);
  };
};

// Optimized scroll handler with throttling
export const createOptimizedScrollHandler = (callback: () => void) => {
  let ticking = false;
  
  const handler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  return handler;
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Performance monitor for debugging
export const measurePerformance = (name: string, fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};