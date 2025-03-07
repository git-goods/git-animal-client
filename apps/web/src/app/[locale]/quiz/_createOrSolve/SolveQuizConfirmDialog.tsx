import { useState } from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';

interface SolveQuizConfirmDialogProps {
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const SolveQuizConfirmDialog = ({ onConfirm, onClose, isOpen }: SolveQuizConfirmDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>Solve today quiz?</Dialog.Title>
        <Flex alignItems="center" gap="8px" width="100%">
          <Button className={buttonStyle} onClick={onClose} variant="secondary" size="m">
            Cancel
          </Button>
          <Button className={buttonStyle} onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            Yes
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
};

export default SolveQuizConfirmDialog;

const buttonStyle = css({
  width: '100%',
});
