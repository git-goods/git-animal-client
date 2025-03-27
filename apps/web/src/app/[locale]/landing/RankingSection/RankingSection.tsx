import { css } from '_panda/css';

import InteractiveArcade from './InteractiveArcade';

export function RankingSection() {
  return (
    <div className={containerStyle}>
      <h2 className={titleStyle}>Ranking</h2>
      <p className={descriptionStyle}>You can get up to 10000P depending on your ranking!</p>
      <InteractiveArcade />
    </div>
  );
}

const containerStyle = css({
  width: '100%',
  height: '100%',
  position: 'relative',
  backgroundColor: 'gray.gray_100',
  padding: '0 130px 0',
});

const titleStyle = css({
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'gray.gray_900',
  position: 'absolute',
  top: '120px',
  left: 0,
  right: 0,
  textAlign: 'center',
});

const descriptionStyle = css({
  fontSize: '16px',
  color: 'gray.gray_700',
  position: 'absolute',
  top: '234px',
  left: '10px',
  right: '10px',
  textAlign: 'center',
});
