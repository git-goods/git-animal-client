import { css } from '_panda/css';

import IsometricGame from './(landing)/isometric-game';

export default function WebviewPage() {
  return (
    <div
      className={css({
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <IsometricGame />
    </div>
  );
}
