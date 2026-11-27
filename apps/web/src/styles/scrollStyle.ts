// webkit-scrollbar 는 표준 유틸이 없어 arbitrary variant 로 쓴다.

export const customScrollStyle =
  '[&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:rounded-[2px] [&::-webkit-scrollbar-track]:bg-white-alpha-10 [&::-webkit-scrollbar-thumb]:rounded-[2px] [&::-webkit-scrollbar-thumb]:bg-white-alpha-25';

export const customScrollHorizontalStyle =
  '[&::-webkit-scrollbar]:h-[10px] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:rounded-[2px] [&::-webkit-scrollbar-track]:bg-white-alpha-10 [&::-webkit-scrollbar-thumb]:rounded-[2px] [&::-webkit-scrollbar-thumb]:bg-white-alpha-25';
