'use client';

import type { ComponentProps } from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SearchBarProps extends ComponentProps<'input'> {
  onSubmit?: () => void;
}

export function SearchBar({ onSubmit, onKeyDown, className, ...props }: SearchBarProps) {
  return (
    <div className="flex w-full h-10 items-center gap-2 rounded-lg border border-white/25 flex-shrink-0 relative transition-[border-color] duration-100 focus-within:border-white/75">
      <input
        type="text"
        {...props}
        className={cn(
          'w-full h-full border-none outline-none bg-transparent font-product text-glyph-16 px-3 py-2 text-white/75 placeholder:text-white/25',
          className
        )}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit?.();
          }
          onKeyDown?.(e);
        }}
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={onSubmit}>
        <SearchIcon size={20} color="rgba(255, 255, 255, 0.5)" />
      </button>
    </div>
  );
}

