'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[3000] bg-black/75',
      'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'bg-gray-150 rounded-2xl border border-gray-150',
    'z-[3001] text-white flex flex-col',
  ].join(' '),
  {
    variants: {
      size: {
        default: [
          'flex flex-col items-center justify-center gap-7 p-6 max-w-fit min-w-[300px]',
          'max-mobile:max-w-[calc(100vw-48px)]',
        ].join(' '),
        large: [
          'p-[60px_40px] rounded-2xl bg-gray-150',
          'max-w-[calc(100%-400px)] max-h-[calc(100%-240px)] w-full h-full',
          'max-[1200px]:p-[48px_24px] max-[1200px]:max-w-[calc(100vw-240px)] max-[1200px]:max-h-[calc(100vh-120px)]',
          'max-mobile:h-full max-mobile:max-w-[100vw] max-mobile:max-h-[100vh] max-mobile:rounded-none',
        ].join(' '),
        screen: [
          'm-auto rounded-none bg-gray-150 p-6',
          'w-screen h-screen max-w-[100vw] max-h-[100vh]',
          'flex flex-col items-center justify-center',
          'min-[1920px]:rounded-2xl min-[1920px]:w-[1400px] min-[1920px]:h-fit',
        ].join(' '),
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  isShowClose?: boolean;
}

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className, children, size, isShowClose = true, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={cn(dialogContentVariants({ size }), className)} {...props}>
        {children}
        {isShowClose && (
          <DialogClose className="absolute right-4 top-4 bg-transparent p-0 outline-none">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'font-product text-glyph-32 font-bold text-white text-center',
      'max-[1200px]:text-glyph-32',
      'max-mobile:text-glyph-24',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('font-product text-glyph-16 text-white/70', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Compound component pattern (Dialog.Content, Dialog.Title, etc.)
const DialogCompound = Object.assign(Dialog, {
  Root: Dialog,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Close: DialogClose,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});

export {
  DialogCompound as Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants,
};
