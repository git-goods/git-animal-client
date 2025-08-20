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
          width: disabled ? '24px' : '26px',
          height: disabled ? '24px' : '26px',
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
  margin: 'auto',
  zIndex: 'floating',

  '& img': {
    width: '100%',
    height: '100%',
  },

  bottom: '72px',
});

const prevArrowStyle = cx(
  arrowStyle,
  css({
    left: '-26px',
  }),
);

const nextArrowStyle = cx(
  arrowStyle,
  css({
    right: '-26px',
  }),
);
