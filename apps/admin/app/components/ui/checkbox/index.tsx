'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cx } from '_panda/css';
import { styled } from '_panda/jsx';
import { checkbox, icon } from '_panda/recipes';
import { Check } from 'lucide-react';

const BaseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const styles = checkbox();

  return (
    <CheckboxPrimitive.Root ref={ref} className={cx('peer', styles.root, className)} {...props}>
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <Check className={icon()} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
BaseCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export const Checkbox = styled(BaseCheckbox);
