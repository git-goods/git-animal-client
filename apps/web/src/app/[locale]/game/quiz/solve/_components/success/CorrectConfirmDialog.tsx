import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, Dialog } from '@gitanimals/ui-tailwind';

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="flex flex-col items-center gap-3 w-full" isShowClose={false}>
        <div className="flex flex-col items-center gap-3 w-full">
          <Dialog.Title className="!font-product !text-glyph-24 !font-bold !text-center">
            {t('correct-dialog.title')}
          </Dialog.Title>
          <Dialog.Description className="font-product text-glyph-16 font-normal text-center text-white-75 break-keep">
            {t('correct-dialog.description')}
          </Dialog.Description>
        </div>
        <Image
          className="my-1"
          src="/assets/game/quiz/quiz-coin.svg"
          alt="quiz-coin"
          width={160}
          height={160}
          draggable={false}
        />
        <div className="flex flex-col gap-2 w-full">
          <Button className="w-full" onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            {t('correct-dialog.challenge-button')}
          </Button>
          <Button className="w-full" onClick={handleStop} variant="secondary" size="m">
            {customT(t('correct-dialog.stop-button'), { point: correctPoint })}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default CorrectConfirmDialog;
