'use client';

import * as React from 'react';
import * as ChipPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '_panda/jsx';
import { select, icon } from '_panda/recipes';
import { css, cva, cx, RecipeVariantProps } from '_panda/css';

const chipTriggerStyle = cva({
  base: {
    width: 'fit-content',
    padding: '6px 12px 6px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  variants: {
    size: {
      small: {
        height: '30px',
        color: 'white.white_50',
        borderRadius: '6px',
        textStyle: 'glyph12.regular',
        borderColor: 'white.white_5',
        backgroundColor: 'white.white_5',
        gap: '1px',
      },
      medium: {
        height: '36px',
        color: 'white.white_90',
        textStyle: 'glyph16.regular',
        borderColor: 'white.white_25',
        backgroundColor: 'white.white_25',
        borderRadius: '8px',
        gap: '2px',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type ChipTriggerStyleProps = RecipeVariantProps<typeof chipTriggerStyle>;

const chipContentStyle = css({
  backgroundColor: 'black.black_75',
  borderRadius: 10,
  border: '1px solid',
  borderColor: 'black.black_50',
  color: 'white',
});

const chipItemStyle = css({
  color: 'white',
  textStyle: 'glyph16.regular',

  _hover: {
    backgroundColor: 'white.white_5',
  },
  _focus: {
    backgroundColor: 'white.white_5',
  },
});

const { withProvider, withContext } = createStyleContext(select);

const Trigger = React.forwardRef<
  React.ElementRef<typeof ChipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ChipPrimitive.Trigger> & ChipTriggerStyleProps
>(({ children, ...props }, ref) => (
  <ChipPrimitive.Trigger ref={ref} {...props} className={cx(chipTriggerStyle({ size: props.size }), props.className)}>
    {children}
    <ChipPrimitive.Icon asChild>
      <ChevronDown className={icon({ dimmed: true })} />
    </ChipPrimitive.Icon>
  </ChipPrimitive.Trigger>
));
Trigger.displayName = ChipPrimitive.Trigger.displayName;

const Viewport = withContext(ChipPrimitive.Viewport, 'viewport');

const Content = React.forwardRef<
  React.ElementRef<typeof ChipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ChipPrimitive.Content>
>(({ children, position = 'popper', ...props }, ref) => (
  <ChipPrimitive.Portal>
    <ChipPrimitive.Content
      ref={ref}
      position={position}
      data-position={position}
      {...props}
      className={cx(chipContentStyle, props.className)}
    >
      <Viewport data-position={position}>{children}</Viewport>
    </ChipPrimitive.Content>
  </ChipPrimitive.Portal>
));
Content.displayName = ChipPrimitive.Content.displayName;

const ItemIndicator = withContext(styled(ChipPrimitive.ItemIndicator), 'itemIndicator');

const Item = React.forwardRef<
  React.ElementRef<typeof ChipPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ChipPrimitive.Item>
>(({ children, ...props }, ref) => (
  <ChipPrimitive.Item ref={ref} {...props} className={cx(chipItemStyle, props.className)}>
    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>

    <ChipPrimitive.ItemText>{children}</ChipPrimitive.ItemText>
  </ChipPrimitive.Item>
));
Item.displayName = ChipPrimitive.Item.displayName;

const ChipRoot = withProvider(styled(ChipPrimitive.Root), 'root');
const ChipGroup = withContext(styled(ChipPrimitive.Group), 'group');
const ChipValue = withContext(styled(ChipPrimitive.Value), 'value');
const ChipTrigger = withContext(styled(Trigger), 'trigger');
const ChipContent = withContext(styled(Content), 'content');
const ChipLabel = withContext(styled(ChipPrimitive.Label), 'label');
const ChipItem = withContext(styled(Item), 'item');
const ChipSeparator = withContext(styled(ChipPrimitive.Separator), 'separator');

export const CombineChip = Object.assign(ChipRoot, {
  Group: ChipGroup,
  Value: ChipValue,
  Trigger: ChipTrigger,
  Content: ChipContent,
  Label: ChipLabel,
  Item: ChipItem,
  Separator: ChipSeparator,
});
