/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { GotchaResult } from '@gitanimals/api';
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';

import AnimalCard, { AnimalCardBack } from '@/components/AnimalCard/AnimalCard';
import type { AnimalTierType } from '@/constants/animalTier';
import { getAnimalTierInfo } from '@/utils/animals';

const TIER_GLOW: Record<AnimalTierType, string> = {
  EX: '#ffd54a',
  S_PLUS: '#b18cff',
  A_PLUS: '#ffe08a',
  B_MINUS: '#7a8aa0',
};
const TIER_RANK: Record<AnimalTierType, number> = { EX: 0, S_PLUS: 1, A_PLUS: 2, B_MINUS: 3 };

const tierOf = (p: GotchaResult) => getAnimalTierInfo(Number(p.dropRate.replace('%', '')));
const isRare = (p: GotchaResult) => tierOf(p) === 'EX' || tierOf(p) === 'S_PLUS';

// 회전(0.5s)이 끝나고 한 박자 뒤 — 이때 광채/컨페티로 레어를 강조한다
const RARE_EMPHASIS_DELAY_MS = 500;

type Phase = 'pack' | 'opening' | 'revealing' | 'finale' | 'done';

interface Props {
  onOpen: () => void; // 덱 개봉 = API 호출 트리거
  results: GotchaResult[] | null;
  onClose: () => void;
  onBusyChange?: (busy: boolean) => void;
}

