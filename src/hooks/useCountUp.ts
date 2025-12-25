'use client';

import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  enableScrollSpy?: boolean;
  threshold?: number;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  enableScrollSpy = true,
  threshold = 0.3,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(!enableScrollSpy);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableScrollSpy) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [enableScrollSpy, hasStarted, threshold]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out cubic)
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const currentCount = start + (end - start) * easedProgress;
      setCount(Number(currentCount.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasStarted, end, start, duration, decimals]);

  return { count, ref };
}
