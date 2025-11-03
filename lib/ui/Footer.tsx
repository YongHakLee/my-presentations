import React from 'react';
import Link from 'next/link';
import { cn } from '../utils/cn';
import Typography from './Typography';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: Array<{ label: string; href: string; icon?: React.ReactNode }>;
  copyright?: string;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      logo,
      description,
      sections = [],
      socialLinks = [],
      copyright = `© ${new Date().getFullYear()} All rights reserved.`,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'w-full bg-primary-background border-t border-primary-text/8',
          'z-[var(--layer-footer)]',
          className
        )}
        {...props}
      >
        <div className="max-w-[var(--layout-page-max-width)] mx-auto px-[var(--spacing-page-padding-inline)] py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              {logo !== undefined ? logo : (
                <Typography variant="title3" weight="bold" className="text-primary-text">
                  My Presentations
                </Typography>
              )}
              {description && (
                <Typography variant="small" color="muted">
                  {description}
                </Typography>
              )}
              
              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex gap-3 pt-2">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="w-8 h-8 rounded-medium bg-primary-text/10 hover:bg-primary-text/20 flex items-center justify-center transition-colors duration-quick ease-out-quad"
                      aria-label={social.label}
                    >
                      {social.icon || (
                        <svg
                          className="w-4 h-4 text-primary-text"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.683-.217.683-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.092.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.591 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Sections */}
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <Typography variant="small" weight="semibold" className="text-primary-text">
                  {section.title}
                </Typography>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-small text-primary-text/70 hover:text-primary-text transition-colors duration-quick ease-out-quad"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-primary-text/8">
            <Typography variant="micro" color="muted" align="center">
              {copyright}
            </Typography>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export default Footer;

