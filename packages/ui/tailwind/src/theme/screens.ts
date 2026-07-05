/**
 * Media Breakpoints (numeric values for JS usage)
 */
export const mediaBreakpoints = {
  mobile: 768,
  tablet: 1024,
  pc: 1440,
};

/**
 * Media query strings for JS usage
 */
export const media = {
  mobile: `@media (max-width: ${mediaBreakpoints.mobile}px)`,
  tablet: `@media (max-width: ${mediaBreakpoints.tablet}px)`,
  pc: `@media (max-width: ${mediaBreakpoints.pc}px)`,
  desktop: `@media (min-width: ${mediaBreakpoints.mobile}px)`,
};

/**
 * 반응형 Breakpoints — PandaCSS conditions와 1:1 (single source: panda `media.ts`).
 *
 * panda  media.ts:                       tailwind variant:
 *   mobile  = @media (max-width: 768px)    mobile:    (≤768)
 *   tablet  = @media (max-width: 1024px)   tablet:    (≤1024)
 *   pc      = @media (max-width: 1440px)   pc:        (≤1440)
 *   desktop = @media (min-width: 768px)    desktop:   (≥768)
 *
 * 변환 매핑: panda `_mobile` ↔ `mobile:`, `_tablet` ↔ `tablet:`, `_pc` ↔ `pc:`, `_desktop` ↔ `desktop:`.
 *
 * panda 에 없는 임의 breakpoint(예: 900px)는 screens 에 추가하지 않고 arbitrary variant
 * (`[@media(max-width:900px)]:`)로 개별 처리한다. dev 변환물의 범위형 오역/1px drift 는 제거(ADR-005, 토큰감사 §2.4).
 */
export const screens = {
  mobile: { max: '768px' },
  tablet: { max: '1024px' },
  pc: { max: '1440px' },
  desktop: { min: '768px' },
};
