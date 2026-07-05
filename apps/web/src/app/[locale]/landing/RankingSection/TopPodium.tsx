import type { RankType } from '@gitanimals/api';
import { AnimatePresence, motion } from 'framer-motion';

import { RankingLink } from './RankingLink';

const podiumStyle = 'flex justify-center items-end gap-[12px] flex-1 mobile:min-h-[300px]';

const rostrumStyle =
  'w-[140px] rounded-[8px] bg-[linear-gradient(180deg,#B9FFBD_0%,rgba(195,255,199,0.85)_24.5%,rgba(203,255,206,0.74)_43%,rgba(255,255,255,0.00)_100%)] text-white-100 text-center [font-feature-settings:liga_off,clig_off] [text-shadow:0px_0px_40px_rgba(0,201,50,0.70)] text-[60px] not-italic font-normal leading-[140%] tracking-[-5.961px] font-dnf pt-[16px] mt-[12px] relative overflow-hidden mobile:w-[80px] mobile:text-[36px] mobile:pt-[12px] mobile:mt-[8px] mobile:pr-[4px]';

const runnerUpStyle = 'flex flex-col items-center text-[20px] min-h-[170px] mobile:min-h-[80px]';

const brightBgStyle =
  'w-[130px] h-[130px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-base opacity-50 bg-[radial-gradient(50%_50%_at_50%_50%,#FFED86_0%,rgba(255,237,134,0.17)_81%,rgba(255,237,134,0.00)_100%)] mobile:w-[60px] mobile:h-[60px]';

const profileStyle =
  'relative w-[100px] h-[100px] [&>img]:w-full [&>img]:h-full [&>img]:rounded-full [&>img]:object-cover [&>img]:relative [&>img]:z-aboveDefault mobile:w-[40px] mobile:h-[40px]';

const subCrownStyle =
  'absolute top-[-29px] left-1/2 -translate-x-1/2 w-[36px] h-[36px] [&>img]:w-full [&>img]:h-full mobile:w-[28px] mobile:h-[28px] mobile:top-[-28px]';

const winnerCrownStyle =
  'absolute top-[-46px] left-1/2 -translate-x-1/2 w-[60px] h-[60px] [&>img]:w-full [&>img]:h-full mobile:w-[40px] mobile:h-[40px] mobile:top-[-40px]';

const nameStyle =
  'glyph18-bold mt-[12px] text-white-90 max-w-full overflow-visible flex justify-center whitespace-nowrap mobile:glyph15-bold mobile:max-w-[80px] mobile:mt-[6px]';

const contributionStyle = 'glyph14-regular text-white-50 mobile:glyph12-regular';

export function TopPodium({ ranks }: { ranks: RankType[] }) {
  const RANK = [
    {
      rank: 2,
      height: 148,
      crownElement: (
        <div className={subCrownStyle}>
          <img src="/rank/icon_crown_2.svg" alt="2nd place crown" width={36} height={36} />
        </div>
      ),
    },
    {
      rank: 1,
      height: 200,
      crownElement: (
        <div className={winnerCrownStyle}>
          <img src="/rank/icon_crown_1.svg" alt="1st place crown" width={60} height={60} />
        </div>
      ),
    },
    {
      rank: 3,
      height: 120,
      crownElement: (
        <div className={subCrownStyle}>
          <img src="/rank/icon_crown_3.svg" alt="3rd place crown" width={36} height={36} />
        </div>
      ),
    },
  ];

  if (ranks.length < 3) return null;

  return (
    <AnimatePresence>
      <div className={podiumStyle}>
        {RANK.map((item) => {
          const currentRank = ranks[item.rank - 1];
          return (
            <RankingLink id={currentRank.name} className={runnerUpStyle} key={`${item.rank}`}>
              <div className={profileStyle}>
                <img src={currentRank.image} alt={`${item.rank}등`} />
                {item.crownElement}
                <div className={brightBgStyle} />
              </div>
              <div className={nameStyle}>{currentRank.name}</div>
              <div className={contributionStyle}>{currentRank.contributions}</div>
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
                className={rostrumStyle}
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
