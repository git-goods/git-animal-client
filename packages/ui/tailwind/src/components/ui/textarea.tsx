import * as React from 'react';
import { cn } from '../../utils/cn';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'w-full min-h-[102px]',
          'px-5 py-4 pb-2',
          'rounded-lg border border-white/25',
          'bg-transparent text-white',
          'font-product text-glyph-16',
          'resize-none shrink-0',
          'placeholder:text-white/50',
          'focus:outline-none focus:border-white/50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'TextArea';

export { TextArea };
