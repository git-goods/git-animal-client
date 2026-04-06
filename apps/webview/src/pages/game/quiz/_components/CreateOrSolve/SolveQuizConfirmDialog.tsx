import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';

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
        <Dialog.Title className="text-left font-product text-glyph-20 font-medium">{t('solve-todays-quiz')}</Dialog.Title>
        <div className="flex w-full items-center gap-2">
          <Button className={cn('w-full')} onClick={onClose} variant="secondary" size="m">
            {t('cancel')}
          </Button>
          <Button className={cn('w-full')} onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            {t('yes')}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default SolveQuizConfirmDialog;
