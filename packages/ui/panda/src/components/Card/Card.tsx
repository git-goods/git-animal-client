import { cx, css } from '_panda/css';
import { flex } from '_panda/patterns';

const ANIMAL_CARD_IMAGE_BASE_URL = '/animal-card/';

interface Props {
  tier: 'EX' | 'S_PLUS' | 'A_PLUS' | 'B_MINUS';
  type: string;
  dropRate: string;
  personaImage: string;
}

function Card(props: Props) {
  const { bg, thumbnail } = getTierToCardInfo(props.tier);

  return (
    <div className={cx('animal-card-container', container)}>
      <div className={bgImage}>
        <img src={ANIMAL_CARD_IMAGE_BASE_URL + bg} alt={props.tier} width={265} height={328} />
      </div>
      <div className={thumbnailImage}>
        <img src={ANIMAL_CARD_IMAGE_BASE_URL + thumbnail} alt={props.tier} width={233} height={233} />
      </div>
      <picture className={thumbnailImage}>
        <img src={props.personaImage} alt={props.type} width={233} height={233} />
      </picture>
      <div className={cx('animal-card-info', infoWrapper)}>
        <p className={cx('animal-card-type', typeText)}>{getAnimalTypeLabel(props.type)}</p>
        <p className={cx('animal-card-rating', ratingText)}>{props.dropRate}</p>
      </div>
    </div>
  );
}

const getAnimalTypeLabel = (type: string) => {
  const words = type.split('_');
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

const getTierToCardInfo = (tier: string) => {
  switch (tier) {
    case 'EX':
      return {
        bg: 'card-bg-EX.webp',
        thumbnail: 'card-thumbnail-EX.webp',
      };
    case 'S_PLUS':
      return {
        bg: 'card-bg-S_PLUS.webp',
        thumbnail: 'card-thumbnail-S_PLUS.webp',
      };
    case 'A_PLUS':
      return {
        bg: 'card-bg-A_PLUS.webp',
        thumbnail: 'card-thumbnail-A_PLUS.webp',
      };
    default:
      return {
        bg: 'card-bg-B_MINUS.webp',
        thumbnail: 'card-thumbnail-B_MINUS.webp',
      };
  }
};
export default Card;

export const container = css({
  position: 'relative',
  height: '100%',
});

export const bgImage = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
});

export const thumbnailImage = css({
  position: 'absolute',
  top: '16px',
  left: '16px',
  right: '16px',

  zIndex: 1,
});

export const infoWrapper = flex({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  right: '20px',
  justifyContent: 'space-between',
  gap: '8px',
});

export const typeText = css({
  textStyle: 'glyph24.bold',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  lineHeight: '40px',
});

export const ratingText = css({
  textStyle: 'glyph22.regular',
  lineHeight: '40px',
});
