/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';

import { AnimalCard } from '@/components/AnimalCard';
import type { AnimalTierType } from '@/components/AnimalCard/AnimalCard.constant';
import { getAnimalTierInfo } from '@/utils/animals';

// 알 부화 스프라이트 (12프레임, 32x384 세로 스트립) — VIERGACHT/iamcrog 픽셀 에셋.
const EGG_SPRITE = '/shop/egg-hatch.png';
const EGG_FRAMES = 12;
const SHATTER_FRAME = 9; // 껍질이 깨지기 시작하는 프레임 → 이때 컨페티 + 화면 흔들림
const LAST_FRAME = EGG_FRAMES - 1; // 부화 후 남는 껍질 프레임

// ponytail: 티어(EX/S+/A+/B-)가 연출의 유일한 변수. 새 API 없이 dropRate에서 파생.
// 알 스프라이트는 회색 단일색 → 티어는 오라/배지/컨페티로 표현.
const TIER_THEME: Record<
  AnimalTierType,
  { glow: string; confetti: string[]; rockLoops: number; hatchStepMs: number; particles: number }
> = {
  EX: {
    glow: '#ffd54a',
    confetti: ['#ff5edf', '#ffd54a', '#4ad9ff', '#7cff6b', '#ffffff'],
    rockLoops: 3,
    hatchStepMs: 105,
    particles: 200,
  },
  S_PLUS: {
    glow: '#b18cff',
    confetti: ['#c084fc', '#b18cff', '#e9d5ff', '#7cff6b'],
    rockLoops: 2,
    hatchStepMs: 95,
    particles: 150,
  },
  A_PLUS: {
    glow: '#ffe08a',
    confetti: ['#ffe08a', '#f5b73f', '#fff6d6'],
    rockLoops: 1,
    hatchStepMs: 85,
    particles: 80,
  },
  B_MINUS: {
    glow: '#c3d3e6',
    confetti: ['#c3d3e6', '#9fb8d6', '#ffffff'],
    rockLoops: 0,
    hatchStepMs: 75,
    particles: 36,
  },
};

const isRareTier = (tier: AnimalTierType) => tier === 'EX' || tier === 'S_PLUS';

// 세로 스트립에서 f번째 프레임만 보이도록 하는 배경 스타일
const eggFrameStyle = (f: number) => ({
  backgroundImage: `url(${EGG_SPRITE})`,
  backgroundSize: '100% auto',
  backgroundRepeat: 'no-repeat' as const,
  backgroundPositionY: `${(f / LAST_FRAME) * 100}%`,
  imageRendering: 'pixelated' as const,
});

type Phase = 'idle' | 'dropping' | 'hatching' | 'result';

interface Persona {
  name: string;
  dropRate: string;
  tier: AnimalTierType;
}

interface Props {
  onDraw: () => Promise<{ name: string; dropRate: string } | undefined>;
  onClose: () => void;
  // 뽑는 중(포인트 차감~결과 전)엔 true → 부모가 닫기(X/Esc/오버레이)를 막음
  onBusyChange?: (busy: boolean) => void;
}

