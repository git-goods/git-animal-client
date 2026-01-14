import * as React from 'react';
import { cn } from '../../utils/cn';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <input
          type="text"
          className={cn(
            'h-[55px] w-full px-5 py-3.5',
            'items-start gap-2',
            'rounded-lg border border-white/25',
            'bg-transparent text-white',
            'font-product text-glyph-16',
            'placeholder:text-white/50',
            'focus:outline-none focus:border-white/50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 font-product text-glyph-14 text-brand-coral">
            {error}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = 'TextField';

export { TextField };
