import { css } from '_panda/css';

export const SpinningLoader = () => {
  return (
    <div className={spinningLoaderContainerStyle}>
      <div className={spinningLoaderStyle} />
    </div>
  );
};

const spinningLoaderContainerStyle = css({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  zIndex: 'floating',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
});

const spinningLoaderStyle = css({
  width: '64px',
  height: '64px',
  border: '4px solid transparent',
  borderTop: '4px solid #fff',
  borderRadius: '50%',
  animation: 'animateSpin 1s linear infinite',
});
