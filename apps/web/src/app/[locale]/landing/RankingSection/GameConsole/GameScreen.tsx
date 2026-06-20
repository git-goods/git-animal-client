import { motion } from 'framer-motion';

export function GameScreen({ isPowered, children }: { isPowered: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center bg-[#000000]"
      initial={false}
      animate={{
        opacity: isPowered ? 1 : 0,
      }}
      transition={{ duration: 0.1, delay: isPowered ? 0.1 : 0 }}
    >
      <div className="text-[#4ADE80] font-mono text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[96px] tracking-[2px]">
        {children}
      </div>
    </motion.div>
  );
}
