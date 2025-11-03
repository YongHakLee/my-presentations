import React from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'medium',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'bg-primary-background',
      'rounded-large',
      'transition-all',
      'duration-quick',
      'ease-out-quad',
    ];

    const variantStyles = {
      default: ['border', 'border-primary-text/8'],
      outlined: ['border', 'border-primary-text/15'],
      elevated: ['shadow-md', 'border', 'border-primary-text/5'],
    };

    const paddingStyles = {
      none: [],
      small: ['p-3'],
      medium: ['p-4'],
      large: ['p-6'],
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1.5 mb-4', className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('text-title2 font-semibold text-primary-text', className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-regular text-primary-text/80', className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  (
    {
      className,
      src,
      alt,
      aspectRatio = 'auto',
      ...props
    },
    ref
  ) => {
    const aspectRatioStyles = {
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[21/9]',
      auto: '',
    };

    return (
      <div className={cn('overflow-hidden rounded-t-large', aspectRatioStyles[aspectRatio])}>
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-transform duration-regular ease-out-quad',
            'hover:scale-105',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

export default Card;
