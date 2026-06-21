import type { PropsWithChildren } from 'react';
import { cn, dialogTitleStyle } from '@gitanimals/ui-tailwind';
import { XIcon } from 'lucide-react';

import { BackTrigger } from '@/components/Trigger';

export function PageModalLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="max-w-[880px] mx-auto bg-gray-150 p-[40px] rounded-[16px] text-white w-full relative mobile:min-h-[calc(100vh-var(--mobile-header-height))] mobile:rounded-none mobile:p-5">
        <BackTrigger className="absolute top-[16px] right-[16px]">
          <XIcon />
        </BackTrigger>
        <div className="flex flex-col gap-[24px]">{children}</div>
      </div>
    </div>
  );
}

export const PageModalTitle = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h2 className={cn(dialogTitleStyle, className)}>{children}</h2>
);
