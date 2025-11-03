import React from 'react';
import { cn } from '../utils/cn';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 'title1' | 'title2' | 'title3' | 'title4' | 'title5' | 'title6' | 'title7' | 'title8' | 'title9' | 'regular' | 'small' | 'mini' | 'micro' | 'tiny' | 'large';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'accent';
  align?: 'left' | 'center' | 'right';
  fontFamily?: 'regular' | 'serif' | 'mono';
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      as: Component = 'p',
      variant = 'regular',
      weight = 'normal',
      color = 'default',
      align = 'left',
      fontFamily = 'regular',
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      title1: ['text-title1', 'font-semibold', 'leading-tight'],
      title2: ['text-title2', 'font-semibold', 'leading-tight'],
      title3: ['text-title3', 'font-semibold', 'leading-tight'],
      title4: ['text-title4', 'font-semibold', 'leading-tight'],
      title5: ['text-title5', 'font-bold', 'leading-tight'],
      title6: ['text-title6', 'font-bold', 'leading-tight'],
      title7: ['text-title7', 'font-bold', 'leading-tight'],
      title8: ['text-title8', 'font-bold', 'leading-tight'],
      title9: ['text-title9', 'font-bold', 'leading-tight'],
      large: ['text-large'],
      regular: ['text-regular'],
      small: ['text-small'],
      mini: ['text-mini'],
      micro: ['text-micro'],
      tiny: ['text-tiny'],
    };

    const weightStyles = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const colorStyles = {
      default: 'text-primary-text',
      muted: 'text-primary-text/70',
      accent: 'text-semantic-indigo',
    };

    const alignStyles = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    const familyStyles = {
      regular: 'font-regular',
      serif: 'font-serif',
      mono: 'font-mono',
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          variantStyles[variant],
          weightStyles[weight],
          colorStyles[color],
          alignStyles[align],
          familyStyles[fontFamily],
          className
        )}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;
