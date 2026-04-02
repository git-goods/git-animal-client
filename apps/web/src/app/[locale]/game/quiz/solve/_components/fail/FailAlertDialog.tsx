import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, DialogV2 } from '@gitanimals/ui-tailwind';

interface FailAlertDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

const FailAlertDialog = ({ onClose, isOpen }: FailAlertDialogProps) => {
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
          <DialogV2.Title>{t('fail-dialog.title')}</DialogV2.Title>
          <DialogV2.Description className="text-center break-keep">
            {t('fail-dialog.description')}
          </DialogV2.Description>
        </DialogV2.Header>
        <div className="w-40 h-40 flex justify-center items-center my-1">
          <Image
            src="/assets/game/quiz/cursor-unchoiced.webp"
            alt="quiz-failed"
            width={100}
            height={100}
            draggable={false}
          />
        </div>
        <DialogV2.Footer className="w-full">
          <Button className="w-full" onClick={handleClose} variant="secondary" size="m">
            {t('fail-dialog.close-button')}
          </Button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  );
};

export default FailAlertDialog;
