import type { PropsWithChildren } from 'react';
import { cn } from '@gitanimals/ui-tailwind';
import { dialogTitleStyle } from '@gitanimals/ui-tailwind';
import { XIcon } from 'lucide-react';

import { BackTrigger } from '@/components/Trigger';

export function PageModalLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="max-w-[880px] mx-auto bg-gray-150 p-10 rounded-2xl text-white w-full relative max-mobile:min-h-[calc(100vh-var(--mobile-header-height))] max-mobile:rounded-none max-mobile:p-5">
        <BackTrigger className="absolute top-4 right-4">
          <XIcon />
        </BackTrigger>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}

export const PageModalTitle = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h2 className={cn(dialogTitleStyle, className)}>{children}</h2>
);
