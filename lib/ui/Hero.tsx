import React from 'react';
import Link from 'next/link';
import { cn } from '../utils/cn';
import Typography from './Typography';
import Button from './Button';

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: { label: string; href?: string; onClick?: () => void };
  secondaryAction?: { label: string; href?: string; onClick?: () => void };
  backgroundImage?: string;
  overlay?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  align?: 'left' | 'center' | 'right';
  titleClassName?: string;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      primaryAction,
      secondaryAction,
      backgroundImage,
      overlay = false,
      size = 'large',
      align = 'center',
      titleClassName,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      small: 'py-16 md:py-20',
      medium: 'py-24 md:py-32',
      large: 'py-32 md:py-48',
      fullscreen: 'min-h-screen flex items-center',
    };

    const alignStyles = {
      left: 'text-left items-start',
      center: 'text-center items-center',
      right: 'text-right items-end',
    };

    const baseStyles = [
      'relative',
      'w-full',
      'flex',
      'flex-col',
      'justify-center',
      sizeStyles[size],
      alignStyles[align],
    ];

    return (
      <section
        ref={ref}
        className={cn(baseStyles, className)}
        {...props}
      >
        {/* Background Image */}
        {backgroundImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            {overlay && (
              <div className="absolute inset-0 bg-primary-background/60" />
            )}
          </>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-[var(--layout-page-max-width)] w-full mx-auto px-[var(--spacing-page-padding-inline)]">
          <div className={cn('flex flex-col gap-6 max-w-3xl', align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '')}>
            {subtitle && (
              <Typography
                variant="regular"
                weight="medium"
                color="accent"
                align={align}
              >
                {subtitle}
              </Typography>
            )}
            
            <Typography
              as="h1"
              variant="title9"
              weight="bold"
              align={align}
              className={cn("leading-tight", titleClassName)}
            >
              {title}
            </Typography>

            {description && (
              <Typography
                variant="large"
                color="muted"
                align={align}
                className="leading-relaxed"
              >
                {description}
              </Typography>
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div
                className={cn(
                  'flex flex-wrap gap-4',
                  align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'
                )}
              >
                {primaryAction && (
                  primaryAction.href ? (
                    <Link href={primaryAction.href}>
                      <Button variant="primary" size="large">
                        {primaryAction.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="primary"
                      size="large"
                      onClick={primaryAction.onClick}
                    >
                      {primaryAction.label}
                    </Button>
                  )
                )}
                {secondaryAction && (
                  secondaryAction.href ? (
                    <Link href={secondaryAction.href}>
                      <Button variant="outline" size="large">
                        {secondaryAction.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      size="large"
                      onClick={secondaryAction.onClick}
                    >
                      {secondaryAction.label}
                    </Button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

export default Hero;

