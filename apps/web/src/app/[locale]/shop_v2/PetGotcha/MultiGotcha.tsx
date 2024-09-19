import React from 'react';
import { css, cx } from '_panda/css';
import { Card } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

interface Props {
  onClose: () => void;
}

function MultiGotcha({ onClose }: Props) {
  return (
    <div className={modalContainerStyle}>
      <h2 className={headingStyle}>Choose one card you want!</h2>
      <MultiCardList cards={Array(10).fill(false)} />
    </div>
  );
}

export default MultiGotcha;

const modalContainerStyle = css({
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

function MultiCardList({ cards }: { cards: any[] }) {
  return (
    <div className={cardContainerStyle}>
      {cards.map((card, index) => (
        <div className={cx(cardStyle)} key={index}>
          <Card tier="S_PLUS" type="MOLE" dropRate="100%" personaImage={getPersonaImage('MOLE')} />
        </div>
      ))}
    </div>
  );
}

const cardContainerStyle = css({
  display: 'flex',
  gap: '1rem',
});

const cardStyle = css({
  width: '220px',
  height: '272px',
  perspective: '1000px',
  cursor: 'pointer',
});
