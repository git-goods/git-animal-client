import { css, cx } from '_panda/css';

import { getPersonaImage } from '@/utils/image';

export function PersonaBanner({ level, personaType }: { level: number | string; personaType: string }) {
  return (
    <div className={itemStyle}>
      <div className={mergeItemStyle}>
        <img src={getPersonaImage(personaType)} alt={personaType} className={imageStyle} />
      </div>
      <div className={levelTextStyle}>Level {level}</div>
    </div>
  );
}

export function PersonaBannerUnknown() {
  return (
    <div className={itemStyle}>
      <img src="/mypage/merge/merge-empty.svg" alt="empty" className={imageStyle} />
      <div className={cx(levelTextStyle, levelEmptyTextStyle)}>Level ?</div>
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

const imageStyle = css({
  objectFit: 'contain',
  width: '120px',
  height: '120px',
});

const levelTextStyle = css({
  textAlign: 'center',
  marginTop: '12px',
  textStyle: 'glyph18.bold',
  color: 'white.white_100',
});

const levelEmptyTextStyle = css({
  color: 'white.white_75',
});

const mergeItemStyle = css({
  borderRadius: '16px',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  background: 'rgba(255, 255, 255, 0.25)',
});
