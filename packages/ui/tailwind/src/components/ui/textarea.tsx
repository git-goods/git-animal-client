'use client';

import * as React from 'react';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 TextArea 와 1:1.
 * - border 는 `border-solid` 명시(ADR-014): Tailwind `border` 는 width 만 지정하므로
 *   panda(`border:1px solid`)와 1:1 을 위해 style 을 명시한다.
 * - padding '16px 12px 8px 20px' = pt/pr/pb/pl. color white, placeholder white-50.
 */
export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full min-h-[102px] shrink-0 resize-none rounded-[8px] border border-solid border-white-25',
      'pb-[8px] pl-[20px] pr-[12px] pt-[16px] text-white placeholder:text-white-50',
      className,
    )}
    {...props}
  />
));
TextArea.displayName = 'TextArea';

export { TextArea };
