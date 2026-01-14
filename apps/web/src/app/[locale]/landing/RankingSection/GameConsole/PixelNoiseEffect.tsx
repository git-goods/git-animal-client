import { motion } from 'framer-motion';

export function PixelNoiseEffect({ isPowered }: { isPowered: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={false}
      animate={{
        opacity: isPowered ? [1, 0] : [0, 1, 0],
      }}
      transition={{
        duration: 0.2,
        times: isPowered ? [0, 1] : [0, 0.5, 1],
      }}
    >
      <div className="w-full h-full grid grid-cols-12 grid-rows-[repeat(12,1fr)]">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#4ADE80]"
            style={{
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
