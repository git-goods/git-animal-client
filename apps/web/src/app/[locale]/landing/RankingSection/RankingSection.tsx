import { css } from '_panda/css';

import GameConsole from './GameConsole';

export default function RankingSection() {
  return (
    <div className={containerStyle}>
      <GameConsole />
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
