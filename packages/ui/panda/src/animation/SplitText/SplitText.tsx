'use client';

import { useSprings, animated } from '@react-spring/web';
import { css } from '_panda/css';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: {
    opacity: number;
    transform: string;
  };
  animationTo?: {
    opacity: number;
    transform: string;
  };
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
  style?: React.CSSProperties;
}

/**
 * @example
 * <SplitText text="Hello, World!" />
 *
 * @see https://www.reactbits.dev/text-animations/split-text
 */
const SplitText = ({
  text = '',
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
  style,
}: SplitTextProps) => {
  const words = text.split(' ').map((word) => word.split(''));

  const letters = words.flat();
  const [inView, setInView] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef<number>(0);

  useEffect(() => {
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
                  display: 'inline-block',
                  willChange: 'transform, opacity',
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

// Panda CSS styles
const splitParentStyle = css({
  overflow: 'hidden',
  display: 'inline',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

const wordStyle = css({
  display: 'inline-block',
  whiteSpace: 'nowrap',
});

const spaceStyle = css({
  display: 'inline-block',
  width: '0.3em',
});

export default SplitText;
