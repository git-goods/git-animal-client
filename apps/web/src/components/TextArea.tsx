import type { ChangeEvent, ComponentProps } from 'react';
import { useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

interface TextAreaProps extends ComponentProps<'textarea'> {
  error?: boolean;
}

function TextArea({ maxLength = 300, ...props }: TextAreaProps) {
  const [inputLen, setInputLen] = useState(String(props.value ?? '')?.length || 0);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputLen(e.target.value.length);
    props?.onChange?.(e);
  };

  return (
    <div
      className={cn(
        'relative border border-black/10 rounded-lg',
        'focus-within:border-[#00894d] [&:focus-within_strong]:text-[#00894d]'
      )}
    >
      <textarea
        {...props}
        className={cn(
          'bg-transparent border-none text-black/75',
          'p-4 px-5 font-product text-glyph-16',
          'rounded-lg outline-none w-full resize-none',
          'placeholder:text-black/50 placeholder:font-product placeholder:text-glyph-16',
          props.className
        )}
        onChange={onChange}
        maxLength={maxLength}
        style={{
          border: props.error ? '1px solid #FF6B56' : 'none',
        }}
      />
      <div
        className="absolute bottom-2 right-5 font-product text-glyph-12 w-fit [&_strong]:font-normal [&_strong]:text-black/75"
        style={{
          color: props.error ? '#FF6B56' : 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <strong>{inputLen}</strong>
        <span> / {maxLength}</span>
      </div>
    </div>
  );
}

export default TextArea;
