'use client';

import { useCallback, useEffect } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

export interface PerspectiveTweenOptions {
  /** 회전 강도 (flicking Perspective rotate). 기본 0.5 */
  rotate?: number;
  /** 스케일 강도 (flicking Perspective scale). 기본 0.2 */
  scale?: number;
  /** fade 강도 (flicking Fade). 인접 슬라이드 투명도. 기본 1 */
  fade?: number;
}

/**
 * flicking 의 Perspective({rotate, scale}) + Fade() 플러그인을 embla scroll-progress 로 재현한다.
 * 각 슬라이드의 (스냅 위치 − 현재 스크롤 진행도) diff 로 rotateY/scale/opacity 를 계산해 transform 한다.
 *
 * ⚠️ flicking 내부 공식과 미묘하게 다를 수 있어 브라우저에서 시각 확인이 필요하다(rotate/scale 값 튜닝 포인트).
 */
export function usePerspectiveTween(
  emblaApi: EmblaCarouselType | undefined,
  { rotate = 0.5, scale = 0.2, fade = 1 }: PerspectiveTweenOptions = {},
) {
  const applyTween = useCallback(
    (api: EmblaCarouselType) => {
      const slides = api.slideNodes();
      const scrollProgress = api.scrollProgress();
      const snapList = api.scrollSnapList();

      snapList.forEach((snap, index) => {
        const diff = snap - scrollProgress;
        const abs = Math.abs(diff);
        const rotateY = -diff * 90 * rotate;
        const slideScale = Math.max(0, 1 - abs * scale);
        const opacity = Math.max(0, 1 - abs * fade);
        const el = slides[index];
        if (!el) return;
        el.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${slideScale})`;
        el.style.opacity = String(opacity);
      });
    },
    [rotate, scale, fade],
  );

  useEffect(() => {
    if (!emblaApi) return;
    applyTween(emblaApi);
    emblaApi.on('scroll', applyTween).on('reInit', applyTween);
    return () => {
      emblaApi.off('scroll', applyTween).off('reInit', applyTween);
    };
  }, [emblaApi, applyTween]);
}
