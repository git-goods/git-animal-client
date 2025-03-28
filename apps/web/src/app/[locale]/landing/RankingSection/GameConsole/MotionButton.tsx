import { motion } from 'framer-motion';

interface MotionButtonProps {
  isPressed: boolean;
  handleButtonClick: () => void;
  startX: number;
  colors: [string, string];
}

export function MotionButton({ isPressed, handleButtonClick, startX, colors }: MotionButtonProps) {
  return (
    <>
      <motion.g
        animate={{ y: isPressed ? 5 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        onClick={handleButtonClick}
        style={{ cursor: 'pointer' }}
      >
        <rect x={startX} y="1288" width="140" height="40" fill={colors[0]} />
        <rect x={startX} y="1328" width="140" height="20" fill={colors[1]} />
        <rect x={startX + 120} y="1288" width="20" height="20" fill="#7FE18F" />
        <rect x={startX} y="1288" width="20" height="20" fill="#7FE18F" />
      </motion.g>
      <rect x={startX - 21} y="1348" width="182" height="40" fill="#1C2923" />
    </>
  );
}
