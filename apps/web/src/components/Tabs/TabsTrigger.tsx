'use client';

import type { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

import { useTabsContext } from './Tabs';

interface TabsTriggerProps extends ComponentProps<'button'> {
  value: string;
}

const TabsTrigger = ({ children, className, ...props }: PropsWithChildren<TabsTriggerProps>) => {
  const { value, handleChangeValue } = useTabsContext();
  const isSelected = value === props.value;

  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center w-full h-10',
        'text-white/25 bg-white/10',
        'border border-transparent rounded-md outline-none',
        'px-4 py-2 font-product text-glyph-16 font-bold',
        'transition-all duration-100 ease-in-out',
        'focus:border-white/50',
        isSelected && 'bg-white/50 text-white border-white/50 focus:border-white',
        className
      )}
      onClick={() => handleChangeValue(props.value)}
      {...props}
    >
      {children}
    </button>
  );
};

export default TabsTrigger;
