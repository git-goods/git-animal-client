'use client';

import { useEffect, useRef, useState } from 'react';

import { getTreeLayout } from './layout';
import { createTreeEngine } from './tree-engine';

const TREE_KEY = 'classic';
const TILT_SECONDS = 0.6;

interface AsciiTreeProps {
  link: string;
  hintToQr: string;
  hintToTree: string;
  className?: string;
}

export function AsciiTree({ link, hintToQr, hintToTree, className }: AsciiTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const viewRef = useRef<'tree' | 'qr'>('tree');
  const [view, setView] = useState<'tree' | 'qr'>('tree');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = createTreeEngine();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 첫 진입부터 완성된 트리 — 조립 애니메이션 없음
    const anim = { p: 0, drop: 1 };
    const t0 = performance.now();
    let last = 0;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;

      const target = viewRef.current === 'qr' ? 1 : 0;
      anim.p = reduceMotion
        ? target
        : anim.p + Math.max(-dt / TILT_SECONDS, Math.min(dt / TILT_SECONDS, target - anim.p));
      const cam = 1 - engine.ease(Math.max(0, Math.min(1, anim.p)));
      const reveal = Math.max(0, Math.min(1, (anim.p - 0.12) / 0.88));

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = Math.round(w * dpr);
      const H = Math.round(h * dpr);
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const layout = getTreeLayout(w, h);
      if (hintRef.current) hintRef.current.style.left = `${layout.centerX}px`;

      engine.draw(ctx, w, h, link, TREE_KEY, {
        cam,
        reveal,
        grow: 1,
        drop: anim.drop,
        treeMix: cam,
        time: reduceMotion ? 0 : (now - t0) / 1000,
        dpr,
        fs: layout.fs,
        bloomScale: layout.bloomScale,
        fill: layout.fill,
        treeDrop: layout.treeDrop,
        centerX: layout.centerX,
        fall: true,
        baubles: true,
      });
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [link]);

  const toggle = () => {
    viewRef.current = viewRef.current === 'qr' ? 'tree' : 'qr';
    setView(viewRef.current);
  };

  const hint = view === 'qr' ? hintToTree : hintToQr;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={hint}
      className={`absolute inset-0 cursor-pointer ${className ?? ''}`}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
      <p
        ref={hintRef}
        aria-live="polite"
        className="absolute bottom-[20px] -translate-x-1/2 whitespace-nowrap rounded-full border border-white-alpha-10 bg-black-alpha-50 px-[14px] py-[6px] text-[12px] text-white-alpha-50 mobile:hidden"
      >
        {hint}
      </p>
    </button>
  );
}
