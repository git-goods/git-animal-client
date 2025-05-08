'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '_panda/jsx';
import { css, cx } from '_panda/css';
import { dialog, icon } from '_panda/recipes';
import { Button } from '../Button';
import { MediaQuery } from '../common/MediaQuery';
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
    <DialogPrimitive.Content
      ref={ref}
      {...props}
      className={cx(
        css({
          p: 6,
          bg: 'gray.gray_150',
          spaceY: 7,
          rounded: '24px',
          width: '400px',
          _mobile: { spaceY: 5, maxWidth: 'calc(100vw - 48px)', width: '300px' },
        }),
        props.className,
      )}
    >
      {children}
      <DialogClose
        className={css({ bg: 'transparent', border: 'none', cursor: 'pointer', mt: 1, _mobile: { mt: '9px' } })}
      >
        <X width={24} height={24} className={css({ color: 'white.white_75' })} />
        <span className={css({ srOnly: true })}>Close</span>
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
));
Content.displayName = DialogPrimitive.Content.displayName;

const Title = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    {...props}
    className={cx(
      css({
        textStyle: 'glyph24.regular',
        textAlign: 'left',
        _mobile: {
          textStyle: 'glyph20.regular',
        },
      }),
      props.className,
    )}
  >
    {children}
  </DialogPrimitive.Title>
));
Title.displayName = DialogPrimitive.Title.displayName;

const Description = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    {...props}
    className={cx(css({ textStyle: 'glyph16.regular', textAlign: 'left' }), props.className)}
  >
    {children}
  </DialogPrimitive.Description>
));
Description.displayName = DialogPrimitive.Description.displayName;

const Footer = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cx(css({ display: 'flex', justifyContent: 'center', gap: 3, flexDirection: 'row' }), props.className)}
    >
      {children}
    </div>
  ),
);
Footer.displayName = 'Footer';

export const SmallDialog = withProvider(styled(DialogPrimitive.Root), 'root');
export const SmallDialogTrigger = withContext(styled(DialogPrimitive.Trigger), 'trigger');
export const SmallDialogContent = withContext(Content, 'content');
export const SmallDialogHeader = withContext(styled('div'), 'header');
export const SmallDialogFooter = withContext(Footer, 'footer');
export const SmallDialogTitle = withContext(Title, 'title');
export const SmallDialogDescription = withContext(Description, 'description');

interface BasicSmallDialogProps extends DialogPrimitive.DialogProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  leftButtonText: string;
  rightButtonText: string;
  leftButtonAction?: () => void;
  rightButtonAction?: () => void;

  triggerElement?: React.ReactNode;
}

/**
 * 기본적인 작은 대화상자 컴포넌트의 속성을 정의하는 인터페이스
 * @interface BasicSmallDialogProps
 * @property {string} title - 대화상자의 제목
 * @property {string} [description] - 대화상자의 설명 (선택사항)
 * @property {React.ReactNode} [children] - 대화상자의 본문 내용 (선택사항)
 * @property {string} leftButtonText - 왼쪽 버튼에 표시될 텍스트
 * @property {string} rightButtonText - 오른쪽 버튼에 표시될 텍스트
 * @property {() => void} [leftButtonAction] - 왼쪽 버튼 클릭 시 실행될 함수 (선택사항)
 * @property {() => void} [rightButtonAction] - 오른쪽 버튼 클릭 시 실행될 함수 (선택사항)
 * @property {React.ReactNode} [triggerElement] - 대화상자를 열 수 있는 트리거 요소 (선택사항)
 */
export const BasicSmallDialog = (props: BasicSmallDialogProps) => {
  return (
    <SmallDialog {...props}>
      {props.triggerElement && <SmallDialogTrigger asChild>{props.triggerElement}</SmallDialogTrigger>}
      <SmallDialogContent>
        <SmallDialogHeader>
          <SmallDialogTitle>{props.title}</SmallDialogTitle>
          {props.description && <SmallDialogDescription>{props.description}</SmallDialogDescription>}
        </SmallDialogHeader>
        {props.children && <div className="py-4">{props.children}</div>}
        <SmallDialogFooter>
          <MediaQuery
            mobile={
              <Button variant="secondary" onClick={props.leftButtonAction} size="s" className={css({ flex: 1 })}>
                {props.leftButtonText}
              </Button>
            }
            desktop={
              <Button variant="secondary" onClick={props.leftButtonAction} size="m">
                {props.leftButtonText}
              </Button>
            }
          />
          <MediaQuery
            mobile={
              <Button onClick={props.rightButtonAction} size="s" className={css({ flex: 1 })}>
                {props.rightButtonText}
              </Button>
            }
            desktop={
              <Button onClick={props.rightButtonAction} size="m">
                {props.rightButtonText}
              </Button>
            }
          />
        </SmallDialogFooter>
      </SmallDialogContent>
    </SmallDialog>
  );
};
