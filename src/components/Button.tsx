
import React from 'react';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  href?: string;
  isLink?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, href, isLink = false, children, ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-gym-orange focus:ring-opacity-50 relative overflow-hidden",
      {
        "bg-gym-orange hover:bg-gym-orange/90 text-white": variant === 'primary',
        "border-2 border-gym-orange bg-transparent hover:bg-gym-orange/10 text-gym-orange": variant === 'outline',
        "bg-transparent hover:bg-gym-orange/10 text-gym-orange": variant === 'ghost',
        "text-sm px-3 py-1.5": size === 'sm',
        "text-base px-5 py-2.5": size === 'md',
        "text-lg px-7 py-3.5": size === 'lg',
      },
      className
    );

    if (isLink && href) {
      return (
        <Link to={href} className={baseClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
