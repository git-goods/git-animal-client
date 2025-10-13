export const mediaBreakpoints = {
  mobile: 768,
  tablet: 1024,
  pc: 1440,
};

export const media = {
  mobile: `@media (max-width: ${mediaBreakpoints.mobile}px)`,
  tablet: `@media (max-width: ${mediaBreakpoints.tablet}px)`,
  pc: `@media (max-width: ${mediaBreakpoints.pc}px)`,
  desktop: `@media (min-width: ${mediaBreakpoints.mobile}px)`,
};
