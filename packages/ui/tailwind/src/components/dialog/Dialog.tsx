'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '../../utils/cn';

import { DialogAlert } from './Alert';
import { DialogConfirm } from './Confirm';

/**
 * ADR: docs/superpowers/specs/2026-07-08-dialog-core-redesign-design.md
 * size(Content) 하나가 recipe 전체(폭·패딩·타이포·정렬·버튼 크기 힌트)를 결정한다.
 * Title/Description/Footer 는 DialogSizeContext 로 size 를 consume 하여 자동 스타일링.
 */

type DialogSize = 'sm' | 'md' | 'lg' | 'screen' | 'hero';

const DialogSizeContext = React.createContext<DialogSize>('md');
const useDialogSize = () => React.useContext(DialogSizeContext);

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
    'fixed left-1/2 top-1/2 z-[3001] flex flex-col -translate-x-1/2 -translate-y-1/2',
    'bg-gray-150 text-white-100 shadow-lg',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  ),
  {
    variants: {
      size: {
        // sm/md/lg: 뷰포트 대비 최소 상하좌우 20px 여백 보장 (min()으로 max-w 이중 상한, max-h 균일)
        sm: 'w-full max-w-[min(400px,calc(100vw-40px))] max-h-[calc(100vh-40px)] p-5 gap-3 rounded-2xl border border-solid border-gray-150',
        md: 'w-full max-w-[min(560px,calc(100vw-40px))] max-h-[calc(100vh-40px)] p-6 gap-4 rounded-2xl border border-solid border-gray-150',
        lg: 'w-full max-w-[min(960px,calc(100vw-40px))] max-h-[calc(100vh-40px)] p-8 gap-6 rounded-2xl border border-solid border-gray-150 mobile:p-5',
        // screen/hero: 의도적 풀뷰포트 (여백 없음)
        screen: 'w-screen h-screen max-w-[100vw] max-h-[100vh] p-6 gap-6 rounded-none mobile:p-5',
        hero: 'w-screen h-screen max-w-[100vw] max-h-[100vh] p-8 gap-8 rounded-none mobile:p-6',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type DialogContentVariants = VariantProps<typeof dialogContentCva>;

const dialogScrollableStyle = 'overflow-hidden [&_.dialog-title]:shrink-0';

type DialogContentProps = {
  isShowClose?: boolean;
  scrollable?: boolean;
} & DialogContentVariants &
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

const Content = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ children, isShowClose = true, scrollable, size, className, ...props }, ref) => {
    const resolvedSize = size ?? 'md';
    return (
      <DialogSizeContext.Provider value={resolvedSize}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            ref={ref}
            className={cn(dialogContentCva({ size: resolvedSize }), scrollable && dialogScrollableStyle, className)}
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
      </DialogSizeContext.Provider>
    );
  },
);
Content.displayName = DialogPrimitive.Content.displayName;

/**
 * hero size 의 히어로 타이포. dialogTitleStyle export 는 하위호환용으로 값 유지.
 */
export const dialogTitleStyle =
  'glyph48-bold text-white-100 text-center [@media(max-width:1200px)]:glyph32-bold mobile:glyph24-bold';

const titleRecipe: Record<DialogSize, string> = {
  sm: 'w-full glyph16-bold text-left text-white-100',
  md: 'w-full glyph20-regular text-left text-white-100',
  lg: 'w-full glyph24-bold text-left text-white-100',
  screen: 'w-full glyph24-bold text-left text-white-100 mobile:glyph20-bold',
  hero: `w-full ${dialogTitleStyle}`,
};

const Title = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ children, className, ...props }, ref) => {
  const size = useDialogSize();
  return (
    <DialogPrimitive.Title ref={ref} className={cn('dialog-title', titleRecipe[size], className)} {...props}>
      {children}
    </DialogPrimitive.Title>
  );
});
Title.displayName = DialogPrimitive.Title.displayName;

const descriptionRecipe: Record<DialogSize, string> = {
  sm: 'w-full glyph14-regular text-left text-white-75',
  md: 'w-full glyph16-regular text-left text-white-75',
  lg: 'w-full glyph16-regular text-left text-white-75',
  screen: 'w-full glyph16-regular text-left text-white-75',
  hero: 'w-full glyph20-regular text-center text-white-75 mobile:glyph16-regular',
};

const Description = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  const size = useDialogSize();
  return <DialogPrimitive.Description ref={ref} className={cn(descriptionRecipe[size], className)} {...props} />;
});
Description.displayName = DialogPrimitive.Description.displayName;

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-[6px] text-center', className)} {...props} />
);
Header.displayName = 'DialogHeader';

const footerRecipe: Record<DialogSize, string> = {
  sm: 'flex justify-end gap-2 mt-2',
  md: 'flex justify-end gap-2 mt-2',
  lg: 'flex justify-end gap-3 mt-4',
  screen: 'flex justify-end gap-3 mt-4',
  hero: 'flex justify-center gap-4 mt-6',
};

const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const size = useDialogSize();
  return <div className={cn(footerRecipe[size], className)} {...props} />;
};
Footer.displayName = 'DialogFooter';

const TopSlot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('w-full shrink-0', className)} {...props} />,
);
TopSlot.displayName = 'DialogTopSlot';

/**
 * 오버플로 스크롤 슬롯. flex-1 로 남는 높이를 채우고 native overflow-y 로 스크롤.
 * Radix ScrollArea 는 flex-1 안에서 percentage height cascade 가 불안정해 사용 안 함.
 * 스크롤바는 커스텀 tailwind arbitrary 로 얇고 어둡게 스타일.
 */
const dialogBodyScrollStyle = cn(
  'min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden',
  '[scrollbar-width:thin] [scrollbar-color:#4b5563_transparent]',
  '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent',
  '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600',
  '[&::-webkit-scrollbar-thumb:hover]:bg-gray-500',
);

const Body = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn(dialogBodyScrollStyle, className)} {...props} />,
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
  Alert: DialogAlert,
  Confirm: DialogConfirm,
});

// 내부 노출: Alert/Confirm sugar가 size 에서 Button size 매핑 시 참조.
export const buttonSizeForDialogSize: Record<DialogSize, 's' | 'm' | 'l'> = {
  sm: 's',
  md: 'm',
  lg: 'm',
  screen: 'm',
  hero: 'l',
};

export type { DialogSize };
