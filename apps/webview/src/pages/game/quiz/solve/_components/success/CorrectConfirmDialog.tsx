import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { customT } from '../../../_utils/quiz.intl';

interface CorrectConfirmDialogProps {
  correctPoint: number;
  onConfirm: () => void;
  onStop: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const CorrectConfirmDialog = ({ correctPoint, onConfirm, onStop, onClose, isOpen }: CorrectConfirmDialogProps) => {
  const { t } = useTranslation('quiz');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);

    onClose();
  };

  const handleStop = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onStop();
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className={cn('flex w-full flex-col items-center gap-3')} isShowClose={false}>
        <div className="flex w-full flex-col items-center gap-3">
          <Dialog.Title className={cn('!text-center font-product text-glyph-24 font-bold')}>{t('correct-dialog.title')}</Dialog.Title>
          <Dialog.Description className={cn('break-keep text-center font-product text-glyph-16 font-normal text-white/75')}>
            {t('correct-dialog.description')}
          </Dialog.Description>
        </div>
        <img
          className="my-1"
          src="/assets/game/quiz/quiz-coin.svg"
          alt="quiz-coin"
          width={160}
          height={160}
          draggable={false}
        />
        <div className="flex w-full flex-col gap-2">
          <Button className={cn('w-full')} onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            {t('correct-dialog.challenge-button')}
          </Button>
          <Button className={cn('w-full')} onClick={handleStop} variant="secondary" size="m">
            {customT(t('correct-dialog.stop-button'), { point: correctPoint })}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default CorrectConfirmDialog;
