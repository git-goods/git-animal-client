'use client';

import * as React from 'react';
import { animated, useSprings } from '@react-spring/web';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 SplitText 와 1:1 (css → Tailwind className).
 * @see https://www.reactbits.dev/text-animations/split-text
 */
interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
  style?: React.CSSProperties;
}

const splitParentStyle =
  'inline overflow-hidden whitespace-normal break-words [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]';
const wordStyle = 'inline whitespace-nowrap [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]';
const spaceStyle = 'inline w-[0.3em]';

export const SplitText = ({
  text = '',
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  onLetterAnimationComplete,
  style,
}: SplitTextProps) => {
  const words = text.split(' ').map((word) => word.split(''));

  const letters = words.flat();
  const [inView, setInView] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLParagraphElement>(null);
  const animatedCount = React.useRef<number>(0);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next: any) => {
            await next(animationTo);
            animatedCount.current += 1;
            if (animatedCount.current === letters.length && onLetterAnimationComplete) {
              onLetterAnimationComplete();
            }
          }
        : animationFrom,
      delay: i * delay,
      easing: easing,
    })),
  );

  return (
    <p ref={ref} className={`${splitParentStyle} ${className}`} style={{ textAlign }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={wordStyle}>
          {word.map((letter, letterIndex) => {
            const index = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return (
              <animated.span
                key={index}
                style={{
                  ...springs[index],
                  display: 'inline',
                  position: 'relative',
                  ...style,
                }}
              >
                {letter}
              </animated.span>
            );
          })}
          <span className={spaceStyle}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;
