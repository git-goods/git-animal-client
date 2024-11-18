'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '_panda/jsx';
import { css } from '_panda/css';
import { dialog, icon } from '_panda/recipes';

const { withProvider, withContext } = createStyleContext(dialog);

const DialogPortal = withContext(styled(DialogPrimitive.Portal), 'portal');
const DialogOverlay = withContext(styled(DialogPrimitive.Overlay), 'overlay');
const DialogClose = withContext(styled(DialogPrimitive.Close), 'close');

const Content = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} {...props}>
      {children}
      <DialogClose>
        <X className={icon()} />
        <span className={css({ srOnly: true })}>Close</span>
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
));
Content.displayName = DialogPrimitive.Content.displayName;

const DialogRoot = withProvider(styled(DialogPrimitive.Root), 'root');
const DialogTrigger = withContext(styled(DialogPrimitive.Trigger), 'trigger');
const DialogContent = withContext(styled(Content), 'content');
const DialogHeader = withContext(styled('div'), 'header');
const DialogFooter = withContext(styled('div'), 'footer');
const DialogTitle = withContext(styled(DialogPrimitive.Title), 'title');
const DialogDescription = withContext(styled(DialogPrimitive.Description), 'description');

const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});

export { Dialog };
