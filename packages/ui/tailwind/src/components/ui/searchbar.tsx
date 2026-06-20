'use client';

import * as React from 'react';
import { SearchIcon } from 'lucide-react';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 SearchBar 와 1:1.
 * - container: flex, 1px border(white-25), focus-within 시 white-75. transition border-color 0.1s.
 *   border 는 `border-solid` 명시(ADR-014).
 * - input: 투명(border-none/outline-none), glyph16-regular, color white-75, placeholder white-25.
 * - 우측 SearchIcon(20px, rgba(255,255,255,.5)) 버튼. Enter 키 → onSubmit.
 */
export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit?: () => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSubmit, onKeyDown, className, ...props }, ref) => {
    return (
      <div className="relative flex h-[40px] w-full shrink-0 items-center gap-[8px] rounded-[8px] border border-solid border-white-25 transition-[border-color] duration-100 ease-in-out focus-within:border-white-75">
        <input
          type="text"
          ref={ref}
          {...props}
          className={cn(
            'h-full w-full border-none px-[12px] py-[8px] outline-none glyph16-regular text-white-75 placeholder:text-white-25',
            className,
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit?.();
            }
            onKeyDown?.(e);
          }}
        />
        <button className="absolute right-[12px] top-1/2 -translate-y-1/2" onClick={onSubmit}>
          <SearchIcon size={20} color="rgba(255, 255, 255, 0.5)" />
        </button>
      </div>
    );
  },
);
SearchBar.displayName = 'SearchBar';

export { SearchBar };
