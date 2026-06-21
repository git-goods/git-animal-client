import { Dialog } from '@gitanimals/ui-panda';
import { Button } from '@gitanimals/ui-tailwind';

export function ConfirmDialog(props: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <Dialog.Content>
        <Dialog.Title className="glyph20-regular text-left">{props.title}</Dialog.Title>
        <Dialog.Description className="glyph16-regular text-left text-white-75 w-full">
          {props.description}
        </Dialog.Description>
        <div className="flex gap-[8px] justify-end w-full">
          <Button onClick={props.onClose} variant="secondary" size="m">
            Close
          </Button>
          <Button onClick={props.onConfirm} variant="primary" size="m">
            Ok
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
