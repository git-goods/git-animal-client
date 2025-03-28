import { css } from '_panda/css';

import GameConsole from './GameConsole';

export default function RankingSection() {
  return (
    <div className={containerStyle}>
      <GameConsole>
        <div className={screenContentStyle}>안녕하세요!</div>
      </GameConsole>
    </div>
  );
}

const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  backgroundColor: '#111827',
  padding: '130px',
  overflow: 'hidden',
});

const screenContentStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#4ADE80',
  fontFamily: 'monospace',
  fontSize: '36px',
  '@media (min-width: 640px)': {
    fontSize: '48px',
  },
});
