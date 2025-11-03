'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../utils/cn';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  loop?: boolean;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      items,
      autoPlay = false,
      autoPlayInterval = 3000,
      showIndicators = true,
      showArrows = true,
      loop = true,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = useCallback(
      (index: number) => {
        if (loop) {
          setCurrentIndex(index < 0 ? items.length - 1 : index >= items.length ? 0 : index);
        } else {
          setCurrentIndex(Math.max(0, Math.min(items.length - 1, index)));
        }
      },
      [items.length, loop]
    );

    const goToPrevious = useCallback(() => {
      goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    const goToNext = useCallback(() => {
      goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    // Auto play
    useEffect(() => {
      if (!autoPlay) return;

      const interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, goToNext]);

    if (items.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden', className)}
        {...props}
      >
        {/* Carousel Container */}
        <div className="relative w-full h-full">
          <div
            className="flex transition-transform duration-regular ease-out-quad"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="min-w-full flex-shrink-0">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2',
                'w-10 h-10 rounded-full bg-primary-background/80 backdrop-blur-sm',
                'border border-primary-text/20',
                'flex items-center justify-center',
                'transition-all duration-quick ease-out-quad',
                'hover:bg-primary-background hover:border-primary-text/40',
                'focus:outline-none focus:ring-2 focus:ring-semantic-indigo focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                !loop && currentIndex === 0 && 'opacity-50 cursor-not-allowed'
              )}
              disabled={!loop && currentIndex === 0}
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 text-primary-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2',
                'w-10 h-10 rounded-full bg-primary-background/80 backdrop-blur-sm',
                'border border-primary-text/20',
                'flex items-center justify-center',
                'transition-all duration-quick ease-out-quad',
                'hover:bg-primary-background hover:border-primary-text/40',
                'focus:outline-none focus:ring-2 focus:ring-semantic-indigo focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                !loop && currentIndex === items.length - 1 && 'opacity-50 cursor-not-allowed'
              )}
              disabled={!loop && currentIndex === items.length - 1}
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 text-primary-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-quick ease-out-quad',
                  index === currentIndex
                    ? 'bg-semantic-indigo w-6'
                    : 'bg-primary-text/40 hover:bg-primary-text/60'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;

