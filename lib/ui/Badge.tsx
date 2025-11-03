import React from 'react';
import { cn } from '../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'blue' | 'green' | 'red' | 'orange' | 'yellow' | 'indigo';
  size?: 'small' | 'medium';
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'medium',
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex',
      'items-center',
      'gap-1.5',
      'font-medium',
      'rounded-full',
      'border',
    ];

    const variantStyles = {
      default: [
        'bg-primary-text/10',
        'text-primary-text',
        'border-primary-text/20',
      ],
      blue: [
        'bg-semantic-blue/20',
        'text-semantic-blue',
        'border-semantic-blue/30',
      ],
      green: [
        'bg-semantic-green/20',
        'text-semantic-green',
        'border-semantic-green/30',
      ],
      red: [
        'bg-semantic-red/20',
        'text-semantic-red',
        'border-semantic-red/30',
      ],
      orange: [
        'bg-semantic-orange/20',
        'text-semantic-orange',
        'border-semantic-orange/30',
      ],
      yellow: [
        'bg-semantic-yellow/20',
        'text-semantic-yellow',
        'border-semantic-yellow/30',
      ],
      indigo: [
        'bg-semantic-indigo/20',
        'text-semantic-indigo',
        'border-semantic-indigo/30',
      ],
    };

    const sizeStyles = {
      small: ['px-2', 'py-0.5', 'text-micro'],
      medium: ['px-2.5', 'py-1', 'text-small'],
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full', {
              'bg-primary-text': variant === 'default',
              'bg-semantic-blue': variant === 'blue',
              'bg-semantic-green': variant === 'green',
              'bg-semantic-red': variant === 'red',
              'bg-semantic-orange': variant === 'orange',
              'bg-semantic-yellow': variant === 'yellow',
              'bg-semantic-indigo': variant === 'indigo',
            })}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
