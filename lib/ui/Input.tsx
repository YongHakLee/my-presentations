import React from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = false,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const baseStyles = [
      'font-regular',
      'text-regular',
      'bg-primary-background',
      'text-primary-text',
      'border',
      'border-primary-text/20',
      'rounded-medium',
      'px-4',
      'py-2',
      'min-h-[44px]',
      'transition-all',
      'duration-quick',
      'ease-out-quad',
      'focus:outline-none',
      'focus:border-semantic-indigo',
      'focus:ring-2',
      'focus:ring-semantic-indigo/20',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'placeholder:text-primary-text/40',
    ];

    const errorStyles = error && [
      'border-semantic-red',
      'focus:border-semantic-red',
      'focus:ring-semantic-red',
    ];

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-small font-medium text-primary-text"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(baseStyles, errorStyles, fullWidth && 'w-full', className)}
          {...props}
        />
        {error && (
          <span className="text-micro text-semantic-red">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-micro text-primary-text opacity-60">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
