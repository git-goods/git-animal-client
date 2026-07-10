import type { ChangeEvent, ComponentProps } from 'react';
import { useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

import { customScrollStyle } from '@/styles/scrollStyle';

interface QuizTextAreaProps extends ComponentProps<'textarea'> {
  error?: boolean;
}

const textAreaStyle =
  "bg-transparent border-none text-white p-[16px_12px_2px_20px] glyph14-regular font-['Product_Sans'] font-normal rounded-[8px] outline-none w-full h-[160px] resize-none placeholder:glyph14-regular placeholder:font-['Product_Sans'] placeholder:font-normal placeholder:text-white-50 [&.error]:border [&.error]:border-solid [&.error]:border-[#FF6B56]";

const textLenStyle =
  "relative text-white-50 glyph12-regular font-['Product_Sans'] font-normal p-[0px_12px_8px_0px] [&_strong]:font-normal [&_strong]:text-white-50 [&.error]:text-[#FF6B56]";

const containerStyle =
  'relative border border-solid border-white-25 rounded-[8px] transition-all duration-[0.1s] ease-in-out overflow-hidden focus-within:border-white-50 [&:focus-within_strong]:text-[#00894d]';

function QuizTextArea({ maxLength = 1000, ...props }: QuizTextAreaProps) {
  const [inputLen, setInputLen] = useState(String(props.value ?? '')?.length || 0);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputLen(e.target.value.length);
    props?.onChange?.(e);
  };

  return (
    <div className={containerStyle}>
      <textarea
        {...props}
        className={cn(props.className, textAreaStyle, customScrollStyle, props.error && 'error')}
        onChange={onChange}
        maxLength={maxLength}
      />
      <div className="flex justify-end items-center">
        <div className={cn(textLenStyle, props.error && 'error')}>
          <strong>{inputLen}</strong>
          <span>/{maxLength}</span>
        </div>
      </div>
    </div>
  );
}

export default QuizTextArea;
