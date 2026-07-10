// PandaCSS css() → Tailwind className 문자열 상수(ADR-010: plain 문자열은 별도 .ts 여도 content 스캔 정상).
// 소비처는 이미 cn(customScrollStyle, ...) 로 합쳐 쓰므로 무변경. webkit-scrollbar 는 arbitrary variant.

export const customScrollStyle =
  '[&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:rounded-[2px] [&::-webkit-scrollbar-track]:bg-white-10 [&::-webkit-scrollbar-thumb]:rounded-[2px] [&::-webkit-scrollbar-thumb]:bg-white-25';

export const customScrollHorizontalStyle =
  '[&::-webkit-scrollbar]:h-[10px] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:rounded-[2px] [&::-webkit-scrollbar-track]:bg-white-10 [&::-webkit-scrollbar-thumb]:rounded-[2px] [&::-webkit-scrollbar-thumb]:bg-white-25';
