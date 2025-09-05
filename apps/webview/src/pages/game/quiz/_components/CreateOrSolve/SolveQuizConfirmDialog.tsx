import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('quiz');

  const handleConfirm = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content isShowClose={false}>
        <Dialog.Title>{t('solve-todays-quiz')}</Dialog.Title>
        <Flex alignItems="center" gap="8px" width="100%">
          <Button className={buttonStyle} onClick={onClose} variant="secondary" size="m">
            {t('cancel')}
          </Button>
          <Button className={buttonStyle} onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            {t('yes')}
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
