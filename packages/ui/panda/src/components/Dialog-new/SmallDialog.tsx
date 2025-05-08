'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '_panda/jsx';
import { css } from '_panda/css';
import { dialog, icon } from '_panda/recipes';
const { withProvider, withContext } = createStyleContext(dialog);

const SmallDialogPortal = withContext(styled(DialogPrimitive.Portal), 'portal');
const SmallDialogOverlay = withContext(styled(DialogPrimitive.Overlay), 'overlay');
const SmallDialogClose = withContext(styled(DialogPrimitive.Close), 'close');

const Content = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, ...props }, ref) => (
  <SmallDialogPortal>
    <SmallDialogOverlay />
    <DialogPrimitive.Content ref={ref} {...props}>
      {children}
      <SmallDialogClose>
        <X className={icon()} />
        <span className={css({ srOnly: true })}>Close</span>
      </SmallDialogClose>
    </DialogPrimitive.Content>
  </SmallDialogPortal>
));
Content.displayName = DialogPrimitive.Content.displayName;

export const SmallDialog = withProvider(styled(DialogPrimitive.Root), 'root');
export const SmallDialogTrigger = withContext(styled(DialogPrimitive.Trigger), 'trigger');
export const SmallDialogContent = withContext(styled(Content), 'content');
export const SmallDialogHeader = withContext(styled('div'), 'header');
export const SmallDialogFooter = withContext(styled('div'), 'footer');
export const SmallDialogTitle = withContext(styled(DialogPrimitive.Title), 'title');
export const SmallDialogDescription = withContext(styled(DialogPrimitive.Description), 'description');
