'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { createStyleContext } from '@shadow-panda/style-context';
import { css, cx } from '_panda/css';
import { styled } from '_panda/jsx';
import { tooltip } from '_panda/recipes';
import React from 'react';

const { withProvider, withContext } = createStyleContext(tooltip);

const Content = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ children, ...props }, ref) => (
  <TooltipPrimitive.Content ref={ref} {...props} className={cx(tooltipContentStyle, props.className)}>
    {children}
  </TooltipPrimitive.Content>
));

const tooltipContentStyle = css({
  base: {
    borderRadius: '8px',
    background: '#404148',
    backdropFilter: 'blur(7px)',
    color: 'white',
    textStyle: 'glyph14.regular',
    border: '1px solid #404148',
    padding: '12px 16px',
  },
});

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = withProvider(styled(TooltipPrimitive.Root), 'root');
export const TooltipTrigger = withContext(styled(TooltipPrimitive.Trigger), 'trigger');
export const TooltipContent = withContext(styled(Content), 'content', {
  sideOffset: 4,
});
