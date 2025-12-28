import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export const usePerformanceMonitoring = (onMetricsUpdate?: (metrics: PerformanceMetrics) => void) => {
  const reportMetrics = useCallback((metrics: PerformanceMetrics) => {
    if (onMetricsUpdate) {
      onMetricsUpdate(metrics);
    }
    
    // Log em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', metrics);
    }
  }, [onMetricsUpdate]);

  useEffect(() => {
    const metrics: PerformanceMetrics = {};
    
    // Web Vitals Observer
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
            break;
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime;
            break;
          case 'first-input':
            const fidEntry = entry as any; // PerformanceEventTiming não está tipado
            metrics.fid = fidEntry.processingStart - fidEntry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value;
            }
            break;
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming;
            metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            break;
        }
      }
      
      reportMetrics(metrics);
    });

    // Observar diferentes tipos de métricas
    try {
      observer.observe({ entryTypes: ['paint'] });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      observer.observe({ entryTypes: ['first-input'] });
      observer.observe({ entryTypes: ['layout-shift'] });
      observer.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      // Fallback para navegadores que não suportam todas as métricas
      console.warn('Some performance metrics not supported:', e);
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [reportMetrics]);
};

// Hook para monitorar carregamento de recursos
export const useResourceLoading = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        // Detectar recursos demorados (>1s)
        if (resource.duration > 1000) {
          console.warn(`Slow resource: ${resource.name} (${resource.duration}ms)`);
        }
        
        // Detectar recursos não cacheados (apenas em produção)
        if (process.env.NODE_ENV === 'production' && resource.transferSize > 0 && resource.decodedBodySize > 0) {
          const compressionRatio = resource.transferSize / resource.decodedBodySize;
          if (compressionRatio > 0.8) {
            console.warn(`Poor compression: ${resource.name} (${(compressionRatio * 100).toFixed(1)}%)`);
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource timing not supported:', e);
    }

    return () => observer.disconnect();
  }, []);
};