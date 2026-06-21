import type { ComponentProps } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

interface InputProps extends ComponentProps<'input'> {}

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-[8px] border border-solid border-[rgba(0,0,0,0.1)] bg-transparent py-[14px] pb-[13px] pl-[20px] pr-[14px] font-['Product_Sans'] text-[16px] font-normal leading-[150%] tracking-[-0.3px] text-[rgba(0,0,0,0.75)] outline-none focus:border focus:border-solid focus:border-[#00894d] placeholder:font-['Product_Sans'] placeholder:text-[16px] placeholder:font-normal placeholder:leading-[150%] placeholder:tracking-[-0.3px] placeholder:text-[rgba(0,0,0,0.5)]",
        props.className,
      )}
    />
  );
}

export default Input;
