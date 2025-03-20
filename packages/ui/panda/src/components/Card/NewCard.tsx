import { cx, css, cva } from '_panda/css';
import { flex } from '_panda/patterns';

// TODO : 아예 외부 경로로 옮겨도 괜찮을것 같다.
const ANIMAL_CARD_IMAGE_BASE_URL = '/animal-card/';

type CardTierType = 'EX' | 'S_PLUS' | 'A_PLUS' | 'B_MINUS';

interface Props {
  tier: CardTierType;
  type: string;
  dropRate: string;
  personaImage: string;
}

export function Card(props: Props) {
  const { bg, thumbnail } = CARD_INFO[props.tier];

  return (
    <div className={cx('animal-card-container', containerCva({ size: 'medium' }))}>
      <div className={bgImage}>
        <img src={ANIMAL_CARD_IMAGE_BASE_URL + bg} alt={props.tier} width={220} height={272} draggable={false} />
      </div>
      <div className={thumbnailImage}>
        <img src={ANIMAL_CARD_IMAGE_BASE_URL + thumbnail} alt={props.tier} width={233} height={233} draggable={false} />
      </div>
      <div className={thumbnailImage}>
        <img src={props.personaImage} alt={props.type} width={233} height={233} draggable={false} />
      </div>
      <div className={cx('animal-card-info', infoWrapper)}>
        <p className={cx('animal-card-type', typeText)}>{snakeToTitleCase(props.type)}</p>
        <p className={cx('animal-card-rating', ratingText)}>{props.dropRate}</p>
      </div>
    </div>
  );
}

/**
 * 스네이크 케이스 문자열을 타이틀 케이스로 변환합니다.
 * @param str - 변환할 스네이크 케이스 문자열
 * @returns 타이틀 케이스로 변환된 문자열
 * @example
 * snakeToTitleCase('SUMI_MA') => 'Sumi Ma'
 */
export const snakeToTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CARD_INFO: Record<CardTierType, { bg: string; thumbnail: string }> = {
  EX: {
    bg: 'card-bg-EX.webp',
    thumbnail: 'card-thumbnail-EX.webp',
  },
  S_PLUS: {
    bg: 'card-bg-S_PLUS.webp',
    thumbnail: 'card-thumbnail-S_PLUS.webp',
  },
  A_PLUS: {
    bg: 'card-bg-A_PLUS.webp',
    thumbnail: 'card-thumbnail-A_PLUS.webp',
  },
  B_MINUS: {
    bg: 'card-bg-B_MINUS.webp',
    thumbnail: 'card-thumbnail-B_MINUS.webp',
  },
};

const containerCva = cva({
  base: {
    position: 'relative',
    aspectRatio: '220/272',
  },
  variants: {
    size: {
      small: {
        width: '110px',
      },
      medium: {
        width: '220px',
      },
    },
  },
});

const container = css({
  position: 'relative',
  height: '272px',
  width: '220px',
  color: 'black',
  aspectRatio: '220/272',

  // '& img': {
  //   width: '100%',
  // },
});

const bgImage = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
});

const thumbnailImage = css({
  position: 'absolute',
  top: '16px',
  left: '16px',
  right: '16px',

  zIndex: 1,

  // _mobile: {
  //   top: '6.5px',
  //   left: '6.5px',
  //   right: '6.5px',
  // },
});

const infoWrapper = flex({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  right: '20px',
  justifyContent: 'space-between',
  gap: '8px',

  // _mobile: {
  //   bottom: '8px',
  //   left: '8px',
  //   right: '8px',
  //   gap: '4px',
  // },
});

const typeText = css({
  textStyle: 'glyph24.bold',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  lineHeight: '40px',

  // _mobile: {
  //   fontSize: '10px',
  //   lineHeight: '12px',
  // },
});

const ratingText = css({
  textStyle: 'glyph22.regular',
  lineHeight: '40px',

  // _mobile: {
  //   fontSize: '9px',
  //   lineHeight: '12px',
  // },
});
