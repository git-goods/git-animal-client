'use client';

import * as React from 'react';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Label 과 1:1.
 * - panda 원본은 `styled('label', label)` — radix 가 아닌 평범한 `<label>`.
 *   dev 변환본이 `@radix-ui/react-label` 을 끌어쓴 것은 원본에 없던 추가라 폐기.
 * - panda `label` recipe 실측: font-size 14px / line-height none(1) / font-weight 500 / peer-disabled.
 *   font-family 는 recipe 에 없어 body(Product Sans) 를 상속 — 별도 지정하지 않는다.
 *   glyph14 유틸은 line-height 150% 라 부적합 → arbitrary `text-[14px] leading-none`.
 */
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = 'Label';

export { Label };
