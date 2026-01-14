import React from 'react';
import { Button, Dialog } from '@gitanimals/ui-tailwind';

export function AlertDialog(props: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <Dialog.Content>
        <Dialog.Title className="font-product text-glyph-20 text-left">{props.title}</Dialog.Title>
        <Dialog.Description className="font-product text-glyph-16 text-left text-white-white/75 w-full">
          {props.description}
        </Dialog.Description>
        <div className="flex gap-2 justify-end w-full">
          <Button onClick={props.onClose} variant="primary" size="m">
            Close
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
