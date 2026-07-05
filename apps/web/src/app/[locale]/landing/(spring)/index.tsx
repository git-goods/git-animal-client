import { Button } from '@gitanimals/ui-tailwind';

import { getServerAuth } from '@/auth';
import { LoginButton } from '@/components/AuthButton';
import { Link } from '@/i18n/routing';

import { CherryBlossom } from './CherryBlossom';
import { MotionPetSection } from './MotionPet';

const BLOSSOM_COUNT = 28;

function getBlossomVariant(index: number): number {
  // 3번(작은 꽃잎) 비중 높게: 0→3개, 1→3개, 2→4개, 3→나머지(18개)
  if (index % 9 === 0) return 0;
  if (index % 7 === 0) return 1;
  if (index % 5 === 0) return 2;
  return 3;
}

export async function SpringContent() {
  const session = await getServerAuth();
  return (
    <div>
      <div className="relative w-full h-[calc(100vh-60px)] grid grid-cols-[2fr_3fr] gap-0 items-center overflow-hidden bg-[linear-gradient(180deg,#E8F4FD_0%,#FFF0F5_40%,#FFE4EE_70%,#FFDBEE_100%)] mobile:grid-cols-[1fr]">
        {[...Array(BLOSSOM_COUNT)].map((_, i) => (
          <CherryBlossom
            key={i}
            delay={i * 0.25}
            left={`${Math.random() * 100}%`}
            size={8 + Math.random() * 20}
            duration={12 + Math.random() * 5}
            variant={getBlossomVariant(i)}
            opacity={0.6 + Math.random() * 0.3}
          />
        ))}

        <MotionPetSection />
        <div className="flex relative w-[80%] h-full pl-[40px] z-[2] flex-col justify-center pb-0 gap-0 mobile:w-full mobile:items-center mobile:justify-center mobile:pb-0 mobile:pl-0">
          <img
            src="/assets/spring-logo.svg"
            alt="GITANIMALS"
            className="w-[min(600px,45vw)] h-auto select-none [filter:drop-shadow(0_4px_12px_rgba(255,150,170,0.3))] mobile:w-[min(280px,80vw)]"
          />
          <p className="text-black-75 glyph32-bold font-normal whitespace-pre-line mt-[16px] mb-[28px] leading-[1.5] mobile:glyph16-regular mobile:text-[16px] mobile:mt-[12px] mobile:mb-[20px] mobile:text-center">
            Spring is blooming in Gitanimals!
            <br />
            Collect a spring pet now!
          </p>
          <div className="flex gap-[10px]">
            {!session ? (
              <LoginButton label="Get a spring pet now" />
            ) : (
              <Link href="/mypage">
                <Button className="desktop" size="l">
                  Go To Mypage
                </Button>
                <Button className="mobile" size="m">
                  Go To Mypage
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
