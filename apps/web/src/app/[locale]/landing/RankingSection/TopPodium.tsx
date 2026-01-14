import type { RankType } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { AnimatePresence, motion } from 'framer-motion';

import { RankingLink } from './RankingLink';

export function TopPodium({ ranks }: { ranks: RankType[] }) {
  const RANK = [
    {
      rank: 2,
      height: 148,
      crownElement: (
        <div
          className={cn(
            'absolute top-[-29px] left-1/2 -translate-x-1/2 w-9 h-9 [&>img]:w-full [&>img]:h-full',
            'max-mobile:w-7 max-mobile:h-7 max-mobile:top-[-28px]',
          )}
        >
          <img src="/rank/icon_crown_2.svg" alt="2nd place crown" width={36} height={36} />
        </div>
      ),
    },
    {
      rank: 1,
      height: 200,
      crownElement: (
        <div
          className={cn(
            'absolute top-[-46px] left-1/2 -translate-x-1/2 w-[60px] h-[60px] [&>img]:w-full [&>img]:h-full',
            'max-mobile:w-10 max-mobile:h-10 max-mobile:top-[-40px]',
          )}
        >
          <img src="/rank/icon_crown_1.svg" alt="1st place crown" width={60} height={60} />
        </div>
      ),
    },
    {
      rank: 3,
      height: 120,
      crownElement: (
        <div
          className={cn(
            'absolute top-[-29px] left-1/2 -translate-x-1/2 w-9 h-9 [&>img]:w-full [&>img]:h-full',
            'max-mobile:w-7 max-mobile:h-7 max-mobile:top-[-28px]',
          )}
        >
          <img src="/rank/icon_crown_3.svg" alt="3rd place crown" width={36} height={36} />
        </div>
      ),
    },
  ];

  if (ranks.length < 3) return null;

  return (
    <AnimatePresence>
      <div className={cn('flex justify-center items-end gap-3 flex-1', 'max-mobile:min-h-[300px]')}>
        {RANK.map((item) => {
          const currentRank = ranks[item.rank - 1];
          return (
            <RankingLink
              id={currentRank.name}
              className={cn('flex flex-col items-center text-xl min-h-[170px]', 'max-mobile:min-h-20')}
              key={`${item.rank}`}
            >
              <div
                className={cn(
                  'relative w-[100px] h-[100px]',
                  '[&>img]:w-full [&>img]:h-full [&>img]:rounded-full [&>img]:object-cover [&>img]:relative [&>img]:z-aboveDefault',
                  'max-mobile:w-10 max-mobile:h-10',
                )}
              >
                <img src={currentRank.image} alt={`${item.rank}등`} />
                {item.crownElement}
                <div
                  className={cn(
                    'w-[130px] h-[130px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-base opacity-50',
                    'bg-[radial-gradient(50%_50%_at_50%_50%,#FFED86_0%,rgba(255,237,134,0.17)_81%,rgba(255,237,134,0.00)_100%)]',
                    'max-mobile:w-[60px] max-mobile:h-[60px]',
                  )}
                />
              </div>
              <div
                className={cn(
                  'font-product text-glyph-18 font-bold mt-3 text-white-90 max-w-full overflow-visible flex justify-center whitespace-nowrap',
                  'max-mobile:text-glyph-15 max-mobile:font-bold max-mobile:max-w-20 max-mobile:mt-1.5',
                )}
              >
                {currentRank.name}
              </div>
              <div className={cn('font-product text-glyph-14 text-white-50', 'max-mobile:text-glyph-12')}>
                {currentRank.contributions}
              </div>
              <motion.div
                key={`rostrum-${item.rank}`}
                initial={{ height: 0 }}
                animate={{ height: `${item.height}px`, flex: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: (item.rank || 1) * 0.3,
                }}
                className={cn(
                  'w-[140px] rounded-lg text-white-100 text-center',
                  'bg-[linear-gradient(180deg,#B9FFBD_0%,rgba(195,255,199,0.85)_24.5%,rgba(203,255,206,0.74)_43%,rgba(255,255,255,0.00)_100%)]',
                  '[font-feature-settings:liga_off,clig_off] [text-shadow:0px_0px_40px_rgba(0,201,50,0.70)]',
                  'text-[60px] font-normal leading-[140%] tracking-[-5.961px] font-dnf',
                  'pt-4 mt-3 relative overflow-hidden',
                  'max-mobile:w-20 max-mobile:text-4xl max-mobile:pt-3 max-mobile:mt-2 max-mobile:pr-1',
                )}
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    delay: (item.rank || 1) * 0.3 + 0.5, // rostrum 애니메이션 후 0.5초 뒤에 시작
                  }}
                >
                  {item.rank}
                </motion.p>
              </motion.div>
            </RankingLink>
          );
        })}
      </div>
    </AnimatePresence>
  );
}
