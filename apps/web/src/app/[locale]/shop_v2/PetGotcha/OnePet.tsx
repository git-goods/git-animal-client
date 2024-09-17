import React from 'react';
import { css } from '_panda/css';

import CardFlipGame from './CardFlipGame';

interface Props {
  onClose: () => void;
}

function OnePet({ onClose }: Props) {
  const onAction = () => {
    console.log('onAction');
  };

  return (
    <div className={containerStyle}>
      <h2 className={headingStyle}>Choose one card you want!</h2>
      <CardFlipGame onClose={onClose} onAction={onAction} />
    </div>
  );
}

export default OnePet;

const containerStyle = css({
  position: 'fixed',

  backgroundColor: 'gray.gray_150',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  padding: '224px 200px',
});

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',
  marginBottom: '60px',
});
