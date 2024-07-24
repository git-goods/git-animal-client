import { styled } from '_panda/jsx';
import { button, icon } from '_panda/recipes';
import { HTMLStyledProps } from '_panda/types';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cx, css } from '_panda/css';
import { Loader2 } from 'lucide-react';

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; children?: React.ReactNode; isLoading?: boolean }
>(({ asChild = false, isLoading = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  if (isLoading) {
    return (
      <Comp ref={ref} {...props} disabled>
        <Loader2 className={cx(icon(), css({ animation: 'spin' }))} />
        Loading...
      </Comp>
    );
  }
  return <Comp ref={ref} {...props} />;
});
BaseButton.displayName = 'Button';

export const Button = styled(BaseButton, button);
export type ButtonProps = HTMLStyledProps<typeof Button>;
