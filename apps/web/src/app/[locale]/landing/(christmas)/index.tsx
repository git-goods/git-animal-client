import Image from 'next/image';
import { Button } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { getServerAuth } from '@/shared/api/auth';
import { LoginButton } from '@/components/AuthButton';
import { Link } from '@/shared/i18n/routing';

import { MotionPet } from './MotionPet';
import { Snowflake } from './Snowflake';

export async function ChristmasContent() {
  const session = await getServerAuth();
  return (
    <div>
      <div className={bgContainerClass}>
        {[...Array(20)].map((_, i) => (
          <Snowflake
            key={i}
            delay={i * 0.3}
            left={`${Math.random() * 100}%`}
            size={10 + Math.random() * 15}
            duration={8 + Math.random() * 3}
          />
        ))}

        <Image
          src="/event/christmas/christmas-bg.webp"
          alt="christmas bg"
          layout="fill"
          objectFit="cover"
          className={bgImageClass}
        />

        <div
          className="relative w-full h-full max-h-[calc(100vh-60px)] max-mobile:hidden"
        >
          <div
            className="absolute bottom-0 right-0 object-contain h-full select-none cursor-pointer"
          >
            <MotionPet />
          </div>
        </div>
        <div className={containerClass}>
          <Image
            src="/event/christmas/christmas-logo.svg"
            alt="gitanimals christmas event"
            width={1357}
            height={199}
            objectFit="contain"
            className={logoImageClass}
            draggable={false}
          />
          <p className={descriptionClass}>
            Christmas is here in Gitaniamals!
            <br />
            Draw a Christmas pet now!
          </p>
          <div className="flex gap-2.5">
            {!session ? (
              <LoginButton label="Pick a Christmas pet now" />
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

const descriptionClass = cn(
  'text-white/90 whitespace-pre-line mt-10 mb-10',
  'font-product text-glyph-32 font-bold font-normal',
  'max-mobile:mt-5 max-mobile:mb-5 max-mobile:text-center max-mobile:text-glyph-16',
);

const bgImageClass = 'pointer-events-none object-bottom object-center';

const containerClass = cn(
  'relative z-[2] w-[80%] h-full pl-10 pb-40 flex flex-col justify-center',
  'max-mobile:w-full max-mobile:items-center max-mobile:justify-center max-mobile:pb-[100px] max-mobile:pl-0',
);

const logoImageClass = cn('object-contain h-auto', 'max-mobile:max-w-[90vw]');

const bgContainerClass = cn(
  'relative w-full h-[calc(100vh-60px)] grid grid-cols-[3fr_4fr] pt-[10%]',
  'max-mobile:grid-cols-1',
);
