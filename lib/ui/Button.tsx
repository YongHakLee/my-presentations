import React from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'font-regular',
      'font-medium',
      'border-0',
      'cursor-pointer',
      'transition-all',
      'duration-quick',
      'ease-out-quad',
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-semantic-indigo',
      'focus-visible:ring-offset-2',
    ];

    const variantStyles = {
      primary: [
        'bg-semantic-indigo',
        'text-primary-white',
        'hover:opacity-90',
        'active:opacity-80',
      ],
      secondary: [
        'bg-semantic-blue',
        'text-primary-white',
        'hover:opacity-90',
        'active:opacity-80',
      ],
      outline: [
        'bg-transparent',
        'text-primary-text',
        'border',
        'border-primary-text/20',
        'hover:bg-primary-text/10',
        'active:bg-primary-text/20',
      ],
      ghost: [
        'bg-transparent',
        'text-primary-text',
        'hover:bg-primary-text/10',
        'active:bg-primary-text/20',
      ],
      danger: [
        'bg-semantic-red',
        'text-primary-white',
        'hover:opacity-90',
        'active:opacity-80',
      ],
    };

    const sizeStyles = {
      small: ['px-3', 'py-1.5', 'text-small', 'rounded-medium'],
      medium: ['px-4', 'py-2', 'text-regular', 'rounded-medium', 'min-h-[44px]'],
      large: ['px-6', 'py-3', 'text-large', 'rounded-large', 'min-h-[48px]'],
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
