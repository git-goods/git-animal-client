import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Dialog } from '@gitanimals/ui-panda';
import { Button } from '@gitanimals/ui-tailwind';

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content
        className="flex w-full flex-col items-center gap-[12px]"
        isShowClose={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex w-full flex-col items-center gap-[12px]">
          <Dialog.Title className="!glyph24-bold !text-center [font-family:'Product_Sans'] font-bold">
            {t('fail-dialog.title')}
          </Dialog.Title>
          <Dialog.Description className="glyph16-regular text-center [font-family:'Product_Sans'] font-normal text-white-75 [word-break:keep-all]">
            {t('fail-dialog.description')}
          </Dialog.Description>
        </div>
        <div className="my-[4px] flex h-[160px] w-[160px] items-center justify-center">
          <Image
            src="/assets/game/quiz/cursor-unchoiced.webp"
            alt="quiz-failed"
            width={100}
            height={100}
            draggable={false}
          />
        </div>
        <div className="flex w-full">
          <Button className="w-full" onClick={handleClose} variant="secondary" size="m">
            {t('fail-dialog.close-button')}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default FailAlertDialog;
