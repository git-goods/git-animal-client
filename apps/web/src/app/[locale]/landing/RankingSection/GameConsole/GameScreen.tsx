import { motion } from 'framer-motion';

export function GameScreen({ isPowered, children }: { isPowered: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center bg-black"
      initial={false}
      animate={{
        opacity: isPowered ? 1 : 0,
      }}
      transition={{ duration: 0.1, delay: isPowered ? 0.1 : 0 }}
    >
      <div className="text-[#4ADE80] font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[2px]">
        {children}
      </div>
    </motion.div>
  );
}
