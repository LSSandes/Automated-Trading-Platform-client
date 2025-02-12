import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderColor?: string;
}

export default function LazyImage({ 
  src, 
  alt,
  placeholderColor = '#1C1C1F',
  className = '',
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, isVisible] = useIntersectionObserver();
  const [currentSrc, setCurrentSrc] = useState<string>('');

  useEffect(() => {
    if (isVisible && !currentSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };
    }
  }, [isVisible, src, currentSrc]);

  return (
    <div
      ref={ref as unknown as React.RefCallback<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: placeholderColor }}
      {...props}
    >
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  );
}