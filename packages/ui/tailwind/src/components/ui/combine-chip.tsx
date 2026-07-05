'use client';

import * as React from 'react';
import * as ChipPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 CombineChip(radix-select) 과 1:1.
 * - visible 스타일은 GitAnimals override(chipTriggerStyle cva / chipContentStyle / chipItemStyle) 기준.
 * - select recipe 의 구조(item: relative flex, pl-[32px] 인디케이터 공간, rounded-[4px]; itemIndicator: absolute left-[8px] 14px)는 유지.
 * - 애니메이션은 표준 shadcn(tailwindcss-animate). icon md=16px, dimmed=opacity-50.
 */
const chipTriggerStyle = cva(
  'flex w-fit cursor-pointer items-center justify-center border border-solid py-[6px] pl-[8px] pr-[12px]',
  {
    variants: {
      size: {
        small: 'h-[30px] gap-[1px] rounded-[6px] border-white-5 bg-white-5 glyph12-regular text-white-50',
        medium: 'h-[36px] gap-[2px] rounded-[8px] border-white-25 bg-white-25 glyph16-regular text-white-90',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

const Trigger = React.forwardRef<
  React.ElementRef<typeof ChipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ChipPrimitive.Trigger> & VariantProps<typeof chipTriggerStyle>
>(({ children, className, size, ...props }, ref) => (
  <ChipPrimitive.Trigger ref={ref} {...props} className={cn(chipTriggerStyle({ size }), className)}>
    {children}
    <ChipPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </ChipPrimitive.Icon>
  </ChipPrimitive.Trigger>
));
Trigger.displayName = ChipPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof ChipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ChipPrimitive.Content>
>(({ children, className, position = 'popper', ...props }, ref) => (
  <ChipPrimitive.Portal>
    <ChipPrimitive.Content
      ref={ref}
      position={position}
      data-position={position}
      {...props}
      className={cn(
        'pointer-events-auto relative z-[9999] min-w-[8rem] overflow-hidden rounded-[10px] border border-solid border-black-50 bg-black-75 text-white shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className,
      )}
    >
      <ChipPrimitive.Viewport data-position={position} className="p-[4px]">
        {children}
      </ChipPrimitive.Viewport>
    </ChipPrimitive.Content>
  </ChipPrimitive.Portal>
));
Content.displayName = ChipPrimitive.Content.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof ChipPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ChipPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <ChipPrimitive.Item
    ref={ref}
    {...props}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-[4px] py-[6px] pl-[32px] pr-[8px] outline-none glyph16-regular text-white',
      'hover:bg-white-5 focus:bg-white-5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
  >
    <span className="absolute left-[8px] flex h-[14px] w-[14px] items-center justify-center">
      <ChipPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ChipPrimitive.ItemIndicator>
    </span>
    <ChipPrimitive.ItemText>{children}</ChipPrimitive.ItemText>
  </ChipPrimitive.Item>
));
Item.displayName = ChipPrimitive.Item.displayName;

export const CombineChip = Object.assign(ChipPrimitive.Root, {
  Group: ChipPrimitive.Group,
  Value: ChipPrimitive.Value,
  Trigger,
  Content,
  Label: ChipPrimitive.Label,
  Item,
  Separator: ChipPrimitive.Separator,
});
