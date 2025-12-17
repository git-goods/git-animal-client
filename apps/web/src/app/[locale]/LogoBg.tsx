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

// Accumulated snow block that preserves original snowflake size
interface AccumulatedSnow {
  x: number;
  y: number;
  size: number; // Original snowflake size (2, 3, or 4)
}

// ============================================================================
// Constants
// ============================================================================

const PARTICLE_COUNT = 200; // Increased particle count for more snow
const GRAVITY = 0.02; // Gravity strength
const WIND_FORCE = 0.2; // Wind force
const SWAY_SPEED = 0.02; // Sway speed
const MAX_SNOW_HEIGHT_ON_TEXT = 15; // Maximum snow height on text
const MAX_SNOW_HEIGHT_ON_GROUND = 30; // Maximum snow height on ground
const TEXT_FONT = 'bold 72px "Arial Black", Arial, sans-serif'; // Text font
const TEXT_COLOR = '#FFEA7B'; // Text color
const TEXT_CONTENT = 'Git Animals'; // Text content

// ============================================================================
// Utility Functions
// ============================================================================

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// ============================================================================
// Main Component
// ============================================================================

export default function LogoBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const topEdgeMapRef = useRef<number[]>([]); // y position of text top edge for each x
  const textSnowBlocksRef = useRef<AccumulatedSnow[]>([]); // Individual snow blocks on text
  const groundSnowBlocksRef = useRef<AccumulatedSnow[]>([]); // Individual snow blocks on ground
  const textSnowSurfaceRef = useRef<number[]>([]); // Highest snow surface for each x on text
  const groundSnowSurfaceRef = useRef<number[]>([]); // Highest snow surface for each x on ground
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const textBoundsRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const shakeOffsetRef = useRef({ x: 0, y: 0 });

  // Create a single particle (pixel style - integer sizes)
  const createParticle = useCallback((canvasWidth: number, canvasHeight: number, fromTop = true): Particle => {
    // Pixel sizes: 2, 3, or 4
    const pixelSizes = [2, 2, 2, 3, 3, 4];
    const radius = pixelSizes[Math.floor(Math.random() * pixelSizes.length)];
    return {
      x: randomRange(-50, canvasWidth + 50),
      y: fromTop ? randomRange(-100, -10) : randomRange(0, canvasHeight),
      vx: randomRange(-0.3, 0.3),
      vy: randomRange(0.5, 1.5),
      radius,
      opacity: randomRange(0.7, 1), // Higher opacity for pixel look
      swayPhase: randomRange(0, Math.PI * 2),
      swayAmplitude: randomRange(0.3, 0.8),
      state: 'falling',
    };
  }, []);

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle(width, height, false));
      }
      particlesRef.current = particles;
    },
    [createParticle],
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
    const textSnowSurface: number[] = new Array(width).fill(-1); // -1 means no snow yet
    const groundSnowSurface: number[] = new Array(width).fill(-1); // -1 means no snow yet

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
    textSnowSurfaceRef.current = textSnowSurface;
    groundSnowSurfaceRef.current = groundSnowSurface;
    textSnowBlocksRef.current = [];
    groundSnowBlocksRef.current = [];
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

    // Scatter snow blocks from text
    const textSnowBlocks = textSnowBlocksRef.current;
    for (const block of textSnowBlocks) {
      // Create scattered particle from each block
      particlesRef.current.push({
        x: block.x,
        y: block.y,
        vx: randomRange(-3, 3),
        vy: randomRange(-2, 1),
        radius: block.size / 2, // Convert size back to radius
        opacity: randomRange(0.6, 1),
        swayPhase: 0,
        swayAmplitude: 0,
        state: 'scattered',
      });
    }
    // Clear text snow
    textSnowBlocksRef.current = [];
    textSnowSurfaceRef.current = textSnowSurfaceRef.current.map(() => -1);
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
    [handleLogoClick],
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
      const textSnowBlocks = textSnowBlocksRef.current;
      const groundSnowBlocks = groundSnowBlocksRef.current;
      const textSnowSurface = textSnowSurfaceRef.current;
      const groundSnowSurface = groundSnowSurfaceRef.current;
      const groundY = height - 5;

      // Draw accumulated snow blocks on text (with shake offset)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      const offsetX = Math.floor(shakeOffsetRef.current.x);
      const offsetY = Math.floor(shakeOffsetRef.current.y);

      for (const block of textSnowBlocks) {
        ctx.fillRect(Math.floor(block.x) + offsetX, Math.floor(block.y) + offsetY, block.size, block.size);
      }

      // Draw accumulated snow blocks on ground
      for (const block of groundSnowBlocks) {
        ctx.fillRect(Math.floor(block.x), Math.floor(block.y), block.size, block.size);
      }

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

          // Check collision with text top edge or accumulated snow on text
          const px = Math.floor(p.x);
          const snowSize = p.radius * 2; // Convert radius to size
          if (px >= 0 && px < topEdgeMap.length && p.state === 'falling') {
            const textTopY = topEdgeMap[px];
            if (textTopY > 0) {
              // Check current snow surface (either text top or accumulated snow)
              const currentSurface = textSnowSurface[px] > 0 ? textSnowSurface[px] : textTopY;
              const snowHeight = textTopY - currentSurface;

              if (p.y + p.radius >= currentSurface && snowHeight < MAX_SNOW_HEIGHT_ON_TEXT) {
                // Add snow block at exact landing position with original size
                const blockY = currentSurface - snowSize;
                textSnowBlocks.push({
                  x: px,
                  y: blockY,
                  size: snowSize,
                });

                // Update snow surface for this column and neighbors
                textSnowSurface[px] = blockY;
                // Slight spread effect to neighbors
                if (px > 0 && topEdgeMap[px - 1] > 0) {
                  const neighborSurface = textSnowSurface[px - 1] > 0 ? textSnowSurface[px - 1] : topEdgeMap[px - 1];
                  if (blockY < neighborSurface - snowSize * 0.5) {
                    textSnowSurface[px - 1] = Math.max(textSnowSurface[px - 1], blockY + snowSize * 0.7);
                  }
                }
                if (px < width - 1 && topEdgeMap[px + 1] > 0) {
                  const neighborSurface = textSnowSurface[px + 1] > 0 ? textSnowSurface[px + 1] : topEdgeMap[px + 1];
                  if (blockY < neighborSurface - snowSize * 0.5) {
                    textSnowSurface[px + 1] = Math.max(textSnowSurface[px + 1], blockY + snowSize * 0.7);
                  }
                }

                p.state = 'accumulated';
                particles.splice(i, 1);
                particles.push(createParticle(width, height, true));
                continue;
              }
            }
          }

          // Check collision with ground or accumulated snow on ground
          const currentGroundSurface = groundSnowSurface[px] > 0 ? groundSnowSurface[px] : groundY;
          const groundSnowHeight = groundY - currentGroundSurface;
          if (p.y + p.radius >= currentGroundSurface && p.state === 'falling') {
            if (groundSnowHeight < MAX_SNOW_HEIGHT_ON_GROUND) {
              // Add snow block at exact landing position
              const blockY = currentGroundSurface - snowSize;
              groundSnowBlocks.push({
                x: px,
                y: blockY,
                size: snowSize,
              });

              // Update ground snow surface
              groundSnowSurface[px] = blockY;
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

          // Render particle as pixel (square)
          const size = p.radius * 2;
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), size, size);
        }
      }

      // Add sparkle effect (pixel style)
      if (Math.random() < 0.1) {
        for (let i = 0; i < 2; i++) {
          const sparkleParticle = particles[Math.floor(Math.random() * particles.length)];
          if (sparkleParticle && sparkleParticle.state === 'falling') {
            const sparkleSize = sparkleParticle.radius * 3;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(
              Math.floor(sparkleParticle.x) - 1,
              Math.floor(sparkleParticle.y) - 1,
              sparkleSize,
              sparkleSize,
            );
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
