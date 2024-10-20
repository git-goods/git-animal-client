import { cx, css } from '_panda/css';
import { flex } from '_panda/patterns';

// TODO : 아예 외부 경로로 옮겨도 괜찮을것 같다.

type CardTierType = 'EX' | 'S_PLUS' | 'A_PLUS' | 'B_MINUS';

interface Props {
  tier: CardTierType;
  type: string;
  personaImage: string;
  bgUrl: string;
  thumbnailUrl: string;
  rightTextEl: React.ReactNode;
}

export function NoRatingCard(props: Props) {
  return (
    <div className={cx('animal-card-container', container)}>
      <div className={bgImage}>
        <img src={props.bgUrl} alt={props.tier} width={265} height={328} draggable={false} />
      </div>
      <div className={thumbnailImage}>
        <img src={props.thumbnailUrl} alt={props.tier} width={233} height={233} draggable={false} />
      </div>
      <div className={thumbnailImage}>
        <img src={props.personaImage} alt={props.type} width={233} height={233} draggable={false} />
      </div>
      <div className={cx('animal-card-info', infoWrapper)}>
        <p className={cx('animal-card-type', typeText)}>{snakeToTitleCase(props.type)}</p>
        <p className={cx('animal-card-rating', ratingText)}>{props.rightTextEl}</p>
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

export const container = css({
  position: 'relative',
  width: '265px',
  height: '328px',
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
