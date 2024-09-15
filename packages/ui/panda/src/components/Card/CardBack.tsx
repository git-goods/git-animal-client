import { css } from '_panda/css';
const ANIMAL_CARD_IMAGE_BASE_URL = '/animal-card/';

interface Props {
  tier: 'EX' | 'S_PLUS' | 'A_PLUS' | 'B_MINUS';
}

export function CardBack(props: Props) {
  const { bg } = getTierToCardBackInfo(props.tier);

  return (
    <div className={bgStyle}>
      <img src={ANIMAL_CARD_IMAGE_BASE_URL + bg} alt={props.tier} width={265} height={328} />
    </div>
  );
}

const bgStyle = css({
  width: '100%',
});

const getTierToCardBackInfo = (tier: Props['tier']): { bg: string } => {
  switch (tier) {
    case 'EX':
      return {
        bg: 'card-back-EX.webp',
      };
    case 'S_PLUS':
      return {
        bg: 'card-back-S_PLUS.webp',
      };
    case 'A_PLUS':
      return {
        bg: 'card-back-A_PLUS.webp',
      };
    case 'B_MINUS':
      return {
        bg: 'card-back-B_MINUS.webp',
      };
  }
};
