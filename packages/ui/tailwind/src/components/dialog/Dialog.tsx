'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Dialog(compound) 와 1:1.
 * - visible 스타일은 GitAnimals override(dialogContentCva / Dialog.styles) 기준. recipe 구조(고정 중앙/슬롯)는 유지.
 * - 애니메이션은 표준 shadcn(tailwindcss-animate) fade(ADR-015). panda content 는 전역 `animation:fadeIn!important`
 *   로 사실상 fade 만 — zoom 없이 fade 로 재현.
 * - overlay: black-75 / z-3000(override), content: z-3001(cva). close: 우상단 transparent + X(24, white).
 * - border 는 border-solid 명시(ADR-014).
 */
const DialogRoot = DialogPrimitive.Root;
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
      'fixed inset-0 z-[3000] bg-black-75 backdrop-blur-[4px]',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentCva = cva(
  cn(
    'fixed left-1/2 top-1/2 z-[3001] grid w-full max-w-[32rem] -translate-x-1/2 -translate-y-1/2 gap-[16px]',
    'rounded-[16px] border border-solid border-gray-150 bg-gray-150 p-[24px] text-white-100 shadow-lg',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ),
  {
    variants: {
      size: {
        default:
          'flex flex-col items-center justify-center gap-[28px] text-white [&_.dialog-title]:w-full [&_.dialog-title]:glyph20-regular [&_.dialog-title]:text-left mobile:max-w-[calc(100vw-48px)]',
        large:
          'h-full max-h-[calc(100%-240px)] max-w-[calc(100%-400px)] p-[60px_40px] [@media(min-width:769px)_and_(max-width:1200px)]:max-h-[calc(100vh-120px)] [@media(min-width:769px)_and_(max-width:1200px)]:max-w-[calc(100vw-240px)] [@media(min-width:769px)_and_(max-width:1200px)]:p-[48px_24px] mobile:h-full mobile:max-h-[100vh] mobile:max-w-[100vw] mobile:rounded-none',
        screen:
          'm-auto flex h-screen max-h-[100vh] w-screen max-w-[100vw] flex-col items-center justify-center rounded-none p-[24px] [@media(min-width:1920px)]:h-fit [@media(min-width:1920px)]:w-[1400px] [@media(min-width:1920px)]:rounded-[16px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type DialogContentVariants = VariantProps<typeof dialogContentCva>;

const dialogScrollableStyle = 'flex flex-col overflow-hidden [&_.dialog-title]:shrink-0';

type DialogContentProps = {
  isShowClose?: boolean;
  scrollable?: boolean;
} & DialogContentVariants &
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

const Content = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ children, isShowClose = true, scrollable, size, className, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogContentCva({ size: size ?? 'default' }), scrollable && dialogScrollableStyle, className)}
        {...props}
      >
        {children}
        {isShowClose && (
          <DialogClose className="absolute right-[16px] top-[16px] cursor-pointer rounded-[4px] bg-transparent p-0 opacity-70 outline-none transition-opacity hover:opacity-100">
            <X size={24} color="white" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
Content.displayName = DialogPrimitive.Content.displayName;

export const dialogTitleStyle =
  'glyph48-bold text-white-100 text-center [@media(max-width:1200px)]:glyph32-bold mobile:glyph24-bold';

const Title = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ children, className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('dialog-title', dialogTitleStyle, className)} {...props}>
    {children}
  </DialogPrimitive.Title>
));
Title.displayName = DialogPrimitive.Title.displayName;

const Description = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={className} {...props} />
));
Description.displayName = DialogPrimitive.Description.displayName;

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-[6px] text-center', className)} {...props} />
);
Header.displayName = 'DialogHeader';

const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-[8px]', className)} {...props} />
);
Footer.displayName = 'DialogFooter';

const TopSlot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('w-full shrink-0', className)} {...props} />,
);
TopSlot.displayName = 'DialogTopSlot';

const Body = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden', className)} {...props} />
  ),
);
Body.displayName = 'DialogBody';

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content,
  Header,
  Footer,
  Title,
  Description,
  TopSlot,
  Body,
});
