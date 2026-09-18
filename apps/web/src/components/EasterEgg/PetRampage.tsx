/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

import { getPersonaImage } from '@/utils/image';

import { isBiteSized, shardPolygons } from './petRampage.utils';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const;

const OVERLAY_ID = 'pet-rampage';
const DEVOURED_ATTR = 'data-devoured';
const SHARD_ATTR = 'data-rampage-shard';
const SHARD_COUNT = 14;
const PET_TYPES = ['SLIME_RED', 'PENGUIN', 'PIG', 'GOOSE', 'LITTLE_CHICK'];
const CONFETTI_COLORS = ['#FFCC91', '#FFDBEE', '#C4F2F7', '#FFE066', '#FF6B6B'];
const EXIT_MS = 400;

// framer-motion 은 rAF 구동이라 백그라운드 탭에서 진입 상태(opacity 0)에 얼어붙는다. CSS 키프레임은 안 그럼
const STYLES = `
@keyframes pet-rampage-tint { from { opacity: 0 } to { opacity: 1 } }
@keyframes pet-rampage-enter {
  0% { transform: translateY(340px) rotate(-18deg); opacity: 0 }
  60% { transform: translateY(-28px) rotate(6deg); opacity: 1 }
  80% { transform: translateY(10px) rotate(-3deg) }
  100% { transform: translateY(0) rotate(0); opacity: 1 }
}
@keyframes pet-rampage-bob {
  0%, 100% { transform: translateY(0) scaleX(1); filter: drop-shadow(0 0 18px rgba(255,180,80,.7)) }
  50% { transform: translateY(-16px) scaleX(1.05); filter: drop-shadow(0 0 42px rgba(255,120,200,.95)) }
}
@keyframes pet-rampage-chomp {
  0% { transform: scale(1) rotate(0) }
  35% { transform: scale(1.28) rotate(-9deg) }
  100% { transform: scale(1) rotate(0) }
}
#${OVERLAY_ID} .tint { animation: pet-rampage-tint .6s ease-out both }
#${OVERLAY_ID} .pet-enter { animation: pet-rampage-enter .9s cubic-bezier(.2,.8,.3,1) both }
#${OVERLAY_ID} .pet-idle { animation: pet-rampage-bob 1.6s ease-in-out infinite }
#${OVERLAY_ID} .pet-chomp { animation: pet-rampage-chomp .32s ease-out }
#${OVERLAY_ID}.is-closing .tint { animation: pet-rampage-tint .4s ease-in reverse both }
#${OVERLAY_ID}.is-closing .pet-enter { animation: pet-rampage-enter .4s ease-in reverse both }
@media (prefers-reduced-motion: reduce) {
  #${OVERLAY_ID} .pet-enter, #${OVERLAY_ID} .pet-idle, #${OVERLAY_ID} .pet-chomp { animation: none }
}
`;

function useKonamiCode(onUnlock: () => void) {
  useEffect(() => {
    let cursor = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      // 입력 중에는 무시. e.target 이 window 일 수도 있어서 optional call 로 방어한다
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('input, textarea, [contenteditable]')) return;

      const expected = KONAMI[cursor];
      const key = expected.length === 1 ? e.key.toLowerCase() : e.key;

      if (key === expected) cursor += 1;
      else cursor = key === KONAMI[0] ? 1 : 0;

      if (cursor === KONAMI.length) {
        cursor = 0;
        onUnlock();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onUnlock]);
}

/** 화면 안에서 한 입 크기가 될 때까지 자식으로 내려간다. BFS 라 가장 큰 "먹을 만한" 블록부터 걸린다. */
function findNextTarget(): HTMLElement | null {
  const queue = Array.from(document.body.children) as HTMLElement[];

  while (queue.length > 0) {
    const el = queue.shift();
    if (!el || el.id === OVERLAY_ID || el.hasAttribute(DEVOURED_ATTR) || el.hasAttribute(SHARD_ATTR)) continue;

    const rect = el.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;

    if (isBiteSized(rect, window.innerHeight)) return el;
    queue.push(...(Array.from(el.children) as HTMLElement[]));
  }

  return null;
}

