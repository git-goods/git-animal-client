import type { ComponentProps } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

interface InputProps extends ComponentProps<'input'> {}

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'border border-black/10 bg-transparent text-black/75',
        'py-[14px] pb-[13px] pl-5 pr-[14px]',
        'font-product text-glyph-16',
        'rounded-lg outline-none w-full',
        'focus:border-[#00894d]',
        'placeholder:text-black/50 placeholder:font-product placeholder:text-glyph-16',
        props.className
      )}
    />
  );
}

export default Input;
