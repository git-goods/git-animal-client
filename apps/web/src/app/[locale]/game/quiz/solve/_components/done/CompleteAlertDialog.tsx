import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, Dialog } from '@gitanimals/ui-tailwind';

import { customT } from '../../../_utils/quiz.intl';

interface CompleteAlertDialogProps {
  completePoint: number;
  onClose: () => void;
  isOpen: boolean;
}

const CompleteAlertDialog = ({ completePoint, onClose, isOpen }: CompleteAlertDialogProps) => {
  const t = useTranslations('Quiz');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onClose();
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="flex flex-col items-center gap-3 w-full" isShowClose={false}>
        <div className="flex flex-col items-center gap-3 w-full">
          <Dialog.Title className="!font-product !text-glyph-24 !font-bold !text-center">
            {t('complete-dialog.title')}
          </Dialog.Title>
          <Dialog.Description className="font-product text-glyph-16 font-normal text-center text-white-75 break-keep">
            {customT(t('complete-dialog.description'), { point: completePoint })}
          </Dialog.Description>
        </div>
        <div className="w-40 h-40 flex justify-center items-center my-1">
          <Image
            src="/assets/game/quiz/quiz-double-coin.webp"
            alt="quiz-complete"
            width={204}
            height={184}
            draggable={false}
          />
        </div>
        <div className="w-full">
          <Button className="w-full" onClick={handleClose} variant="secondary" size="m">
            {t('complete-dialog.close-button')}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default CompleteAlertDialog;