/** 원본을 조각낸 복제본을 펫 입쪽으로 빨아들인다. 원본은 지우지 않고 숨기기만 해서 닫을 때 되돌린다. */
function shatterInto(el: HTMLElement, mouth: { x: number; y: number }, instant: boolean) {
  const rect = el.getBoundingClientRect();
  el.setAttribute(DEVOURED_ATTR, '');
  el.style.visibility = 'hidden';

  if (instant) return;

  const fragment = document.createDocumentFragment();
  const dx = mouth.x - (rect.left + rect.width / 2);
  const dy = mouth.y - (rect.top + rect.height / 2);

  shardPolygons(SHARD_COUNT).forEach((polygon) => {
    const shard = document.createElement('div');
    shard.setAttribute(SHARD_ATTR, '');
    shard.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;z-index:9998;pointer-events:none;clip-path:polygon(${polygon});will-change:transform,opacity;`;

    const clone = el.cloneNode(true) as HTMLElement;
    // ponytail: 중첩 id 중복은 그냥 둔다. 1초 뒤 사라지는 복제본이라 실익이 없음
    clone.removeAttribute('id');
    clone.removeAttribute(DEVOURED_ATTR);
    clone.style.visibility = 'visible';
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    shard.appendChild(clone);

    const spin = (Math.random() - 0.5) * 720;

    shard
      .animate(
        [
          { transform: 'translate(0px, 0px) rotate(0deg) scale(1)', opacity: 1 },
          {
            transform: `translate(${dx * 0.2}px, ${dy * 0.2 - 70}px) rotate(${spin * 0.25}deg) scale(1.08)`,
            opacity: 1,
            offset: 0.28,
          },
          { transform: `translate(${dx}px, ${dy}px) rotate(${spin}deg) scale(0.04)`, opacity: 0 },
        ],
        { duration: 750 + Math.random() * 350, easing: 'cubic-bezier(.55,.06,.68,.19)', fill: 'forwards' },
      )
      .addEventListener('finish', () => shard.remove());

    fragment.appendChild(shard);
  });

  document.body.appendChild(fragment);
}

function restoreAll() {
  document.querySelectorAll<HTMLElement>(`[${DEVOURED_ATTR}]`).forEach((el) => {
    el.style.visibility = '';
    el.removeAttribute(DEVOURED_ATTR);
  });
}

export function PetRampage() {
  const [isActive, setIsActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [eaten, setEaten] = useState(0);
  const [petType, setPetType] = useState(PET_TYPES[0]);
  const petRef = useRef<HTMLButtonElement>(null);

  useKonamiCode(
    useCallback(() => {
      setPetType(PET_TYPES[Math.floor(Math.random() * PET_TYPES.length)]);
      setEaten(0);
      setIsClosing(false);
      setIsActive(true);
    }, []),
  );

  const close = useCallback(() => {
    restoreAll();
    setIsClosing(true);
    window.setTimeout(() => setIsActive(false), EXIT_MS);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      restoreAll();
    };
  }, [isActive, close]);

  const devour = () => {
    const target = findNextTarget();
    if (!target) return;

    const pet = petRef.current;
    const petRect = pet?.getBoundingClientRect();
    const mouth = petRect
      ? { x: petRect.left + petRect.width / 2, y: petRect.top + petRect.height * 0.35 }
      : { x: window.innerWidth / 2, y: window.innerHeight * 0.7 };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    shatterInto(target, mouth, reduceMotion);
    setEaten((count) => count + 1);

    if (reduceMotion) return;

    // 같은 클래스를 다시 붙여도 애니메이션이 재생되도록 한 번 떼었다 붙인다
    pet?.classList.remove('pet-chomp');
    void pet?.offsetWidth;
    pet?.classList.add('pet-chomp');

    confetti({
      particleCount: 70,
      spread: 80,
      startVelocity: 32,
      scalar: 0.9,
      colors: CONFETTI_COLORS,
      origin: { x: mouth.x / window.innerWidth, y: mouth.y / window.innerHeight },
      disableForReducedMotion: true,
    });
    document.body.animate(
      [{ transform: 'translate(0,0)' }, { transform: 'translate(-8px, 5px)' }, { transform: 'translate(0,0)' }],
      { duration: 220, easing: 'ease-in-out' },
    );
  };

  if (!isActive) return null;

  // 먹을수록 커진다. 3배에서 멈추지 않으면 화면을 다 덮어버림
  const petScale = Math.min(1 + eaten * 0.12, 3);

  return (
    <div
      id={OVERLAY_ID}
      className={`pointer-events-none fixed inset-0 z-[9999] ${isClosing ? 'is-closing' : ''}`}
      aria-hidden={isClosing}
    >
      <style>{STYLES}</style>

      <div className="tint absolute inset-0 bg-gradient-to-b from-amber-200/0 via-orange-400/20 to-fuchsia-500/40" />

      <div className="pet-enter absolute bottom-[14vh] left-1/2 -translate-x-1/2">
        <button
          ref={petRef}
          type="button"
          aria-label="pet rampage"
          onClick={devour}
          className="pointer-events-auto block origin-bottom cursor-pointer"
          style={{ scale: String(petScale), transition: 'scale .35s cubic-bezier(.2,1.6,.4,1)' }}
        >
          <img
            src={getPersonaImage(petType)}
            alt=""
            width={220}
            height={220}
            className="pet-idle block h-[220px] w-auto [image-rendering:pixelated]"
          />
        </button>
      </div>

      <div className="pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {eaten > 0 && (
          <span className="rounded-full bg-black/60 px-3 py-1 text-sm font-bold tabular-nums text-white">{eaten}</span>
        )}
        <button
          type="button"
          aria-label="close pet rampage"
          onClick={close}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-xl text-black shadow-lg transition hover:bg-amber-300"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default PetRampage;
