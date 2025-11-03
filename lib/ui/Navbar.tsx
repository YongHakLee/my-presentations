'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '../utils/cn';
import Button from './Button';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: Array<{ label: string; href: string }>;
  cta?: { label: string; href: string; variant?: 'primary' | 'secondary' | 'outline' | 'ghost' };
  transparent?: boolean;
  sticky?: boolean;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      logo,
      links = [],
      cta,
      transparent = false,
      sticky = true,
      ...props
    },
    ref
  ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const baseStyles = [
      'w-full',
      'transition-all',
      'duration-regular',
      'ease-out-quad',
      'z-[var(--layer-header)]',
    ];

    const variantStyles = transparent
      ? [
          'bg-primary-background/80',
          'backdrop-blur-[20px]',
          'border-b',
          'border-primary-text/8',
        ]
      : [
          'bg-primary-background',
          'border-b',
          'border-primary-text/8',
        ];

    const stickyStyles = sticky ? ['sticky', 'top-0'] : [];

    return (
      <nav
        ref={ref}
        className={cn(baseStyles, variantStyles, stickyStyles, className)}
        style={{ height: 'var(--layout-header-height)' }}
        {...props}
      >
        <div className="max-w-[var(--layout-page-max-width)] mx-auto h-full px-[var(--spacing-page-padding-inline)]">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              {logo || (
                <Link href="/" className="flex items-center">
                  <span className="text-title3 font-bold text-primary-text">
                    CodeFactory
                  </span>
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-regular font-regular text-primary-text/75 hover:text-primary-text transition-colors duration-quick ease-out-quad"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              {cta && (
                <Link href={cta.href}>
                  <Button variant={cta.variant || 'primary'} size="medium">
                    {cta.label}
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-primary-text"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-primary-background border-b border-primary-text/8">
            <div className="max-w-[var(--layout-page-max-width)] mx-auto px-[var(--spacing-page-padding-inline)] py-4 space-y-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-regular font-regular text-primary-text/75 hover:text-primary-text transition-colors duration-quick ease-out-quad py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {cta && (
                <div className="pt-2">
                  <Link href={cta.href}>
                    <Button variant={cta.variant || 'primary'} size="medium" fullWidth>
                      {cta.label}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export default Navbar;

