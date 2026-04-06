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
    <div className="group relative overflow-hidden rounded-lg border border-white/25 transition-all duration-100 ease-in-out focus-within:border-white/50">
      <textarea
        {...props}
        className={cn(
          props.className,
          'h-40 w-full resize-none rounded-lg border-none bg-transparent py-4 pl-5 pr-3 pt-4 font-product text-glyph-14 font-normal text-white outline-none',
          'placeholder:font-product placeholder:text-glyph-14 placeholder:font-normal placeholder:text-white/50',
          customScrollStyle,
          props.error && 'border border-[#FF6B56]',
        )}
        onChange={onChange}
        maxLength={maxLength}
      />
      <div className="flex items-center justify-end">
        <div
          className={cn(
            'relative pb-2 pr-3 pt-0 font-product text-glyph-12 font-normal text-white/50',
            'group-focus-within:[&_strong]:text-[#00894d]',
            props.error && 'text-[#FF6B56] [&_strong]:text-[#FF6B56]',
          )}
        >
          <strong className="font-normal">{inputLen}</strong>
          <span>/{maxLength}</span>
        </div>
      </div>
    </div>
  );
}

export default QuizTextArea;
