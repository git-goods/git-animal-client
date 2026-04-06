'use client';

import type { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

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
        'flex h-10 w-full items-center justify-center rounded-md border border-transparent bg-white/10 px-4 py-2 font-product text-glyph-16 font-bold text-white/25 outline-none transition-all duration-100 ease-in-out',
        'focus:border-white/50',
        isSelected && 'selected border-white/50 bg-white/50 text-white focus:border-white',
        className,
      )}
      onClick={() => handleChangeValue(props.value)}
      {...props}
    >
      {children}
    </button>
  );
};

export default TabsTrigger;
