import { userQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useQuery } from '@tanstack/react-query';

export const ProfileBoard = wrap
  .Suspense({ fallback: null })
  .ErrorBoundary({ fallback: null })
  .on(function ProfileBoard() {
    const { data } = useQuery({ ...userQueries.userOptions() });

    if (!data) {
      return null;
    }

    return (
      <div className="flex flex-col px-4 pt-2">
        <div className="mb-1.5 flex items-end justify-between px-2 py-2">
          <div className="flex items-center gap-2 text-glyph-24 font-bold text-white [&_img]:h-8 [&_img]:w-8 [&_img]:overflow-hidden [&_img]:rounded-full">
            <img src={data.profileImage} alt="profile" />
            <p>{data.username}</p>
          </div>
          <div className="flex items-center gap-[3px] text-glyph-16 text-white/90">
            <img src="/assets/shop/coin.webp" className="h-4 w-4" alt="point" />
            <p>{data.points} P</p>
          </div>
        </div>
        <ScoreBoard />
      </div>
    );
  });

export function ScoreBoard() {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-[10px] bg-[linear-gradient(132.51deg,rgba(253,251,209,0.4)_2.19%,rgba(0,157,129,0.4)_49.24%,rgba(61,139,255,0.4)_98.21%)] p-3 px-4 backdrop-blur-[20px]">
      <div className="flex flex-col items-center justify-center">
        <div className="label text-glyph-14 text-white/50">Farm Visitor</div>
        <div className="value text-glyph-18 text-white">100</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="label text-glyph-14 text-white/50">Contribution</div>
        <div className="value text-glyph-18 text-white">100</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="label text-glyph-14 text-white/50">Next pet</div>
        <div className="value text-glyph-18 text-white">100</div>
      </div>
    </div>
  );
}
