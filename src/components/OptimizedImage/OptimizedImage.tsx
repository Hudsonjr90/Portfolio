import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useOptimizedEvents';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  onLoad,
  onError 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Use intersection observer for lazy loading non-priority images
  const isVisible = useIntersectionObserver(imgRef, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  const shouldLoad = priority || isVisible;

  useEffect(() => {
    if (shouldLoad && imgRef.current && !isLoaded && !hasError) {
      const img = imgRef.current;
      
      const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
      };

      const handleError = () => {
        setHasError(true);
        onError?.();
      };

      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);

      return () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };
    }
  }, [shouldLoad, isLoaded, hasError, onLoad, onError]);

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Placeholder enquanto carrega */}
      {!isLoaded && !hasError && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--card_bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            color: 'var(--text_color)',
            opacity: 0.7
          }}
        >
          Carregando...
        </div>
      )}
      
      {/* Imagem principal */}
      <img
        ref={imgRef}
        src={shouldLoad ? src : undefined}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      
      {/* Fallback para erro */}
      {hasError && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--card_bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            color: 'var(--text_color)',
            opacity: 0.7
          }}
        >
          Imagem indisponível
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;