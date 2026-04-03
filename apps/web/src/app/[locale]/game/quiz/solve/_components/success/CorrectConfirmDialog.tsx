import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, DialogV2 } from '@gitanimals/ui-tailwind';

import { customT } from '../../../_utils/quiz.intl';

interface CorrectConfirmDialogProps {
  correctPoint: number;
  onConfirm: () => void;
  onStop: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const CorrectConfirmDialog = ({ correctPoint, onConfirm, onStop, onClose, isOpen }: CorrectConfirmDialogProps) => {
  const t = useTranslations('Quiz');
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
    <DialogV2 open={isOpen} onOpenChange={onClose}>
      <DialogV2.Content
        size="sm"
        className="items-center"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogV2.Header className="items-center">
          <DialogV2.Title>{t('correct-dialog.title')}</DialogV2.Title>
          <DialogV2.Description className="text-center break-keep">
            {t('correct-dialog.description')}
          </DialogV2.Description>
        </DialogV2.Header>
        <Image
          className="my-1"
          src="/assets/game/quiz/quiz-coin.svg"
          alt="quiz-coin"
          width={160}
          height={160}
          draggable={false}
        />
        <DialogV2.Footer className="flex-col w-full">
          <Button className="w-full" onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            {t('correct-dialog.challenge-button')}
          </Button>
          <Button className="w-full" onClick={handleStop} variant="secondary" size="m">
            {customT(t('correct-dialog.stop-button'), { point: correctPoint })}
          </Button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  );
};

export default CorrectConfirmDialog;
