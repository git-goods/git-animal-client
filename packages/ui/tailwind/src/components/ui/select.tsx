'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Select(radix-select) 와 1:1.
 * - 구조는 CombineChip 과 동일(select recipe), 스타일만 Select.styles 값.
 * - trigger cva(base/sm), content(black-75/border black-50/rounded-10), item(white/glyph16/hover white-5).
 * - 애니메이션 표준 shadcn(ADR-015). icon md=16, dimmed=opacity-50.
 */
const selectTriggerStyle = cva(
  'flex w-fit items-center justify-center rounded-[10px] border-white-25 bg-white-25 px-[8px] py-[6px] h-[36px] glyph16-regular text-white-90',
  {
    variants: {
      size: {
        sm: 'h-[30px] bg-white-5',
      },
    },
  },
);

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectTriggerStyle>
>(({ children, className, size, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props} className={cn(selectTriggerStyle({ size }), className)}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
Trigger.displayName = SelectPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, className, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      data-position={position}
      {...props}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-[10px] border border-solid border-black-50 bg-black-75 text-white shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className,
      )}
    >
      <SelectPrimitive.Viewport data-position={position} className="p-[4px]">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Content.displayName = SelectPrimitive.Content.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    {...props}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-[4px] py-[6px] pl-[32px] pr-[8px] outline-none glyph16-regular text-white',
      'hover:bg-white-5 focus:bg-white-5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
  >
    <span className="absolute left-[8px] flex h-[14px] w-[14px] items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
Item.displayName = SelectPrimitive.Item.displayName;

export const Select = Object.assign(SelectPrimitive.Root, {
  Group: SelectPrimitive.Group,
  Value: SelectPrimitive.Value,
  Trigger,
  Content,
  Label: SelectPrimitive.Label,
  Item,
  Separator: SelectPrimitive.Separator,
});
