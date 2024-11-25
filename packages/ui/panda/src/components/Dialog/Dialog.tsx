'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '_panda/jsx';
import { css, cx } from '_panda/css';
import { dialog } from '_panda/recipes';
import { dialogContentCva, DialogContentVariants } from './Dialog.styles.ts';

const { withProvider, withContext } = createStyleContext(dialog);

const DialogPortal = withContext(styled(DialogPrimitive.Portal), 'portal');
const DialogOverlay = withContext(styled(DialogPrimitive.Overlay), 'overlay');
const DialogClose = withContext(styled(DialogPrimitive.Close), 'close');

const Content = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & DialogContentVariants
>(({ children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className={overlayStyle} />
    <DialogPrimitive.Content
      ref={ref}
      {...props}
      className={cx(dialogContentCva({ size: props.size ?? 'default' }), props.className)}
    >
      {children}
      <DialogClose className={closeStyle}>
        <X size={24} color="white" />
        <span className={css({ srOnly: true })}>Close</span>
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
));

Content.displayName = DialogPrimitive.Content.displayName;

const overlayStyle = css({ background: 'black.black_75', zIndex: 3000 });
const closeStyle = css({ background: 'transparent', outline: 'none', padding: '0' });

const Title = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ children, ...props }, ref) => {
  console.log('props: ', props);
  return (
    <DialogPrimitive.Title ref={ref} {...props} className={cx('dialog-title', titleStyle, props.className)}>
      {children}
    </DialogPrimitive.Title>
  );
});

const titleStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white.white_100',
  textAlign: 'center',
  '@media (max-width: 1200px)': {
    textStyle: 'glyph32.bold',
  },
  _mobile: {
    textStyle: 'glyph24.bold',
  },
});

Title.displayName = DialogPrimitive.Title.displayName;

const DialogRoot = withProvider(styled(DialogPrimitive.Root), 'root');
const DialogTrigger = withContext(styled(DialogPrimitive.Trigger), 'trigger');
const DialogContent = withContext(styled(Content), 'content');
const DialogHeader = withContext(styled('div'), 'header');
const DialogFooter = withContext(styled('div'), 'footer');
const DialogTitle = withContext(styled(Title), 'title');
const DialogDescription = withContext(styled(DialogPrimitive.Description), 'description');

const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});

export { Dialog };
