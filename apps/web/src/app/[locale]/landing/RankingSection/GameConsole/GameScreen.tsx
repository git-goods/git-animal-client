import { css } from '_panda/css';
import { motion } from 'framer-motion';

export function GameScreen({ isPowered, children }: { isPowered: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={screenContentStyle}
      initial={false}
      animate={{
        opacity: isPowered ? 1 : 0,
      }}
      transition={{ duration: 0.1, delay: isPowered ? 0.1 : 0 }}
    >
      <div className={screenTextStyle}>{children}</div>
    </motion.div>
  );
}

const screenContentStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000000',
});

const screenTextStyle = css({
  color: '#4ADE80',
  fontFamily: 'monospace',
  fontSize: '36px',
  '@media (min-width: 640px)': {
    fontSize: '48px',
  },
  '@media (min-width: 768px)': {
    fontSize: '60px',
  },
  '@media (min-width: 1024px)': {
    fontSize: '72px',
  },
  '@media (min-width: 1280px)': {
    fontSize: '96px',
  },
  letterSpacing: '2px',
});
