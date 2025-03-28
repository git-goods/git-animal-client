import { css, cx } from '_panda/css';
import type { RankType } from '@gitanimals/api';

export function TopPodium({ ranks }: { ranks: RankType[] }) {
  if (ranks.length < 3) return null;

  return (
    <div className={podiumStyle}>
      {/* 2등 */}
      <div className={runnerUpStyle}>
        <div className={profileStyle}>
          <img src={ranks[1].image} alt="2등" />
          <div className={subCrownStyle}>
            <img src="/rank/icon_crown_2.svg" alt="2nd place crown" width={36} height={36} />
          </div>
          <div className={brightBgStyle} />
        </div>
        <div className={nameStyle}>{ranks[1].name}</div>
        <div className={contributionStyle}>{ranks[1].contributions}</div>
        <div className={cx(rostrumStyle, css({ height: '148px' }))}>2</div>
      </div>

      {/* 1등 */}
      <div className={winnerStyle}>
        <div className={profileStyle}>
          <img src={ranks[0].image} alt="1등" />
          <div className={winnerCrownStyle}>
            <img src="/rank/icon_crown_1.svg" alt="1st place crown" width={60} height={60} />
          </div>
          <div className={brightBgStyle} />
        </div>
        <div className={nameStyle}>{ranks[0].name}</div>
        <div className={contributionStyle}>{ranks[0].contributions}</div>
        <div className={cx(rostrumStyle, css({ height: '200px' }))}>1</div>
      </div>

      {/* 3등 */}
      <div className={thirdPlaceStyle}>
        <div className={profileStyle}>
          <img src={ranks[2].image} alt="3등" />
          <div className={subCrownStyle}>
            <img src="/rank/icon_crown_3.svg" alt="3rd place crown" width={36} height={36} />
          </div>
          <div className={brightBgStyle} />
        </div>
        <div className={nameStyle}>{ranks[2].name}</div>
        <div className={contributionStyle}>{ranks[2].contributions}</div>
        <div className={cx(rostrumStyle, css({ height: '120px' }))}>3</div>
      </div>
    </div>
  );
}

const podiumStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: '12px',
  marginBottom: '60px',
});

const rostrumStyle = css({
  width: '140px',
  height: '140px',
  borderRadius: '8px',
  background:
    'linear-gradient(180deg, #B9FFBD 0%, rgba(195, 255, 199, 0.85) 24.5%, rgba(203, 255, 206, 0.74) 43%, rgba(255, 255, 255, 0.00) 100%)',
  color: 'white.white_100',
  textAlign: 'center',
  fontFeatureSettings: 'liga off, clig off',
  textShadow: '0px 0px 40px rgba(0, 201, 50, 0.70)',
  fontSize: '60px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '140%',
  letterSpacing: '-5.961px',
  fontFamily: 'DNF Bit Bit v2',
  pt: '16px',
  mt: '12px',
});

const runnerUpStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  fontSize: '20px',
});

const brightBgStyle = css({
  width: '120px',
  height: '120px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: -1,
  opacity: 0.5,
  background:
    'radial-gradient(50% 50% at 50% 50%, #FFED86 0%, rgba(255, 237, 134, 0.17) 81%, rgba(255, 237, 134, 0.00) 100%)',
});

const winnerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
});

const thirdPlaceStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const profileStyle = css({
  position: 'relative',
  width: '100px',
  height: '100px',
  '& > img': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
});

const subCrownStyle = css({
  position: 'absolute',
  top: '-29px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '36px',
  height: '36px',
});

const winnerCrownStyle = css({
  position: 'absolute',
  top: '-46px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60px',
  height: '60px',
});

const nameStyle = css({
  textStyle: 'glyph18.bold',
  color: 'white.white_90',
});

const contributionStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_50',
});
