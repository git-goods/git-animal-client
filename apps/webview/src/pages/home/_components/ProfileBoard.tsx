import { css } from '_panda/css';
import { userQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const ProfileBoard = wrap
  .Suspense({ fallback: null })
  .ErrorBoundary({ fallback: null })
  .on(function ProfileBoard() {
    const { data } = useQuery({ ...userQueries.userOptions() });
    console.log('data', data);

    if (!data) {
      return null;
    }

    return (
      <div className={containerStyle}>
        <div className={profileItemStyle}>
          <div className={profileItemContentStyle}>
            <img src={data.profileImage} alt="profile" />
            <p>{data.username}</p>
          </div>
          <div className={coinStyle}>
            <img src="/assets/shop/coin.webp" className={coinIconStyle} alt="point" />
            <p>{data.points} P</p>
          </div>
        </div>
        <ScoreBoard />
      </div>
    );
  });

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  px: 4,
  pt: 2,
});

const profileItemStyle = css({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  py: 2,
  mb: '6px',
  px: 2,
});

const profileItemContentStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textStyle: 'glyph24.bold',
  color: 'white.white_100',

  '& img': {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
});

const coinStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  textStyle: 'glyph16.regular',
  color: 'white.white_90',
});

const coinIconStyle = css({
  width: '16px',
  height: '16px',
});

export function ScoreBoard() {
  return (
    <div className={scoreBoardStyle}>
      <div className={scoreItemStyle}>
        <div className="label">Farm Visitor</div>
        <div className="value">100</div>
      </div>
      <div className={scoreItemStyle}>
        <div className="label">Contribution</div>
        <div className="value">100</div>
      </div>
      <div className={scoreItemStyle}>
        <div className="label">Next pet</div>
        <div className="value">100</div>
      </div>
    </div>
  );
}

const scoreBoardStyle = css({
  background:
    'linear-gradient(132.51deg, rgba(253, 251, 209, 0.4) 2.19%, rgba(0, 157, 129, 0.4) 49.24%, rgba(61, 139, 255, 0.4) 98.21%)',
  backdropFilter: 'blur(20px)',
  borderRadius: '10px',
  padding: '12px 16px',
  gap: '8px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
});

const scoreItemStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '& .label': {
    textStyle: 'glyph13.regular',
    color: 'white.white_50',
  },
  '& .value': {
    textStyle: 'glyph18.regular',
    color: 'white.white_100',
  },
});
