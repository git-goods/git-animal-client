import { css, cx } from '_panda/css';

interface RitualCircleProps {
  accelerate?: boolean;
}

export function RitualCircle({ accelerate = false }: RitualCircleProps) {
  return (
    <div className={circleContainerStyle}>
      <div className={cx(outerRingStyle, accelerate ? acceleratedOuterStyle : normalOuterStyle)} />
      <div className={cx(innerRingStyle, accelerate ? acceleratedInnerStyle : normalInnerStyle)} />
      {/* Rune points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const r = 46;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <div
            key={i}
            className={runePointStyle}
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          />
        );
      })}
      {/* Center glow */}
      <div className={centerGlowStyle} />
    </div>
  );
}

const circleContainerStyle = css({
  position: 'absolute',
  width: '340px',
  height: '340px',
  _mobile: {
    width: '220px',
    height: '220px',
  },
  pointerEvents: 'none',
});

const ringBaseStyle = css({
  position: 'absolute',
  borderRadius: '50%',
  border: '2px dashed',
  borderColor: 'rgba(147, 130, 255, 0.4)',
});

const outerRingStyle = cx(
  ringBaseStyle,
  css({
    inset: '0',
    animation: 'animateSpin',
  }),
);

const innerRingStyle = cx(
  ringBaseStyle,
  css({
    inset: '15%',
    borderStyle: 'dotted',
    borderColor: 'rgba(100, 200, 255, 0.3)',
    animation: 'animateSpin',
    animationDirection: 'reverse',
  }),
);

const normalOuterStyle = css({ animationDuration: '20s' });
const acceleratedOuterStyle = css({ animationDuration: '4s' });
const normalInnerStyle = css({ animationDuration: '15s' });
const acceleratedInnerStyle = css({ animationDuration: '3s' });

const runePointStyle = css({
  position: 'absolute',
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  bg: 'rgba(147, 130, 255, 0.6)',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0 0 8px rgba(147, 130, 255, 0.8)',
  _mobile: {
    width: '4px',
    height: '4px',
  },
});

const centerGlowStyle = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  bg: 'rgba(147, 130, 255, 0.3)',
  boxShadow: '0 0 30px rgba(147, 130, 255, 0.5), 0 0 60px rgba(100, 200, 255, 0.2)',
});
