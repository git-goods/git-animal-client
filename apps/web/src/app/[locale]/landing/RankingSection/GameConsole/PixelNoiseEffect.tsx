import { css } from '_panda/css';
import { motion } from 'framer-motion';

export function PixelNoiseEffect({ isPowered }: { isPowered: boolean }) {
  return (
    <motion.div
      className={noiseContainerStyle}
      initial={false}
      animate={{
        opacity: isPowered ? [1, 0] : [0, 1, 0],
      }}
      transition={{
        duration: 0.2,
        times: isPowered ? [0, 1] : [0, 0.5, 1],
      }}
    >
      <div className={noiseGridStyle}>
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className={noiseCellStyle}
            style={{
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

const noiseContainerStyle = css({
  position: 'absolute',
  inset: 0,
  zIndex: 10,
});

const noiseGridStyle = css({
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'repeat(12, 1fr)',
});

const noiseCellStyle = css({
  backgroundColor: '#4ADE80',
});
