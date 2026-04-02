'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, ArrowLeft } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ScrollArea } from './scroll-area';

// ---------------------------------------------------------------------------
// Size Context
// ---------------------------------------------------------------------------

export type DialogV2Size = 'sm' | 'md' | 'lg' | 'full';

const DialogV2SizeContext = React.createContext<DialogV2Size>('md');

export function useDialogV2Size(): DialogV2Size {
  return React.useContext(DialogV2SizeContext);
}

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

const DialogV2Root = DialogPrimitive.Root;
const DialogV2Trigger = DialogPrimitive.Trigger;
const DialogV2Portal = DialogPrimitive.Portal;
const DialogV2Close = DialogPrimitive.Close;

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

const DialogV2Overlay = React.forwardRef<
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
DialogV2Overlay.displayName = 'DialogV2Overlay';

// ---------------------------------------------------------------------------
// Content variants
// ---------------------------------------------------------------------------

export const dialogV2ContentVariants = cva(
  [
    'fixed bg-gray-150 border border-gray-150 z-[3001] text-white flex flex-col w-full overflow-hidden',
    'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
  ].join(' '),
  {
    variants: {
      size: {
        // sm — Always center float
        sm: [
          // base (desktop/tablet): center float
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'max-w-[320px] p-5 gap-3 rounded-2xl',
          // mobile overrides
          'max-mobile:max-w-[calc(100vw-48px)] max-mobile:p-4 max-mobile:gap-2 max-mobile:rounded-xl',
        ].join(' '),

        // md — Center float desktop/tablet, bottom-sheet mobile
        md: [
          // base: center float
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'max-w-[480px] p-6 gap-4 rounded-2xl',
          // tablet
          'max-tablet:max-w-[440px] max-tablet:p-6 max-tablet:gap-4 max-tablet:rounded-2xl',
          // mobile: bottom-sheet — override position/translate, anchor to bottom
          'max-mobile:bottom-0 max-mobile:left-0 max-mobile:right-0 max-mobile:top-auto',
          'max-mobile:translate-x-0 max-mobile:translate-y-0',
          'max-mobile:w-full max-mobile:max-w-full max-mobile:max-h-[80vh]',
          'max-mobile:rounded-t-2xl max-mobile:rounded-b-none',
          'max-mobile:p-5 max-mobile:pt-3 max-mobile:gap-3',
        ].join(' '),

        // lg — Center float desktop, fullscreen tablet/mobile
        lg: [
          // base: center float
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'max-w-[clamp(640px,calc(100vw-400px),100%)] max-h-[calc(100vh-120px)] p-8 gap-5 rounded-2xl',
          // tablet: fullscreen
          'max-tablet:inset-0 max-tablet:translate-x-0 max-tablet:translate-y-0',
          'max-tablet:max-w-full max-tablet:h-full max-tablet:max-h-full max-tablet:rounded-none',
          'max-tablet:p-6 max-tablet:gap-4',
          // mobile: fullscreen
          'max-mobile:p-5 max-mobile:gap-3',
        ].join(' '),

        // full — Margined panel desktop/tablet, fullscreen mobile
        full: [
          // base: center float with margins
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'max-w-[calc(100vw-200px)] max-h-[calc(100vh-120px)] h-full p-10 gap-6 rounded-2xl',
          // tablet
          'max-tablet:max-w-[calc(100vw-80px)] max-tablet:max-h-[calc(100vh-60px)]',
          'max-tablet:p-6 max-tablet:gap-5',
          // mobile: fullscreen
          'max-mobile:inset-0 max-mobile:translate-x-0 max-mobile:translate-y-0',
          'max-mobile:max-w-full max-mobile:h-full max-mobile:rounded-none',
          'max-mobile:p-5 max-mobile:gap-4',
        ].join(' '),
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// ---------------------------------------------------------------------------
// DialogV2Content
// ---------------------------------------------------------------------------

export interface DialogV2ContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogV2ContentVariants> {
  size?: DialogV2Size;
}

const DialogV2Content = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogV2ContentProps>(
  ({ className, children, size = 'md', ...props }, ref) => (
    <DialogV2SizeContext.Provider value={size}>
      <DialogV2Portal>
        <DialogV2Overlay />
        <DialogPrimitive.Content ref={ref} className={cn(dialogV2ContentVariants({ size }), className)} {...props}>
          {children}
        </DialogPrimitive.Content>
      </DialogV2Portal>
    </DialogV2SizeContext.Provider>
  ),
);
DialogV2Content.displayName = 'DialogV2Content';

// ---------------------------------------------------------------------------
// DialogV2CloseButton
// Close: sm → hidden, md → X(desktop/tablet) / drag-handle(mobile),
//        lg/full → X(desktop) / ArrowLeft(tablet+mobile)
// ---------------------------------------------------------------------------

const DialogV2CloseButton = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => {
  const size = useDialogV2Size();

  if (size === 'sm') return null;

  if (size === 'md') {
    return (
      <>
        {/* X button — desktop/tablet */}
        <DialogPrimitive.Close
          ref={ref}
          className={cn('absolute right-4 top-4 bg-transparent p-0 outline-none', 'max-mobile:hidden', className)}
          {...props}
        >
          <X className="h-6 w-6 text-white" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        {/* Drag handle bar — mobile only */}
        <div className={cn('hidden max-mobile:flex justify-center w-full pb-1 flex-shrink-0')} aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-white/30" />
        </div>
      </>
    );
  }

  // lg / full — X on desktop, ArrowLeft on tablet/mobile
  return (
    <>
      {/* X button — desktop only */}
      <DialogPrimitive.Close
        ref={ref}
        className={cn('absolute right-4 top-4 bg-transparent p-0 outline-none', 'max-tablet:hidden', className)}
        {...props}
      >
        <X className="h-6 w-6 text-white" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
      {/* ArrowLeft back button — tablet/mobile */}
      <DialogPrimitive.Close
        className={cn(
          'hidden max-tablet:flex items-center justify-center',
          'bg-transparent p-0 outline-none',
          'absolute left-4 top-4',
        )}
      >
        <ArrowLeft className="h-6 w-6 text-white" />
        <span className="sr-only">Back</span>
      </DialogPrimitive.Close>
    </>
  );
});
DialogV2CloseButton.displayName = 'DialogV2CloseButton';

// ---------------------------------------------------------------------------
// DialogV2Header
// lg/full: add padding-left on tablet/mobile for back button space
// ---------------------------------------------------------------------------

const DialogV2Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const size = useDialogV2Size();
    const needsBackButtonPadding = size === 'lg' || size === 'full';

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1 flex-shrink-0', needsBackButtonPadding && 'max-tablet:pt-10', className)}
        {...props}
      />
    );
  },
);
DialogV2Header.displayName = 'DialogV2Header';

