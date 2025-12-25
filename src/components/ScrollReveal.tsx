'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'zoom-in' | 'zoom-out';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Una vez visible, deja de observar
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all';
    const delayClass = delay > 0 ? '' : '';

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClass} opacity-0 translate-y-10`;
        case 'fade-down':
          return `${baseClass} opacity-0 -translate-y-10`;
        case 'fade-left':
          return `${baseClass} opacity-0 translate-x-10`;
        case 'fade-right':
          return `${baseClass} opacity-0 -translate-x-10`;
        case 'fade':
          return `${baseClass} opacity-0`;
        case 'zoom-in':
          return `${baseClass} opacity-0 scale-95`;
        case 'zoom-out':
          return `${baseClass} opacity-0 scale-105`;
        default:
          return `${baseClass} opacity-0`;
      }
    }

    return `${baseClass} ${delayClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
