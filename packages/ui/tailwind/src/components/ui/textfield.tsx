'use client';

import * as React from 'react';

import { cn } from '../../utils/cn';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  containerClassName?: string;
}

/**
 * PandaCSS `@gitanimals/ui-panda` 의 TextField 와 1:1 (panda 원본 스펙 기준).
 * - glyph 는 완전체 유틸(glyph16-regular)을 사용 — dev 변환본의 text-glyph-16 방식은 폐기
 * - 색은 토큰 키(white-25/white-50/brand-coral) 사용 — opacity 모디파이어 임의 사용 금지
 * - 배경/포커스는 panda 원본에 없으므로 미지정(input 투명화는 panda 전역 reset 이 담당)
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, containerClassName, error, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        <input
          type="text"
          ref={ref}
          className={cn(
            'h-[55px] w-full items-start gap-[8px] px-[20px] py-[14px]',
            // border-solid 필수: 앱 전역 `button{border:transparent}`는 input 엔 무관하나, Tailwind `border`(width만)는
            // border-style 을 전역 reset 에 의존하므로 panda(`border:1px solid`)와 1:1 을 위해 명시한다.
            'rounded-[8px] border border-solid border-white-25',
            'glyph16-regular text-white placeholder:text-white-50',
            className,
          )}
          {...props}
        />
        {error && <p className="glyph14-regular mt-[6px] text-brand-coral">{error}</p>}
      </div>
    );
  },
);
TextField.displayName = 'TextField';

export { TextField };