export function CardPackGame({ onOpen, results, onClose, onBusyChange }: Props) {
  const t = useTranslations('Gotcha');
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('pack');
  const [flipped, setFlipped] = useState<boolean[]>(Array(10).fill(false));
  const shake = useAnimationControls();

  const skippedRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // 개봉~공개 완료 전엔 닫기 차단 (포인트 차감 후 결과 미확인 방지)
  useEffect(() => {
    onBusyChange?.(phase === 'opening' || phase === 'revealing' || phase === 'finale');
  }, [phase, onBusyChange]);

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = setTimeout(resolve, skippedRef.current ? 0 : ms);
      timers.current.push(id);
    });

  const fireConfetti = async (opts: Record<string, unknown>) => {
    if (reduce) return;
    const confetti = (await import('canvas-confetti')).default;
    confetti({ shapes: ['square'], flat: true, scalar: 1.1, zIndex: 9200, ...opts });
  };

  const doShake = () => {
    if (!reduce) shake.start({ x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.35 } });
  };

  const bestIndex = results
    ? results.reduce((best, p, i, arr) => (TIER_RANK[tierOf(p)] < TIER_RANK[tierOf(arr[best])] ? i : best), 0)
    : -1;

  const runReveal = async (res: GotchaResult[]) => {
    setPhase('revealing');
    await wait(650); // 카드 딜(펼침)이 끝난 뒤 플립 시작
    if (skippedRef.current) return;

    // 순차 플립 — 레어는 팝/글로우/흔들림/컨페티로 강조하고 잠깐 머문다
    for (let i = 0; i < 10; i++) {
      setFlipped((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      const rare = isRare(res[i]);
      if (!rare) {
        await wait(150);
        if (skippedRef.current) return;
        continue;
      }
      // 앞면이 보인 뒤에 강조 — 뒷면 상태에서 글로우/컨페티가 터지면 등급이 미리 새어나간다
      await wait(RARE_EMPHASIS_DELAY_MS);
      if (skippedRef.current) return;
      doShake();
      fireConfetti({
        particleCount: 50,
        spread: 70,
        startVelocity: 38,
        origin: { y: 0.5 },
        colors: [TIER_GLOW[tierOf(res[i])], '#ffffff'],
      });
      await wait(340);
      if (skippedRef.current) return;
    }

    await wait(250);
    if (skippedRef.current) return;

    // 피날레 — 최고 등급 카드를 중앙으로 확대
    setPhase('finale');
    const best = res[bestIndex];
    if (isRare(best)) {
      doShake();
      fireConfetti({
        particleCount: 200,
        spread: 130,
        startVelocity: 58,
        origin: { y: 0.5 },
        colors: ['#ffd54a', '#b18cff', '#4ad9ff', '#7cff6b', '#ffffff'],
      });
    }
    await wait(1600);
    if (skippedRef.current) return;
    setPhase('done');
  };

  const openPack = () => {
    if (phase !== 'pack') return;
    setPhase('opening');
    onOpen();
  };

  // 결과 도착 시 공개 시퀀스 시작
  useEffect(() => {
    if (results && phase === 'opening') runReveal(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const finishNow = () => {
    skippedRef.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setFlipped(Array(10).fill(true));
    setPhase('done');
  };

  const handleStageClick = () => {
    if (phase === 'done') onClose();
    else if ((phase === 'revealing' || phase === 'finale') && results) finishNow();
  };

  const best = results && bestIndex >= 0 ? results[bestIndex] : null;

  return (
    <div
      className="relative flex h-full min-h-[560px] w-full flex-col items-center justify-center overflow-hidden"
      onClick={handleStageClick}
    >
      {/* 닫힌 덱(×10) — 응답 대기(opening) 동안에도 남겨 정적인 빈 화면을 만들지 않는다 */}
      <AnimatePresence>
        {(phase === 'pack' || phase === 'opening') && (
          <motion.button
            type="button"
            key="deck"
            className="relative z-10"
            disabled={phase === 'opening'}
            onClick={(e) => {
              e.stopPropagation();
              openPack();
            }}
            aria-label="open pack"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              reduce
                ? { scale: 1, opacity: 1 }
                : phase === 'opening'
                  ? { scale: [1, 1.06, 1], opacity: 1, rotate: [0, -2, 2, 0] }
                  : { scale: 1, opacity: 1, y: [0, -10, 0] }
            }
            exit={{ scale: 1.15, opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
              scale: phase === 'opening' ? { duration: 0.6, repeat: Infinity } : { duration: 0.3 },
              rotate: { duration: 0.6, repeat: Infinity },
              default: { duration: 0.3 },
            }}
            whileHover={phase === 'pack' ? { scale: 1.05 } : undefined}
          >
            <CardDeck />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 개봉 순간 — 중앙에서 부드럽게 퍼지는 빛 (전체 화이트 플래시 대신) */}
      {phase === 'revealing' && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0.6, scale: 0.2 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.4) 30%, transparent 65%)' }}
        />
      )}

      {/* 카드 그리드 — 결과 도착 후에만 펼친다 */}
      {phase !== 'pack' && phase !== 'opening' && (
        <motion.div className="z-10 grid grid-cols-5 gap-[14px] px-4 mobile:gap-[6px]" animate={shake}>
          {Array.from({ length: 10 }).map((_, i) => (
            <PackCard
              key={i}
              index={i}
              persona={results?.[i] ?? null}
              isFlipped={flipped[i]}
              isBest={phase === 'done' && i === bestIndex}
              dimmed={phase === 'finale'}
            />
          ))}
        </motion.div>
      )}

      {/* 피날레 — 최고 등급 카드 확대 */}
      <AnimatePresence>
        {phase === 'finale' && best && (
          <motion.div
            key="finale"
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 스크림 — 없으면 확대 카드가 그리드에 파묻혀 '잘못 놓인 카드'처럼 보인다 */}
            <div className="absolute inset-0 bg-black/75" />
            <motion.div
              className="relative w-[320px] max-w-[75vw]"
              initial={{ scale: 0.3, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 13 }}
            >
              {isRare(best) && (
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: `conic-gradient(${TIER_GLOW[tierOf(best)]}00, ${TIER_GLOW[tierOf(best)]}88, ${TIER_GLOW[tierOf(best)]}00, ${TIER_GLOW[tierOf(best)]}88, ${TIER_GLOW[tierOf(best)]}00)`,
                    borderRadius: '9999px',
                    maskImage: 'radial-gradient(circle, transparent 32%, black 34%, transparent 70%)',
                  }}
                />
              )}
              <AnimalCard type={best.name} dropRate={best.dropRate} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 안내 문구 */}
      <div className="absolute bottom-6 left-0 w-full text-center">
        {phase === 'pack' && <p className="glyph16-regular text-white/80">{t('open-pack')}</p>}
        {phase === 'opening' && <p className="glyph16-regular text-white/60">{t('gotcha-in-progress')}</p>}
        {(phase === 'revealing' || phase === 'finale') && (
          <p className="glyph16-regular text-white/50">{t('tap-to-skip')}</p>
        )}
        {phase === 'done' && <p className="glyph16-regular text-white/80">{t('click-to-close')}</p>}
      </div>
    </div>
  );
}

