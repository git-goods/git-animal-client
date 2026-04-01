export { colors } from './colors';
export { fontSize, fontFamily } from './typography';
export { keyframes, animation } from './keyframes';
export { screens, mediaBreakpoints, media } from './screens';
export { zIndex } from './zIndex';

import { colors } from './colors';
import { fontSize, fontFamily } from './typography';
import { keyframes, animation } from './keyframes';
import { screens } from './screens';
import { zIndex } from './zIndex';

export const theme = {
  colors,
  fontSize,
  fontFamily,
  screens,
  zIndex,
  extend: {
    keyframes,
    animation,
  },
};
