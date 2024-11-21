'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '_panda/jsx';
import { select, icon } from '_panda/recipes';
import { cx } from '_panda/css';
import { selectContentStyle, selectItemStyle, selectTriggerStyle, SelectTriggerStyleProps } from './Select.styles';

const { withProvider, withContext } = createStyleContext(select);

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & SelectTriggerStyleProps
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    {...props}
    className={cx(selectTriggerStyle({ size: props.size }), props.className)}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className={icon({ dimmed: true })} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
Trigger.displayName = SelectPrimitive.Trigger.displayName;

const Viewport = withContext(SelectPrimitive.Viewport, 'viewport');

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      data-position={position}
      {...props}
      className={cx(selectContentStyle, props.className)}
    >
      <Viewport data-position={position}>{children}</Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Content.displayName = SelectPrimitive.Content.displayName;

const ItemIndicator = withContext(styled(SelectPrimitive.ItemIndicator), 'itemIndicator');

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props} className={cx(selectItemStyle, props.className)}>
    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
Item.displayName = SelectPrimitive.Item.displayName;

const SelectRoot = withProvider(styled(SelectPrimitive.Root), 'root');
const SelectGroup = withContext(styled(SelectPrimitive.Group), 'group');
const SelectValue = withContext(styled(SelectPrimitive.Value), 'value');
const SelectTrigger = withContext(styled(Trigger), 'trigger');
const SelectContent = withContext(styled(Content), 'content');
const SelectLabel = withContext(styled(SelectPrimitive.Label), 'label');
const SelectItem = withContext(styled(Item), 'item');
const SelectSeparator = withContext(styled(SelectPrimitive.Separator), 'separator');

export const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
});
