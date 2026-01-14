import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Dialog } from '@gitanimals/ui-tailwind';

interface SolveQuizConfirmDialogProps {
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const SolveQuizConfirmDialog = ({ onConfirm, onClose, isOpen }: SolveQuizConfirmDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('Quiz');

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
        <div className="flex items-center gap-2 w-full">
          <Button className="w-full" onClick={onClose} variant="secondary" size="m">
            {t('cancel')}
          </Button>
          <Button className="w-full" onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            {t('yes')}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default SolveQuizConfirmDialog;
