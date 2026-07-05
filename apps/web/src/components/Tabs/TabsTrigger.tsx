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
      className={cn(buttonStyle, isSelected && 'selected', className)}
      onClick={() => handleChangeValue(props.value)}
      {...props}
    >
      {children}
    </button>
  );
};

const buttonStyle = cn(
  'flex items-center justify-center w-full h-[40px] text-white-25 bg-white-10 border border-solid border-transparent rounded-[6px] outline-none py-[8px] px-[16px] glyph16-bold transition-all duration-100 ease-in-out',
  'focus:border-white-50',
  '[&.selected]:bg-white-50 [&.selected]:text-white [&.selected]:border-white-50 [&.selected]:focus:border-white',
);

export default TabsTrigger;
