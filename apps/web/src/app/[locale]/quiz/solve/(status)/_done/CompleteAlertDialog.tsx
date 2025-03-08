import { useState } from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';
import Image from 'next/image';

interface CompleteAlertDialogProps {
  completePoint: number;
  onClose: () => void;
  isOpen: boolean;
}

const CompleteAlertDialog = ({ completePoint, onClose, isOpen }: CompleteAlertDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onClose();
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className={contentStyle} isShowClose={false}>
        <Flex flexDirection="column" alignItems="center" gap="12px" width="100%">
          <h2 className={titleStyle}>Champion of the quiz!</h2>
          <p className={descriptionStyle}>Finished the final quiz and got {completePoint}P.</p>
        </Flex>
        <div className={imageContainerStyle}>
          <Image src="/quiz/quiz-double-coin.webp" alt="quiz-complete" width={204} height={184} draggable={false} />
        </div>
        <Flex width="100%">
          <Button className={buttonStyle} onClick={handleClose} variant="secondary" size="m">
            Close
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
};

export default CompleteAlertDialog;

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
  textStyle: 'glyph24.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  textAlign: 'center',
});

const descriptionStyle = css({
  textStyle: 'glyph16.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  textAlign: 'center',
  wordBreak: 'keep-all',
});

const imageContainerStyle = css({
  width: '160px',
  height: '160px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBlock: '4px',
});