// ---------------------------------------------------------------------------
// DialogV2Title
// ---------------------------------------------------------------------------

const dialogV2TitleVariants = cva('font-bold text-white', {
  variants: {
    size: {
      sm: 'text-glyph-18 max-mobile:text-glyph-16',
      md: 'text-glyph-22 max-tablet:text-glyph-20 max-mobile:text-glyph-18',
      lg: [
        'text-glyph-24 text-center',
        'max-tablet:text-glyph-22 max-tablet:text-left',
        'max-mobile:text-glyph-20',
      ].join(' '),
      full: [
        'text-glyph-32 text-center',
        'max-tablet:text-glyph-24 max-tablet:text-left',
        'max-mobile:text-glyph-22',
      ].join(' '),
    },
  },
  defaultVariants: { size: 'md' },
});

const DialogV2Title = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  const size = useDialogV2Size();
  return <DialogPrimitive.Title ref={ref} className={cn(dialogV2TitleVariants({ size }), className)} {...props} />;
});
DialogV2Title.displayName = 'DialogV2Title';

// ---------------------------------------------------------------------------
// DialogV2Description
// ---------------------------------------------------------------------------

const dialogV2DescriptionVariants = cva('text-white/70 whitespace-normal', {
  variants: {
    size: {
      sm: 'text-glyph-14',
      md: 'text-glyph-16 max-mobile:text-glyph-14',
      lg: 'text-glyph-16 max-mobile:text-glyph-14',
      full: 'text-glyph-18 max-tablet:text-glyph-16 max-mobile:text-glyph-14',
    },
  },
  defaultVariants: { size: 'md' },
});

const DialogV2Description = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  const size = useDialogV2Size();
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(dialogV2DescriptionVariants({ size }), className)}
      {...props}
    />
  );
});
DialogV2Description.displayName = 'DialogV2Description';

// ---------------------------------------------------------------------------
// DialogV2Footer
// md/lg/full: mobile (and tablet for lg/full) → full-width columns (flex-col-reverse)
// ---------------------------------------------------------------------------

const DialogV2Footer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const size = useDialogV2Size();

    const mobileFullWidth =
      size === 'md'
        ? 'max-mobile:flex-col-reverse max-mobile:[&>*]:w-full'
        : size === 'lg' || size === 'full'
          ? 'max-tablet:flex-col-reverse max-tablet:[&>*]:w-full'
          : '';

    return <div ref={ref} className={cn('flex flex-row gap-2 flex-shrink-0', mobileFullWidth, className)} {...props} />;
  },
);
DialogV2Footer.displayName = 'DialogV2Footer';

// ---------------------------------------------------------------------------
// DialogV2Body — scrollable content area
// ---------------------------------------------------------------------------

function DialogV2Body({
  className,
  children,
  scroll = true,
}: {
  className?: string;
  children?: React.ReactNode;
  scroll?: boolean;
}) {
  if (!scroll) {
    return <div className={cn('flex-1 h-0 min-h-0 overflow-hidden', className)}>{children}</div>;
  }
  return <ScrollArea className={cn('flex-1 h-0 min-h-0', className)}>{children}</ScrollArea>;
}
DialogV2Body.displayName = 'DialogV2Body';

// ---------------------------------------------------------------------------
// Compound component
// ---------------------------------------------------------------------------

const DialogV2 = Object.assign(DialogV2Root, {
  Root: DialogV2Root,
  Trigger: DialogV2Trigger,
  Portal: DialogV2Portal,
  Overlay: DialogV2Overlay,
  Close: DialogV2Close,
  Content: DialogV2Content,
  CloseButton: DialogV2CloseButton,
  Header: DialogV2Header,
  Footer: DialogV2Footer,
  Title: DialogV2Title,
  Description: DialogV2Description,
  Body: DialogV2Body,
});

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  DialogV2,
  DialogV2Root,
  DialogV2Trigger,
  DialogV2Portal,
  DialogV2Overlay,
  DialogV2Close,
  DialogV2Content,
  DialogV2CloseButton,
  DialogV2Header,
  DialogV2Footer,
  DialogV2Title,
  DialogV2Description,
  DialogV2Body,
  DialogV2SizeContext,
  dialogV2TitleVariants,
  dialogV2DescriptionVariants,
};
