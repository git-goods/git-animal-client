import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-md border border-black',
    'font-product text-glyph-16 font-normal',
    'transition-all duration-200',
    'disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-canary text-black',
          'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#c4c382_inset,0px_3px_0px_0px_#fdfed2_inset]',
          'hover:bg-[#EAE78A]',
          'hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#C4C382_inset,0px_3px_0px_0px_#fdfed2_inset]',
          'disabled:bg-gray-800',
          'disabled:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#a3a3a3_inset,0px_3px_0px_0px_#dbdbdb_inset]',
        ].join(' '),
        secondary: [
          'bg-white text-black',
          'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#A1A1B1_inset,0px_3px_0px_0px_#D2DCFE_inset]',
          'hover:bg-gray-900',
          'hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#A1A1B1_inset,0px_3px_0px_0px_#D2DCFE_inset]',
          'disabled:bg-gray-800',
          'disabled:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#A3A3A3_inset,0px_3px_0px_0px_#DBDBDB_inset]',
        ].join(' '),
      },
      size: {
        s: 'px-6 h-8 min-h-[32px] text-glyph-14',
        m: 'px-[30px] h-10 min-h-[40px] text-glyph-16',
        l: 'px-[76px] py-[25px] min-h-[76px] text-glyph-20',
      },
      floating: {
        true: 'w-full max-w-[calc(100%-32px)] fixed bottom-4 left-1/2 -translate-x-1/2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'm',
      floating: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, floating, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, floating }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export interface AnchorButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const AnchorButton = React.forwardRef<HTMLAnchorElement, AnchorButtonProps>(
  ({ className, variant, size, floating, ...props }, ref) => {
    return (
      <a
        className={cn(buttonVariants({ variant, size, floating }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
AnchorButton.displayName = 'AnchorButton';

export { Button, AnchorButton, buttonVariants };
