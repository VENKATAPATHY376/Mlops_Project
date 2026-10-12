import React from 'react';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'aside';
  padded?: boolean;
}

export function GlassCard({ children, className, as = 'div', padded = true, ...rest }: GlassCardProps) {
  const Tag = as;
  return (
    <Tag
      className={twMerge(
        'rounded-2xl border border-line/70 bg-surface/70 shadow-glass backdrop-blur-xl',
        padded && 'p-5',
        className
      )}
      {...rest}>
      
      {children}
    </Tag>);

}