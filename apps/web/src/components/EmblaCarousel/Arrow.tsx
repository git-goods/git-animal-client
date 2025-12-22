import Image from 'next/image';
import { css, cx } from '_panda/css';

export function ArrowButton({
  onClick,
  direction,
  disabled,
}: {
  onClick: () => void;
  direction: 'prev' | 'next';
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        direction === 'prev' ? prevArrowStyle : nextArrowStyle,
        css({
          rotate: direction === 'prev' ? '180deg' : '0deg',
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: disabled ? '36px' : '40px',
          height: disabled ? '36px' : '40px',
          _mobile: {
            width: disabled ? '24px' : '26px',
            height: disabled ? '24px' : '26px',
          },
        }),
      )}
    >
      {disabled ? (
        <Image src="/icon/circle-arrow-disable.svg" alt="arrow" width={36} height={36} />
      ) : (
        <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
      )}
    </button>
  );
}

const arrowStyle = css({
  position: 'absolute',
  top: '0',
  bottom: '64px',
  margin: 'auto',
  zIndex: 'floating',

  '& img': {
    width: '100%',
    height: '100%',
  },

  _mobile: {
    bottom: '72px',
  },
});

const prevArrowStyle = cx(
  arrowStyle,
  css({
    left: '-62px',
    _mobile: {
      left: '-26px',
    },
  }),
);

const nextArrowStyle = cx(
  arrowStyle,
  css({
    right: '-62px',
    _mobile: {
      right: '-26px',
    },
  }),
);
