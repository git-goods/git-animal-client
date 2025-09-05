import { useState } from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';
import { useTranslation } from 'react-i18next';

import { customT } from '../../../_utils/quiz.intl';

interface CompleteAlertDialogProps {
  completePoint: number;
  onClose: () => void;
  isOpen: boolean;
}

const CompleteAlertDialog = ({ completePoint, onClose, isOpen }: CompleteAlertDialogProps) => {
  const { t, i18n } = useTranslation('quiz');
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
          <Dialog.Title className={titleStyle}>{t('complete-dialog.title')}</Dialog.Title>
          <Dialog.Description className={descriptionStyle}>
            {customT(t('complete-dialog.description'), { point: completePoint })}
          </Dialog.Description>
        </Flex>
        <div className={imageContainerStyle}>
          <img
            src="/assets/game/quiz/quiz-double-coin.webp"
            alt="quiz-complete"
            width={204}
            height={184}
            draggable={false}
          />
        </div>
        <Flex width="100%">
          <Button className={buttonStyle} onClick={handleClose} variant="secondary" size="m">
            {t('complete-dialog.close-button')}
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

const imageContainerStyle = css({
  width: '160px',
  height: '160px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBlock: '4px',
});
