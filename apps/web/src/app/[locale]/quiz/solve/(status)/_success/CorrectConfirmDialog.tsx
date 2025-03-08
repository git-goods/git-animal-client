import { useState } from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';
import Image from 'next/image';
interface CorrectConfirmDialogProps {
  currentPoint: number;
  onConfirm: () => void;
  onStop: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const CorrectConfirmDialog = ({ currentPoint, onConfirm, onStop, onClose, isOpen }: CorrectConfirmDialogProps) => {
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
      <Dialog.Content className={contentStyle} isShowClose={false}>
        <Flex flexDirection="column" alignItems="center" gap="12px" width="100%">
          <Dialog.Title className={titleStyle}>Correct!</Dialog.Title>
          <Dialog.Description className={descriptionStyle}>
            Challenge the next quiz and get double points.
          </Dialog.Description>
        </Flex>
        <Image
          className={imageStyle}
          src="/quiz/quiz-coin.svg"
          alt="quiz-coin"
          width={160}
          height={160}
          draggable={false}
        />
        <Flex flexDirection="column" gap="8px" width="100%">
          <Button className={buttonStyle} onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            Challenge the next Quiz
          </Button>
          <Button className={buttonStyle} onClick={handleStop} variant="secondary" size="m">
            Stop Quiz & Get {currentPoint}P
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
};

export default CorrectConfirmDialog;

const buttonStyle = css({
  width: '100%',
});

const contentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
});

const titleStyle = css({
  textStyle: 'glyph24.bold !important',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  textAlign: 'center !important',
});

const descriptionStyle = css({
  textStyle: 'glyph16.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  textAlign: 'center',
  color: 'white.white_75',
  wordBreak: 'keep-all',
});

const imageStyle = css({
  marginBlock: '4px',
});
