import { css, cx } from '_panda/css';

import { getPersonaImage } from '@/utils/image';

type PersonaBannerSize = 'default' | 'small';

export function PersonaBanner({
  level,
  personaType,
  size = 'default',
}: {
  level: number | string;
  personaType: string;
  size?: PersonaBannerSize;
}) {
  const isSmall = size === 'small';
  return (
    <div className={cx(itemStyle, isSmall && itemSmallStyle)}>
      <div className={mergeItemStyle}>
        <img
          src={getPersonaImage(personaType)}
          alt={personaType}
          className={cx(imageStyle, isSmall && imageSmallStyle)}
        />
      </div>
      <div className={cx(levelTextStyle, isSmall && levelTextSmallStyle)}>Level {level}</div>
    </div>
  );
}

export function PersonaBannerUnknown({ size = 'default' }: { size?: PersonaBannerSize }) {
  const isSmall = size === 'small';
  return (
    <div className={cx(itemStyle, isSmall && itemSmallStyle)}>
      <img src="/mypage/merge/merge-empty.svg" alt="empty" className={cx(imageStyle, isSmall && imageSmallStyle)} />
      <div className={cx(levelTextStyle, levelEmptyTextStyle, isSmall && levelTextSmallStyle)}>Level ?</div>
    </div>
  );
}

export function PersonaGradientBanner({ level }: { level: number | string }) {
  return (
    <div className={itemStyle}>
      <div className={mergeItemStyle}>
        <img src="/assets/mypage/evolution/evolution-empty.svg" alt="empty" className={imageStyle} />
      </div>
      <div className={cx(levelTextStyle, 'evolution-rainbow-gradient-text')}>Level {level}</div>
    </div>
  );
}

const itemStyle = css({
  position: 'relative',
  padding: '8px',
});

const itemSmallStyle = css({
  padding: '6px',
});

const imageStyle = css({
  objectFit: 'contain',
  width: '120px',
  height: '120px',
});

const imageSmallStyle = css({
  width: '72px',
  height: '72px',
});

const levelTextStyle = css({
  textAlign: 'center',
  marginTop: '12px',
  textStyle: 'glyph18.bold',
  color: 'white.white_100',
});

const levelTextSmallStyle = css({
  marginTop: '6px',
  textStyle: 'glyph14.bold',
});

const levelEmptyTextStyle = css({
  color: 'white.white_75',
});

const mergeItemStyle = css({
  borderRadius: '16px',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  background: 'rgba(255, 255, 255, 0.25)',
});
