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
        padding: '300px 24px 100px',
        position: 'relative',
      })}
    >
      <div className={css({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' })}>
        <img src="/webview/landing/landing-bg.webp" alt="landing-bg" style={{ width: '100%', height: '100%' }} />
      </div>
      <IsometricGame />
    </div>
  );
}
