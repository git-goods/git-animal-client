import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, DialogV2 } from '@gitanimals/ui-tailwind';

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
    <DialogV2 open={isOpen} onOpenChange={onClose}>
      <DialogV2.Content
        size="sm"
        className="items-center"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogV2.Header className="items-center">
          <DialogV2.Title>{t('complete-dialog.title')}</DialogV2.Title>
          <DialogV2.Description className="text-center break-keep">
            {customT(t('complete-dialog.description'), { point: completePoint })}
          </DialogV2.Description>
        </DialogV2.Header>
        <div className="w-40 h-40 flex justify-center items-center my-1">
          <Image
            src="/assets/game/quiz/quiz-double-coin.webp"
            alt="quiz-complete"
            width={204}
            height={184}
            draggable={false}
          />
        </div>
        <DialogV2.Footer className="w-full">
          <Button className="w-full" onClick={handleClose} variant="secondary" size="m">
            {t('complete-dialog.close-button')}
          </Button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  );
};

export default CompleteAlertDialog;
