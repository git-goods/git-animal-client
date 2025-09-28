import { css } from '_panda/css';
import { Dialog } from './Dialog';

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
        {props.title && <Dialog.Title className={headingStyle}>{props.title}</Dialog.Title>}
        {props.description && <Dialog.Description className={descriptionStyle}>{props.description}</Dialog.Description>}
        {props.children}
      </Dialog.Content>
    </Dialog>
  );
}

const headingStyle = css({ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' });
const descriptionStyle = css({ marginTop: '16px' });