// 픽셀 카드 뒷면을 겹쳐 만든 덱(×10)
function CardDeck() {
  return (
    <div className="relative aspect-[109/135] w-[200px] mobile:w-[150px]">
      <div className="absolute inset-0 translate-x-[10px] translate-y-[10px] opacity-60">
        <AnimalCardBack tier="A_PLUS" />
      </div>
      <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] opacity-80">
        <AnimalCardBack tier="S_PLUS" />
      </div>
      <div className="absolute inset-0">
        <AnimalCardBack tier="EX" />
      </div>
      <div
        className="glyph20-bold absolute -right-2 -top-2 rounded-md px-2 py-0.5 text-white"
        style={{ background: '#232336', boxShadow: '3px 3px 0 rgba(0,0,0,0.4)' }}
      >
        ×10
      </div>
    </div>
  );
}

function PackCard({
  index,
  persona,
  isFlipped,
  isBest,
  dimmed,
}: {
  index: number;
  persona: GotchaResult | null;
  isFlipped: boolean;
  isBest: boolean;
  dimmed: boolean;
}) {
  const tier = persona ? tierOf(persona) : 'S_PLUS';
  const rare = persona ? isRare(persona) : false;

  // 덱이 있던 그리드 중앙에서 각 슬롯으로 날아오도록 시작 오프셋 계산
  const col = index % 5;
  const row = Math.floor(index / 5);
  const originX = -(col - 2) * 132;
  const originY = -(row - 0.5) * 160 - 20;

  return (
    <motion.div
      className="relative aspect-[109/135] w-[116px] [perspective:1000px] mobile:w-[58px]"
      initial={{ x: originX, y: originY, rotate: (col - 2) * 7, scale: 0.35, opacity: 0 }}
      animate={{ x: 0, y: 0, rotate: 0, scale: isBest ? 1.08 : 1, opacity: dimmed ? 0.35 : 1 }}
      transition={{
        default: { type: 'spring', stiffness: 260, damping: 24, delay: index * 0.045 },
        opacity: { duration: 0.3, delay: index * 0.045 },
      }}
    >
      {/* 레어/최고 등급 글로우 */}
      {((rare && isFlipped) || isBest) && (
        <motion.div
          className="pointer-events-none absolute -inset-1.5 -z-10 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // 뒤집힘이 끝나고 한 박자 뒤에 번지도록 — 뒷면에서 광채가 새면 등급이 미리 노출된다
          transition={{ duration: 0.35, delay: isBest ? 0 : 0.45 }}
          style={{
            boxShadow: `0 0 ${isBest ? 28 : 18}px ${isBest ? 8 : 4}px ${TIER_GLOW[tier]}`,
            background: `${TIER_GLOW[tier]}22`,
          }}
        />
      )}
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0, scale: isFlipped && rare ? [1, 1.16, 1] : 1 }}
        transition={{ rotateY: { duration: 0.5, ease: 'easeInOut' }, scale: { duration: 0.45 } }}
      >
        <div className="absolute h-full w-full [backface-visibility:hidden]">
          <AnimalCardBack tier="S_PLUS" />
        </div>
        <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {persona && <AnimalCard type={persona.name} dropRate={persona.dropRate} />}
        </div>
      </motion.div>
    </motion.div>
  );
}
