import { useEffect, useCallback } from 'react';
import { addPassiveEventListener, createOptimizedScrollHandler } from '../utils/performance';

export const useOptimizedScroll = (
  callback: () => void,
  dependencies: React.DependencyList = []
) => {
  const optimizedCallback = useCallback(callback, dependencies);
  
  useEffect(() => {
    const handler = createOptimizedScrollHandler(optimizedCallback);
    
    const cleanup = addPassiveEventListener(window, 'scroll', handler, {
      passive: true,
      capture: false
    });
    
    return cleanup;
  }, [optimizedCallback]);
};

export const useOptimizedTouch = (
  element: React.RefObject<HTMLElement>,
  onTouchStart?: (e: Event) => void,
  onTouchMove?: (e: Event) => void,
  onTouchEnd?: (e: Event) => void
) => {
  useEffect(() => {
    const el = element.current;
    if (!el) return;
    
    const cleanupHandlers: (() => void)[] = [];
    
    if (onTouchStart) {
      cleanupHandlers.push(
        addPassiveEventListener(el, 'touchstart', onTouchStart, { passive: true })
      );
    }
    
    if (onTouchMove) {
      cleanupHandlers.push(
        addPassiveEventListener(el, 'touchmove', onTouchMove, { passive: true })
      );
    }
    
    if (onTouchEnd) {
      cleanupHandlers.push(
        addPassiveEventListener(el, 'touchend', onTouchEnd, { passive: true })
      );
    }
    
    return () => {
      cleanupHandlers.forEach(cleanup => cleanup());
    };
  }, [element, onTouchStart, onTouchMove, onTouchEnd]);
};