import { useState } from 'react';
import { Button, Dialog } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { useTranslation } from 'react-i18next';

interface FailAlertDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

const FailAlertDialog = ({ onClose, isOpen }: FailAlertDialogProps) => {
  const { t } = useTranslation('quiz');

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onClose();
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className={cn('flex w-full flex-col items-center gap-3')} isShowClose={false}>
        <div className="flex w-full flex-col items-center gap-3">
          <Dialog.Title className={cn('!text-center font-product text-glyph-24 font-bold')}>{t('fail-dialog.title')}</Dialog.Title>
          <Dialog.Description className={cn('break-keep text-center font-product text-glyph-16 font-normal text-white/75')}>
            {t('fail-dialog.description')}
          </Dialog.Description>
        </div>
        <div className="my-1 flex h-[160px] w-[160px] items-center justify-center">
          <img
            src="/assets/game/quiz/cursor-unchoiced.webp"
            alt="quiz-failed"
            width={100}
            height={100}
            draggable={false}
          />
        </div>
        <div className="w-full">
          <Button className={cn('w-full')} onClick={handleClose} variant="secondary" size="m">
            {t('fail-dialog.close-button')}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default FailAlertDialog;
