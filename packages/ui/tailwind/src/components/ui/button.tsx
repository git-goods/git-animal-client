'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Button(`cva.ts`)과 1:1.
 *
 * dev 변환본은 padding/size 값이 panda 와 전부 달랐고(예: m = px-3 vs panda 0 30px),
 * min-w 임의 추가·active/disabled hover 누락·text-glyph-N(폐기 방식)을 써서 폐기했다.
 * size 별 fontSize(14/16/20)는 모두 line-height 150% 라 glyphN-regular 완전체 유틸과 일치한다.
 */
const buttonVariants = cva(
  // border-solid 필수: 앱 전역 `button{border:transparent}`(border-style:none, 특이도 0,0,1)가 저특이도
  // reset `*{border-style:solid}`(0,0,0)을 이겨 Tailwind `border`(width만)로는 테두리가 사라진다.
  // `border-solid`(0,1,0)로 border-style 을 명시해야 panda(`border:1px solid` shorthand)와 1:1.
  'rounded-[6px] border border-solid border-black text-black transition-[filter,box-shadow] duration-200 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-canary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#c4c382_inset,0px_3px_0px_0px_#fdfed2_inset] hover:bg-[#EAE78A] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#C4C382_inset,0px_3px_0px_0px_#fdfed2_inset] active:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#C4C382_inset,0px_3px_0px_0px_#fdfed2_inset] disabled:bg-gray-800 disabled:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#a3a3a3_inset,0px_3px_0px_0px_#dbdbdb_inset] disabled:hover:bg-gray-800 disabled:hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#a3a3a3_inset,0px_3px_0px_0px_#dbdbdb_inset]',
        secondary:
          'bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#A1A1B1_inset,0px_3px_0px_0px_#D2DCFE_inset] hover:bg-gray-900 hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#A1A1B1_inset,0px_3px_0px_0px_#D2DCFE_inset] disabled:bg-gray-800 disabled:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#A3A3A3_inset,0px_3px_0px_0px_#DBDBDB_inset] disabled:hover:bg-gray-800 disabled:hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_-3px_0px_0px_#A3A3A3_inset,0px_3px_0px_0px_#DBDBDB_inset]',
      },
      size: {
        s: 'glyph14-regular min-h-[32px] px-[24px] py-0',
        m: 'glyph16-regular h-[40px] min-h-[40px] px-[30px] py-0',
        l: 'glyph20-regular min-h-[76px] px-[76px] py-[25px]',
      },
      floating: {
        true: 'fixed bottom-[16px] left-1/2 w-full max-w-[calc(100%-32px)] -translate-x-1/2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'm',
      floating: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, floating, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, floating }), className)} ref={ref} {...props} />
  ),
);
Button.displayName = 'Button';

export interface AnchorButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const AnchorButton = React.forwardRef<HTMLAnchorElement, AnchorButtonProps>(
  ({ className, variant, size, floating, ...props }, ref) => (
    <a className={cn(buttonVariants({ variant, size, floating }), className)} ref={ref} {...props} />
  ),
);
AnchorButton.displayName = 'AnchorButton';

export { Button, AnchorButton, buttonVariants };
