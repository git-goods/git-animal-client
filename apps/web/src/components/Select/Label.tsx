import type { ReactNode } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { useSelectOpenContext, useSelectValueContext } from './Root';

interface SelectLabelProps {
  placeholder?: string;
  children?: React.ReactNode | (({ value }: { value: string }) => ReactNode);
}

function SelectLabel(props: SelectLabelProps) {
  const { value: selectedValue } = useSelectValueContext();
  const { isOpen, setIsOpen } = useSelectOpenContext();

  return (
    <button
      className="flex py-3.5 pr-3.5 pl-5 items-center gap-2 rounded-lg border border-black/10 bg-transparent w-full text-black/75 font-['Product_Sans'] text-base font-normal leading-[150%] -tracking-[0.3px] [&_.arrow-icon]:absolute [&_.arrow-icon]:right-3.5 [&_.arrow-icon]:top-0 [&_.arrow-icon]:bottom-0 [&_.arrow-icon]:m-auto [&_.arrow-icon]:transition-transform [&_.arrow-icon]:duration-200 [&_.arrow-icon]:rotate-0"
      style={isOpen ? { border: '1px solid #00894d' } : {}}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {!selectedValue && <div className="text-black/50">{props.placeholder}</div>}
      {selectedValue &&
        (typeof props.children === 'function' ? props.children({ value: selectedValue }) : props.children)}
      <ArrowIcon />
    </button>
  );
}

export default SelectLabel;

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arrow-icon"
    >
      <path
        d="M6.3664 7.93589L9.77807 4.09589C10.0538 3.78553 9.83002 3.2998 9.41128 3.2998H2.58794C2.1692 3.2998 1.94541 3.78553 2.22115 4.09589L5.63282 7.93589C5.827 8.15444 6.17222 8.15444 6.3664 7.93589Z"
        fill="black"
      />
    </svg>
  );
}
