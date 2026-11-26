// text-stroke 는 표준 유틸이 없어 arbitrary property 로 쓴다.

export const prevTextTokenBlack2 = '[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#141414]';

export const prevTextTokenBlack3 = {
  '-webkit-text-stroke-width': '3px',
  '-webkit-text-stroke-color': '#141414',
} as any;
