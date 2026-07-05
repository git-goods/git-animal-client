'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Tooltip 과 1:1 (visible 스타일은 GitAnimals override 기준).
 * - panda tooltip recipe(z-50/overflow-hidden/positioning)는 구조만, 색/패딩은 override:
 *   bg #404148, backdrop-blur 7px, white, glyph14-regular, border 1px solid #404148, padding 12/16, rounded 8.
 * - 애니메이션은 표준 shadcn(tailwindcss-animate): fade/zoom/slide. shadow-panda enter/exit 와 시각적 동등.
 * - border-solid 명시(ADR-014).
 */
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-[8px] border border-solid border-[#404148] bg-[#404148] px-[16px] py-[12px] glyph14-regular text-white backdrop-blur-[7px]',
      'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
