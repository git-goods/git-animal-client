import type { ChangeEvent, ComponentProps } from 'react';
import { useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { customScrollStyle } from '@/styles/scrollStyle';

interface QuizTextAreaProps extends ComponentProps<'textarea'> {
  error?: boolean;
}

function QuizTextArea({ maxLength = 1000, ...props }: QuizTextAreaProps) {
  const [inputLen, setInputLen] = useState(String(props.value ?? '')?.length || 0);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputLen(e.target.value.length);
    props?.onChange?.(e);
  };

  return (
    <div
      className={cn(
        'relative border border-white-25 rounded-lg transition-all duration-100 ease-in-out overflow-hidden',
        'focus-within:border-white-50 [&:focus-within_strong]:text-[#00894d]',
      )}
    >
      <textarea
        {...props}
        className={cn(
          'bg-transparent border-none text-white p-[16px_12px_2px_20px] font-product text-glyph-14 font-normal rounded-lg outline-none w-full h-40 resize-none',
          'placeholder:font-product placeholder:text-glyph-14 placeholder:font-normal placeholder:text-white-50',
          props.error && 'border border-[#FF6B56]',
          props.className,
          customScrollStyle,
        )}
        onChange={onChange}
        maxLength={maxLength}
      />
      <div className="flex justify-end items-center">
        <div className={cn('relative text-white-50 font-product text-glyph-12 font-normal p-[0px_12px_8px_0px]', props.error && 'text-[#FF6B56]')}>
          <strong className="font-normal text-white-50">{inputLen}</strong>
          <span>/{maxLength}</span>
        </div>
      </div>
    </div>
  );
}

export default QuizTextArea;
