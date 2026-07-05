import type { ChangeEvent, ComponentProps } from 'react';
import { useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

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
    <div className="relative rounded-[8px] border border-solid border-[rgba(0,0,0,0.1)] focus-within:border focus-within:border-solid focus-within:border-[#00894d] [&:focus-within_strong]:text-[#00894d]">
      <textarea
        {...props}
        className={cn(
          props.className,
          "w-full resize-none rounded-[8px] border-none bg-transparent p-[16px_20px] font-['Product_Sans'] text-[16px] font-normal leading-[150%] tracking-[-0.3px] text-[#000000bf] outline-none placeholder:font-['Product_Sans'] placeholder:text-[16px] placeholder:font-normal placeholder:leading-[150%] placeholder:tracking-[-0.3px] placeholder:text-[rgba(0,0,0,0.5)]",
        )}
        onChange={onChange}
        maxLength={maxLength}
        style={{
          border: props.error ? '1px solid #FF6B56' : 'none',
        }}
      />
      <div
        className="absolute bottom-[8px] right-[20px] w-fit font-['Product_Sans'] text-[12px] font-normal text-[rgba(0,0,0,0.5)] [&_strong]:font-normal [&_strong]:text-[rgba(0,0,0,0.75)]"
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
