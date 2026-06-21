import * as React from 'react';

import { Dialog } from './Dialog';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 CommonDialog 와 1:1.
 */
interface CommonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'default' | 'large' | 'screen';
}

export function CommonDialog(props: CommonDialogProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <Dialog.Content size={props.size}>
        {props.title && <Dialog.Title className="flex flex-col justify-end">{props.title}</Dialog.Title>}
        {props.description && <Dialog.Description className="mt-[16px]">{props.description}</Dialog.Description>}
        {props.children}
      </Dialog.Content>
    </Dialog>
  );
}