export function GachaHatchGame({ onDraw, onClose, onBusyChange }: Props) {
  const t = useTranslations('Gotcha');
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('idle');
  const [persona, setPersona] = useState<Persona | null>(null);
  const [frame, setFrame] = useState(0);
  const shakeControls = useAnimationControls();

  const skippedRef = useRef(false);
  const confettiFiredRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  // 뽑기 시작 후 결과 전까지는 닫기 불가
  useEffect(() => {
    onBusyChange?.(phase === 'dropping' || phase === 'hatching');
  }, [phase, onBusyChange]);

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = setTimeout(resolve, skippedRef.current ? 0 : ms);
      timers.current.push(id);
    });

  const fireConfetti = async (tier: AnimalTierType) => {
    if (confettiFiredRef.current || reduce) return;
    confettiFiredRef.current = true;
    const theme = TIER_THEME[tier];
    const confetti = (await import('canvas-confetti')).default;
    // 픽셀 톤: 사각형 + flat 으로 픽셀 조각처럼
    const base = { colors: theme.confetti, shapes: ['square' as const], flat: true, scalar: 1.2, zIndex: 9200 };
    confetti({
      ...base,
      particleCount: theme.particles,
      spread: isRareTier(tier) ? 120 : 70,
      startVelocity: isRareTier(tier) ? 55 : 40,
      origin: { y: 0.5 },
    });
    if (isRareTier(tier)) {
      const id = setTimeout(() => {
        confetti({ ...base, particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: 0.65 } });
        confetti({ ...base, particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: 0.65 } });
      }, 220);
      timers.current.push(id);
    }
  };

  const runReveal = async (drawn: Persona) => {
    setPhase('hatching');
    const theme = TIER_THEME[drawn.tier];

    // 고티어일수록 껍질을 여러 번 흔든 뒤 부화 (긴장감)
    for (let r = 0; r < theme.rockLoops; r++) {
      for (let f = 0; f <= 3; f++) {
        setFrame(f);
        await wait(70);
        if (skippedRef.current) return;
      }
    }

    // 본 부화: 0 → 11 프레임 재생. 깨지는 순간(9~11)은 조금 느리게 눌러 임팩트.
    for (let f = 0; f < EGG_FRAMES; f++) {
      setFrame(f);
      if (f === SHATTER_FRAME) {
        fireConfetti(drawn.tier);
        if (!reduce) shakeControls.start({ x: [0, -7, 7, -6, 6, -3, 3, 0], transition: { duration: 0.35 } });
      }
      await wait(f >= SHATTER_FRAME ? Math.round(theme.hatchStepMs * 1.5) : theme.hatchStepMs);
      if (skippedRef.current) return;
    }

    await wait(450);
    if (skippedRef.current) return;
    setPhase('result');
  };

  const draw = async () => {
    if (phase !== 'idle') return;
    setPhase('dropping');
    try {
      const res = await onDraw();
      if (!res) {
        onClose(); // onDraw가 에러 토스트/닫기를 처리함
        return;
      }
      const tier = getAnimalTierInfo(Number(res.dropRate.replace('%', '')));
      const drawn: Persona = { ...res, tier };
      setPersona(drawn);
      await runReveal(drawn);
    } catch {
      onClose();
    }
  };

  // 화면 탭: 결과면 닫기, 부화 중이면(결과 확정 후) 스킵
  const handleStageClick = () => {
    if (phase === 'result') {
      onClose();
      return;
    }
    if (persona && phase === 'hatching') {
      skippedRef.current = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      fireConfetti(persona.tier);
      setPhase('result');
    }
  };

  const theme = persona ? TIER_THEME[persona.tier] : TIER_THEME.B_MINUS;
  const showEgg = phase !== 'result';

  return (
    <div
      className="relative flex h-full min-h-[560px] w-full flex-col items-center justify-center overflow-hidden"
      onClick={handleStageClick}
    >
      {/* 픽셀 GOTCHA 워드마크 */}
      {phase !== 'result' && (
        <Image
          src="/shop/gotcha.svg"
          alt="GOTCHA"
          width={240}
          height={50}
          className="absolute top-[72px] h-auto w-[200px] mobile:top-[48px] mobile:w-[160px]"
          style={{ imageRendering: 'pixelated' }}
        />
      )}

      {/* 티어 오라 배경광 */}
      <AnimatePresence>
        {persona && phase !== 'dropping' && (
          <motion.div
            key="aura"
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'result' ? 0.9 : 0.5 }}
            exit={{ opacity: 0 }}
            style={{ background: `radial-gradient(circle at center, ${theme.glow}44 0%, transparent 62%)` }}
          />
        )}
      </AnimatePresence>

      {showEgg && <PixelEgg phase={phase} frame={frame} reduce={Boolean(reduce)} onDraw={draw} shake={shakeControls} />}

      {/* 부화 후 남은 껍질 — 펫 카드가 여기서 솟아오르며 껍질은 스르륵 사라짐 */}
      {phase === 'result' && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-20 aspect-square w-[220px] mobile:w-[160px]"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={eggFrameStyle(LAST_FRAME)}
        />
      )}

      {phase === 'result' && persona && <Result persona={persona} theme={theme} tapLabel={t('click-to-close')} />}

      {/* 하단 안내 문구 */}
      <div className="absolute bottom-4 left-0 w-full text-center">
        {phase === 'idle' && <p className="glyph16-regular text-white/80">{t('pull-lever')}</p>}
        {phase === 'dropping' && <p className="glyph16-regular text-white/60">{t('gotcha-in-progress')}</p>}
        {persona && phase === 'hatching' && <p className="glyph16-regular text-white/50">{t('tap-to-skip')}</p>}
      </div>
    </div>
  );
}

function PixelEgg({
  phase,
  frame,
  reduce,
  onDraw,
  shake,
}: {
  phase: Phase;
  frame: number;
  reduce: boolean;
  onDraw: () => void;
  shake: ReturnType<typeof useAnimationControls>;
}) {
  const idle = phase === 'idle';
  const wobble = phase === 'dropping';
  const hatching = phase === 'hatching';

  const anim = reduce ? {} : idle ? { y: [0, -6, 0] } : wobble ? { rotate: [0, -5, 5, -5, 5, 0] } : {};
  const transition = idle
    ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const }
    : { duration: 0.6, repeat: wobble ? Infinity : 0 };

  return (
    <motion.button
      type="button"
      className="relative z-10 aspect-square w-[220px] disabled:cursor-default mobile:w-[160px]"
      onClick={(e) => {
        e.stopPropagation();
        if (idle) onDraw();
      }}
      disabled={!idle}
      aria-label="draw pet"
      // 부화 단계에선 껍질 깨질 때 흔들림 컨트롤을, 그 외엔 idle/대기 모션을 사용
      animate={hatching ? shake : anim}
      transition={transition}
      whileHover={idle ? { scale: 1.05 } : undefined}
      whileTap={idle ? { scaleY: 0.9 } : undefined}
      style={eggFrameStyle(frame)}
    />
  );
}

function Result({
  persona,
  theme,
  tapLabel,
}: {
  persona: Persona;
  theme: (typeof TIER_THEME)[AnimalTierType];
  tapLabel: string;
}) {
  return (
    <motion.div
      className="relative z-30 flex flex-col items-center gap-5"
      initial={{ scale: 0.6, opacity: 0, y: 64 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 13 }}
    >
      <div className="relative">
        {isRareTier(persona.tier) && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              background: `conic-gradient(${theme.glow}00, ${theme.glow}66, ${theme.glow}00, ${theme.glow}66, ${theme.glow}00)`,
              borderRadius: '9999px',
              maskImage: 'radial-gradient(circle, transparent 30%, black 32%, transparent 70%)',
            }}
          />
        )}
        <div className="w-[220px] max-w-[60vw]">
          <AnimalCard type={persona.name} dropRate={persona.dropRate} />
        </div>
      </div>

      <p className="glyph16-regular text-center text-white/80">{tapLabel}</p>
    </motion.div>
  );
}
