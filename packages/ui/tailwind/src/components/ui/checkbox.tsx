'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Checkbox 와 1:1 (panda 원본 + checkboxLightStyle 기준).
 * - rounded 는 panda `radii.sm`(= calc(0.5rem - 4px) = 4px) → `rounded-[4px]`.
 *   dev 변환본의 `rounded-sm`(Tailwind 기본 2px) 은 오류라 폐기.
 * - border 색/checked 배경은 checkboxLightStyle override(#fafafa / #000) 를 그대로 재현.
 * - focus ring 은 panda recipe 의 `ring` 토큰 실측값(활성 :root 테마 = grayscale-400 = zinc-400 = #a1a1aa)
 *   / offset `background`(= grayscale-0 = white). dev 변환본의 `ring-white/25`(opacity 임의) 은 오류라 폐기.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 cursor-pointer rounded-[4px] border border-[#fafafa]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a1a1aa] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-[#fafafa] data-[state=checked]:text-black',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
