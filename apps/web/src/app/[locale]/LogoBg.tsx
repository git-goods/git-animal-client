'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '_panda/css';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  swayPhase: number;
  swayAmplitude: number;
  state: 'falling' | 'accumulated' | 'scattered';
}

interface MousePosition {
  x: number;
  y: number;
}

// ============================================================================
// Constants
// ============================================================================

const PARTICLE_COUNT = 350;
const GRAVITY = 0.02;
const WIND_FORCE = 0.2;
const SWAY_SPEED = 0.02;
const MOUSE_REPEL_RADIUS = 80;
const MOUSE_REPEL_FORCE = 0.6;
const SNOW_ACCUMULATION_RATE = 0.15;
const MAX_SNOW_HEIGHT_ON_TEXT = 25;
const MAX_SNOW_HEIGHT_ON_GROUND = 50;
const TEXT_FONT = 'bold 72px "Arial Black", Arial, sans-serif';
const TEXT_COLOR = '#FFEA7B';
const TEXT_CONTENT = 'Git Animals';

// ============================================================================
// Utility Functions
// ============================================================================

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// ============================================================================
// Main Component
// ============================================================================

export default function LogoBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const topEdgeMapRef = useRef<number[]>([]); // y position of text top edge for each x
  const snowHeightMapRef = useRef<number[]>([]); // accumulated snow height for each x
  const groundSnowHeightRef = useRef<number[]>([]); // ground snow height for each x
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const textBoundsRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const shakeOffsetRef = useRef({ x: 0, y: 0 });

  // Create a single particle
  const createParticle = useCallback(
    (canvasWidth: number, canvasHeight: number, fromTop = true): Particle => {
      const radius = randomRange(2, 4);
      return {
        x: randomRange(-50, canvasWidth + 50),
        y: fromTop ? randomRange(-100, -10) : randomRange(0, canvasHeight),
        vx: randomRange(-0.3, 0.3),
        vy: randomRange(0.5, 1.5),
        radius,
        opacity: randomRange(0.5, 1),
        swayPhase: randomRange(0, Math.PI * 2),
        swayAmplitude: randomRange(0.3, 0.8),
        state: 'falling',
      };
    },
    []
  );

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle(width, height, false));
      }
      particlesRef.current = particles;
    },
    [createParticle]
  );

  // Calculate text top edge map using pixel detection
  const calculateTopEdgeMap = useCallback((_ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Create offscreen canvas for text measurement
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const offCtx = offscreenCanvas.getContext('2d');
    if (!offCtx) return;

    // Draw text on offscreen canvas
    offCtx.font = TEXT_FONT;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillStyle = TEXT_COLOR;

    const textX = width / 2;
    const textY = height / 2;
    offCtx.fillText(TEXT_CONTENT, textX, textY);

    // Measure text bounds
    const metrics = offCtx.measureText(TEXT_CONTENT);
    const textWidth = metrics.width;
    const textHeight = 72 * 1.2; // Approximate height based on font size
    textBoundsRef.current = {
      x: textX - textWidth / 2,
      y: textY - textHeight / 2,
      width: textWidth,
      height: textHeight,
    };

    // Get pixel data
    const imageData = offCtx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Initialize maps
    const topEdgeMap: number[] = new Array(width).fill(-1);
    const snowHeightMap: number[] = new Array(width).fill(0);
    const groundSnowHeight: number[] = new Array(width).fill(0);

    // Scan each column to find the topmost opaque pixel (text top edge)
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        if (alpha > 50) {
          // Found text pixel
          topEdgeMap[x] = y;
          break;
        }
      }
    }

    topEdgeMapRef.current = topEdgeMap;
    snowHeightMapRef.current = snowHeightMap;
    groundSnowHeightRef.current = groundSnowHeight;
  }, []);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });

      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          calculateTopEdgeMap(ctx, width, height);
        }
      }

      initParticles(width, height);
    };

    // Delay to ensure proper initialization
    const timeoutId = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [initParticles, calculateTopEdgeMap]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Logo click handler - shake off snow
  const handleLogoClick = useCallback(() => {
    if (isShaking) return;

    setIsShaking(true);

    // Animate shake
    let shakeTime = 0;
    const shakeInterval = setInterval(() => {
      shakeTime += 16;
      const intensity = Math.max(0, 1 - shakeTime / 500);
      shakeOffsetRef.current = {
        x: (Math.random() - 0.5) * 10 * intensity,
        y: (Math.random() - 0.5) * 5 * intensity,
      };

      if (shakeTime >= 500) {
        clearInterval(shakeInterval);
        shakeOffsetRef.current = { x: 0, y: 0 };
        setIsShaking(false);
      }
    }, 16);

    // Scatter snow from text
    const snowHeightMap = snowHeightMapRef.current;
    for (let i = 0; i < snowHeightMap.length; i++) {
      if (snowHeightMap[i] > 0) {
        // Create scattered particles
        const numParticles = Math.floor(snowHeightMap[i] / 3);
        for (let j = 0; j < numParticles; j++) {
          particlesRef.current.push({
            x: i,
            y: topEdgeMapRef.current[i] - snowHeightMap[i] + randomRange(0, snowHeightMap[i]),
            vx: randomRange(-3, 3),
            vy: randomRange(-2, 1),
            radius: randomRange(2, 4),
            opacity: randomRange(0.6, 1),
            swayPhase: 0,
            swayAmplitude: 0,
            state: 'scattered',
          });
        }
        snowHeightMap[i] = 0;
      }
    }
  }, [isShaking]);

  // Check if click is on text area
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const bounds = textBoundsRef.current;
      if (!bounds) return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if click is within text bounds (with some padding)
      const padding = 30;
      if (
        x >= bounds.x - padding &&
        x <= bounds.x + bounds.width + padding &&
        y >= bounds.y - padding &&
        y <= bounds.y + bounds.height + padding
      ) {
        handleLogoClick();
      }
    },
    [handleLogoClick]
  );

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16.67, 3);
      lastTimeRef.current = currentTime;

      const { width, height } = dimensions;
      if (width === 0 || height === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a1628');
      gradient.addColorStop(0.5, '#1a365d');
      gradient.addColorStop(1, '#234e82');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw watermark text (faded background)
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.font = TEXT_FONT;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = TEXT_COLOR;
      ctx.filter = 'blur(2px)';
      ctx.scale(1.2, 1.2);
      ctx.fillText(TEXT_CONTENT, width / 2 / 1.2, height / 2 / 1.2);
      ctx.restore();

      // Draw main text with shake offset
      ctx.save();
      ctx.font = TEXT_FONT;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = TEXT_COLOR;
      ctx.shadowColor = 'rgba(255, 234, 123, 0.3)';
      ctx.shadowBlur = 20;
      ctx.fillText(TEXT_CONTENT, width / 2 + shakeOffsetRef.current.x, height / 2 + shakeOffsetRef.current.y);
      ctx.restore();

      const particles = particlesRef.current;
      const topEdgeMap = topEdgeMapRef.current;
      const snowHeightMap = snowHeightMapRef.current;
      const groundSnowHeight = groundSnowHeightRef.current;
      const mouse = mouseRef.current;
      const groundY = height - 5;

      // Draw accumulated snow on text
      if (topEdgeMap.length > 0) {
        ctx.beginPath();
        let inSnow = false;

        for (let x = 0; x < width; x++) {
          const topY = topEdgeMap[x];
          const snowH = snowHeightMap[x];

          if (topY > 0 && snowH > 0) {
            const snowTop = topY - snowH + shakeOffsetRef.current.y;
            if (!inSnow) {
              ctx.moveTo(x + shakeOffsetRef.current.x, topY + shakeOffsetRef.current.y);
              inSnow = true;
            }
            // Create wavy top
            const waveOffset = Math.sin(x * 0.1) * 2;
            ctx.lineTo(x + shakeOffsetRef.current.x, snowTop + waveOffset);
          } else if (inSnow) {
            // Close the snow shape
            ctx.lineTo(x - 1 + shakeOffsetRef.current.x, topEdgeMap[x - 1] + shakeOffsetRef.current.y);
            ctx.closePath();
            inSnow = false;
          }
        }

        if (inSnow) {
          ctx.lineTo(width - 1 + shakeOffsetRef.current.x, topEdgeMap[width - 1] + shakeOffsetRef.current.y);
          ctx.closePath();
        }

        // Fill snow
        const snowGradient = ctx.createLinearGradient(0, height / 2 - 50, 0, height / 2);
        snowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        snowGradient.addColorStop(1, 'rgba(220, 235, 250, 0.9)');
        ctx.fillStyle = snowGradient;
        ctx.fill();
      }

      // Draw ground snow
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x < width; x += 3) {
        const snowH = groundSnowHeight[x] || 0;
        const waveOffset = Math.sin(x * 0.05 + currentTime * 0.0005) * 3;
        ctx.lineTo(x, groundY - snowH + waveOffset);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const groundSnowGradient = ctx.createLinearGradient(0, height - MAX_SNOW_HEIGHT_ON_GROUND, 0, height);
      groundSnowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      groundSnowGradient.addColorStop(0.5, 'rgba(240, 248, 255, 0.9)');
      groundSnowGradient.addColorStop(1, 'rgba(220, 235, 250, 0.85)');
      ctx.fillStyle = groundSnowGradient;
      ctx.fill();

      // Update and render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.state === 'falling' || p.state === 'scattered') {
          // Apply gravity
          p.vy += GRAVITY * deltaTime;

          // Apply wind
          p.vx += WIND_FORCE * 0.01 * deltaTime;

          // Apply sway for falling particles
          if (p.state === 'falling') {
            p.swayPhase += SWAY_SPEED * deltaTime;
            const sway = Math.sin(p.swayPhase) * p.swayAmplitude;
            p.x += sway * 0.3;
          }

          // Mouse repulsion
          const distToMouse = distance(p.x, p.y, mouse.x, mouse.y);
          if (distToMouse < MOUSE_REPEL_RADIUS && distToMouse > 0) {
            const force = (1 - distToMouse / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_FORCE;
            const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
            p.vx += Math.cos(angle) * force * deltaTime;
            p.vy += Math.sin(angle) * force * deltaTime;
          }

          // Apply velocity
          p.x += p.vx * deltaTime;
          p.y += p.vy * deltaTime;

          // Apply drag to scattered particles
          if (p.state === 'scattered') {
            p.vx *= 0.98;
            p.vy *= 0.98;
            if (Math.abs(p.vx) < 0.3 && p.vy > 0) {
              p.state = 'falling';
            }
          }

          // Check collision with text top edge
          const px = Math.floor(p.x);
          if (px >= 0 && px < topEdgeMap.length && p.state === 'falling') {
            const textTopY = topEdgeMap[px];
            if (textTopY > 0) {
              const currentSnowSurface = textTopY - snowHeightMap[px];
              if (p.y >= currentSnowSurface - p.radius && snowHeightMap[px] < MAX_SNOW_HEIGHT_ON_TEXT) {
                // Accumulate on text
                snowHeightMap[px] = Math.min(snowHeightMap[px] + SNOW_ACCUMULATION_RATE, MAX_SNOW_HEIGHT_ON_TEXT);
                // Spread to neighbors for smoother piles
                if (px > 0) snowHeightMap[px - 1] = Math.min(snowHeightMap[px - 1] + SNOW_ACCUMULATION_RATE * 0.3, MAX_SNOW_HEIGHT_ON_TEXT);
                if (px < width - 1) snowHeightMap[px + 1] = Math.min(snowHeightMap[px + 1] + SNOW_ACCUMULATION_RATE * 0.3, MAX_SNOW_HEIGHT_ON_TEXT);

                p.state = 'accumulated';
                particles.splice(i, 1);
                // Add new particle
                particles.push(createParticle(width, height, true));
                continue;
              }
            }
          }

          // Check collision with ground
          const groundSurface = groundY - (groundSnowHeight[px] || 0);
          if (p.y >= groundSurface - p.radius && p.state === 'falling') {
            if ((groundSnowHeight[px] || 0) < MAX_SNOW_HEIGHT_ON_GROUND) {
              groundSnowHeight[px] = Math.min((groundSnowHeight[px] || 0) + SNOW_ACCUMULATION_RATE * 0.5, MAX_SNOW_HEIGHT_ON_GROUND);
              if (px > 0) groundSnowHeight[px - 1] = Math.min((groundSnowHeight[px - 1] || 0) + SNOW_ACCUMULATION_RATE * 0.2, MAX_SNOW_HEIGHT_ON_GROUND);
              if (px < width - 1) groundSnowHeight[px + 1] = Math.min((groundSnowHeight[px + 1] || 0) + SNOW_ACCUMULATION_RATE * 0.2, MAX_SNOW_HEIGHT_ON_GROUND);
            }
            p.state = 'accumulated';
            particles.splice(i, 1);
            particles.push(createParticle(width, height, true));
            continue;
          }

          // Recycle particles that leave screen
          if (p.y > height + 50 || p.x > width + 100 || p.x < -100) {
            particles.splice(i, 1);
            particles.push(createParticle(width, height, true));
            continue;
          }

          // Render particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();
        }
      }

      // Add sparkle effect
      if (Math.random() < 0.1) {
        for (let i = 0; i < 2; i++) {
          const sparkleParticle = particles[Math.floor(Math.random() * particles.length)];
          if (sparkleParticle && sparkleParticle.state === 'falling') {
            ctx.beginPath();
            ctx.arc(sparkleParticle.x, sparkleParticle.y, sparkleParticle.radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fill();
          }
        }
      }

      // Draw hint text
      ctx.save();
      ctx.font = '14px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(currentTime * 0.003) * 0.2})`;
      ctx.fillText('Click the logo to shake off snow', width / 2, height - 80);
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, createParticle]);

  return (
    <div className={containerStyle}>
      <canvas
        ref={canvasRef}
        className={canvasStyle}
        onClick={handleCanvasClick}
        role="img"
        aria-label="GitAnimals logo with snow effect. Click to shake off snow."
      />
    </div>
  );
}

// ============================================================================
// Styles
// ============================================================================

const containerStyle = css({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
});

const canvasStyle = css({
  display: 'block',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
});
