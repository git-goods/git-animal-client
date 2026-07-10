import type { ComponentProps } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

interface TabsListProps extends ComponentProps<'div'> {}

const TabsList = ({ children, className, ...props }: TabsListProps) => {
  return (
    <div {...props} className={cn('flex gap-[6px] w-full', className)}>
      {children}
    </div>
  );
};

export default TabsList;
