import { Button } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { LoginButton } from '@/features/auth';
import { getServerAuth } from '@/shared/api/auth';
import { Link } from '@/shared/i18n/routing';

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
      <div className={bgContainerClass}>
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
        <div className={containerClass}>
          <img src="/assets/spring-logo.svg" alt="GITANIMALS" className={springLogoClass} />
          <p className={descriptionClass}>
            Spring is blooming in Gitanimals!
            <br />
            Collect a spring pet now!
          </p>
          <div className="flex gap-2.5">
            {!session ? (
              <LoginButton label="Get a spring pet now" />
            ) : (
              <Link href="/mypage">
                <Button className="max-mobile:hidden" size="l">
                  Go To Mypage
                </Button>
                <Button className="hidden max-mobile:block" size="m">
                  Go To Mypage
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="h-[60px]" />
    </div>
  );
}

const springLogoClass = cn(
  'w-[min(600px,45vw)] h-auto select-none drop-shadow-[0_4px_12px_rgba(255,150,170,0.3)]',
  'max-mobile:w-[min(280px,80vw)]',
);

const descriptionClass = cn(
  'text-black/75 whitespace-pre-line mt-4 mb-7 leading-[1.5]',
  'font-product text-glyph-32 font-normal',
  'max-mobile:text-glyph-16 max-mobile:text-[16px] max-mobile:mt-3 max-mobile:mb-5 max-mobile:text-center',
);

const containerClass = cn(
  'relative w-[80%] h-full pl-10 z-[2] flex flex-col justify-center',
  'max-mobile:w-full max-mobile:items-center max-mobile:justify-center max-mobile:pl-0',
);

const bgContainerClass = cn(
  'relative w-full h-[calc(100vh-60px)] grid grid-cols-[2fr_3fr] items-center overflow-hidden',
  'bg-gradient-to-b from-[#E8F4FD] via-[#FFF0F5] via-[70%] to-[#FFDBEE]',
  'max-mobile:grid-cols-1',
);
