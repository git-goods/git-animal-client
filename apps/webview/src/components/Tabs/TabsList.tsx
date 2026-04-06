import type { ComponentProps } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

interface TabsListProps extends ComponentProps<'div'> {
  gap?: string;
  width?: string;
}

const TabsList = ({ children, className, gap = '6px', width = '100%', style, ...props }: TabsListProps) => {
  return (
    <div
      className={cn('flex', className)}
      style={{ gap, width, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default TabsList;
