'use client';

import { useEffect, useRef } from 'react';

const LOGO_SRC = '/event/christmas/christmas-logo.svg';
const COLS = 150;
const CELL_W = 4.5;
const CELL_H = 6.5;
const GLYPHS = '@#%&$';

export function AsciiLogo({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let cancelled = false;

    const img = new Image();
    img.src = LOGO_SRC;
    img.onload = () => {
      if (cancelled) return;
      const rows = Math.round(((COLS * img.height) / img.width) * (CELL_W / CELL_H));
      const width = COLS * CELL_W;
      const height = rows * CELL_H;

      const sample = document.createElement('canvas');
      sample.width = COLS;
      sample.height = rows;
      const sctx = sample.getContext('2d');
      if (!sctx) return;
      sctx.drawImage(img, 0, 0, COLS, rows);
      const px = sctx.getImageData(0, 0, COLS, rows).data;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.aspectRatio = `${width} / ${height}`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.font = '800 7.5px ui-monospace, Menlo, monospace';
      ctx.textBaseline = 'top';

      let t = 0;
      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        // 문자만으로는 글씨가 안 읽혀서 원본 로고를 옅게 깐다
        ctx.globalAlpha = 0.28;
        ctx.drawImage(img, 0, 0, width, height);
        ctx.globalAlpha = 1;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < COLS; c++) {
            const i = (r * COLS + c) * 4;
            if (px[i + 3] < 110 || px[i] + px[i + 1] + px[i + 2] < 120) continue;
            const k = Math.floor((Math.sin(t / 50 + c * 0.5 + r * 0.9) * 0.5 + 0.5) * GLYPHS.length * 0.999);
            ctx.fillStyle = `rgb(${px[i]},${px[i + 1]},${px[i + 2]})`;
            ctx.fillText(GLYPHS.charAt(k), c * CELL_W, r * CELL_H);
          }
        }
        t++;
        if (!reduceMotion) raf = requestAnimationFrame(draw);
      };
      draw();
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas ref={canvasRef} role="img" aria-label="Git Animals Christmas" className={`block w-full ${className ?? ''}`} />
  );
}
